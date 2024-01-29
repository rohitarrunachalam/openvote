from flask import Flask, jsonify, request, make_response, send_file
from flask_cors import CORS
import psycopg2
from functools import wraps
import jwt
from datetime import datetime, timedelta
from dotenv import dotenv_values
import pyotp
import time
from twilio.rest import Client

app = Flask(__name__)
CORS(app)
secrets = dotenv_values(".flaskenv")

######################################################################
DB_url = secrets["DB_url"]
SECRET_KEY = secrets["SECRET_KEY"]
connection = psycopg2.connect(DB_url)
######################################################################

def send_sms():
	global totp
	account_sid = ""
	auth_token = ""
	client = Client(account_sid, auth_token)
	totp = pyotp.TOTP("base32secret3232")
	print("OTP!!!!!!!!!!!!!!!!!!!!!!!",totp.now())

	# message = client.messages.create(
    #     body=f"Dear Voter, your verification code is {totp.now()}.",
    #     from_="",
    #     to=""
    # )

@app.route('/testing', methods=['GET'])
def testing():
	return "Hello, World"

def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = request.headers.get('x-access-token')
		if not token:
			return jsonify({'Message': 'Token is missing!'}), 401
		try:
			data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
			if "aadhar_id" in data:
				# Token belongs to a parent user
				current_user = get_details_by_aadhar(data['aadhar_id'])
				print("\n\n\n",current_user,"\n\n\n")
			else:
				return jsonify({'message': 'Invalid token!'}), 401
			if current_user is None:
				return jsonify({'message': 'User not found!!'}), 404
		except jwt.ExpiredSignatureError:
			return jsonify({'message': 'Token has expired!!'}), 401
		except jwt.InvalidTokenError:
			return jsonify({'message': 'Invalid token!!'}), 401
		return f(current_user, *args, **kwargs)

	return decorated

def password_authentication(name, dob, aadhar_id,voter_id):
	with connection:
		with connection.cursor() as cursor:
			cursor.execute(
				f"SELECT name,dob,mobile_no,aadhar_id,voter_id FROM voter_acc WHERE name = '{name}' \
  			AND dob = '{dob}' AND aadhar_id = '{aadhar_id}' AND voter_id = '{voter_id}';")
			user = cursor.fetchone()
	# return user
	return True if user is not None else False

@app.route('/login', methods=['POST'])
def login():
	global token
	global aadhar_id
	name = request.json.get("name", None)
	dob = request.json.get("dob", None)
	aadhar_id = request.json.get("aadhar_id", None)
	voter_id = request.json.get("voter_id", None)
	

	if not aadhar_id or not voter_id:
		return make_response('Invalid Login Credentials', 401, {'WWW-Authenticate': 'Basic realm="Login required !!"'})

	authverify = password_authentication(name, dob, aadhar_id,voter_id)
	if authverify == True:
		token = jwt.encode({
			'aadhar_id': aadhar_id,
			'exp': datetime.utcnow() + timedelta(minutes=30)
		}, SECRET_KEY)

		send_sms()
		print("Overrrrrrrrrrrrrr")
		return make_response('Login Success', 201)

	return make_response('Invalid Login Credentials', 403, {'WWW-Authenticate': 'Basic realm="Invalid Login Credentials"'})


@app.route('/otp', methods=['POST'])
def otp():
	global totp
	global token
	global aadhar_id
	otp = request.json.get("otp", None)
	if totp.verify(otp) == True:
		# return make_response(jsonify({'Message': 'Zero-Trust Authentication Successful'}), 201)
		return make_response(jsonify({'token': token, 'aadhar_id': aadhar_id}), 201)
	return make_response('Invalid OTP', 403, {'WWW-Authenticate': 'Basic realm="Invalid Login Credentials"'})

@app.route('/adminlogin', methods=['POST'])
def admin_login():
	print("inga")
	data = request.json
	username = data.get("username",	None)
	password = data.get("password",	None)

	if username == secrets["admin_username"] and password == secrets["admin_password"]:
		admin_data = {"username": username, "role": "admin"}
		token = jwt.encode(admin_data, SECRET_KEY, algorithm="HS256")
		print("inga")
		return jsonify({"token": token})
	else:
		return jsonify({"message": "Invalid credentials"}), 401


def get_details_by_aadhar(aadhar_id):
	with connection:
		with connection.cursor() as cursor:
			try:
				cursor.execute(f"SELECT * FROM voter_acc WHERE aadhar_id = '{aadhar_id}';")
				columns = [desc[0] for desc in cursor.description]
				result = [dict(zip(columns, row)) for row in cursor.fetchall()]
				return result[0]
			except psycopg2.Error as e:
				return f"Error fetching data from the database:", e


@app.route('/dashboard', methods=['GET'])
@token_required
def get_details(current_user):
	details = get_details_by_aadhar(current_user['aadhar_id'])
	if details:
		return jsonify(details)
	return jsonify({'message': 'Could not fetch details'}), 404


@token_required
@app.route('/zta', methods=['GET'])
def zta():
	global totp
	send_sms()
	return make_response(jsonify({'Message': 'ZTA OTP has been Successfully'}), 201)


@app.route('/verifyzta', methods=['POST'])
def verifyzta():
	print("hiiiiiiiiiiiiiiiiiiiiiiiiiiii")
	global totp
	otp = request.json.get("ZTA", None)
	if totp.verify(otp) == True:
		return make_response(jsonify({'Message': 'Zero-Trust Authentication level II Successful'}), 201)

	return make_response('Invalid ZTA OTP', 403, {'WWW-Authenticate': 'Basic realm="Invalid Login Credentials"'})