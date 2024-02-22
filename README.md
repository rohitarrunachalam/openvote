# OpenVote: Blockchain-based Voting System

*OpenVote: Empowering Democracy, One Block at a Time with a blockchain-based voting system, ensuring secure, transparent and tamper-proof elections.*

## The Problem
Traditional voting systems suffer from security vulnerabilities, lacking mechanisms for voter verification and real-time tallying. Electoral fraud concerns and the absence of a transparent system for verifying voter identity compromise the democratic process, eroding public trust.

## OpenVote's Features
- Secure and Tamper-Proof Voting: OpenVote records only one vote and each in a decentralized, tamper-proof manner, guaranteeing supreme security and integrity.

- Prevention of Electoral Fraud: The transparency and immutability of the blockchain
make it virtually impossible to commit electoral fraud.

- Voter Anonymity and Verification: OpenVote assigns unique cryptographic identifiers to verify each vote securely without disclosing individual identities along with AES Encryption.

- Real-Time Vote Tallying: Real-time vote tallying, eliminating manual counting and reducing result announcement time.

- Zero-Trust Security (ZTS): Unique Zero-Trust Security based authentication method using Aadhar, Voter ID and 2 OTPs at different stages to cast vote securely maintaining integrity.

- Vote from Anywhere: Voters can cast their vote from anywhere in the globe with just a smartphone and an internet connection.

- NFT Rewards for Voters: Transforming voter participation into a unique experience. This NFT Reward also serves as a receipt for their vote.

- Data Analytics:  Data analytics to derive meaningful insights from voting patterns and preferences.

## Getting Started

### Prerequisites

* Node
* Python Flask
* Postgres
* Metamask
* Metamask configuration for CosVM - https://doc.cosvm.net/welcome-to-cosvm/user-guide/metamask-configuration
* HardHat - For Local Testing

### Installation



1. Clone the repo
   ```sh git clone
   https://github.com/harikrish-s/OpenVote-pragyan.git
   ```

2. cd into repo
   ```
   cd OpenVote-pragyan
   ```

3. Solidity
   ```
   cd smartContract
   npx hardhat run --network cosvm scripts/deploy.ts
   ```
   *Copy the Smart Contract Address generated & paste to client/src/utils/constants.js*


4. Backend
   ```
   cd flask
   pip install requirements.txt
   flask run
   ```

5. Front End Dashboard
   ```
   cd client
   npm i
   npm run dev
   ```

## Usage

- Login to the admin side dashboard, Register the Candidates and Voters. Start the election.
- Now to Login as a voter, enter your credentials (Govt IDs) & then verify your Identity by entering the OTP generated to your linked mobile number.
- You can cast your vote by verifying yourself with an OTP again for ZTS level 2.
- On successful verification, your vote will get recorded into the blockchain.
- An NFT is generated as a receipt for casting your vote and also as a reward for doing your job a citizen.
- Now on the Admin side, you can view the Live Vote Tally. Once the election is over, a detailed analytics report will be generated for gaining insights.

## Workflow

**Admin Workflow**

<img width="740" alt="admin-workflow" src="readme-assets/admin workflow.png">

**Voter Workflow**

<img width="704" alt="voter-workflow" src="readme-assets/voter workflow.png">

**System Architecture**

<img width="704" alt="voter-workflow" src="readme-assets/sys_arc.png">


## Screenshots

**Admin Login**

<img width="960" alt="Admin-Login" src="https://github.com/harikrish-s/OpenVote-pragyan/assets/93265718/4b172a71-6f1c-4602-8253-ed1a3bd36499">

**Add Candidates**

<img width="960" alt="Add-Candidate" src="https://github.com/harikrish-s/OpenVote-pragyan/assets/93265718/cba3fcd3-cf35-4401-8247-bdc2252ba319">

**Add Voters**

<img width="960" alt="Add Voter" src="https://github.com/harikrish-s/OpenVote-pragyan/assets/93265718/c77c5fb9-0d93-4f2f-a472-ee17ef960282">

**Voter Login**

<img width="960" alt="Voter-Login" src="https://github.com/harikrish-s/OpenVote-pragyan/assets/93265718/5bef72a9-8a27-4dce-a1e8-afeaab9ae217">

**ZTS level 1 OTP**

<img width="960" alt="OTP" src="https://github.com/harikrish-s/OpenVote-pragyan/assets/93265718/c93ae436-aaee-4b5c-95d2-1bd4f6e2ded5">

**ZTS level 2 OTP on click cast vote button**

<img width="960" alt="ZTA" src="https://github.com/harikrish-s/OpenVote-pragyan/assets/93265718/71f47c0a-2477-41c0-aeb3-31fc8cb637ca">

**Select candidate to vote**

<img width="960" alt="Poll-Vote" src="https://github.com/harikrish-s/OpenVote-pragyan/assets/93265718/5a7c7f72-8c55-4154-bd80-9682ce82c56a">

**NFT Receipt**

<img width="960" alt="Receipt" src="https://github.com/harikrish-s/OpenVote-pragyan/assets/93265718/b86fd0f0-da9c-4232-a576-bc685fdf3b55">

**Real-Time Vote Tally**

<img width="960" alt="Live-Tally" src="https://github.com/harikrish-s/OpenVote-pragyan/assets/93265718/b603a991-0159-47ca-9de8-9e23b7b278ec">

**Analytics**

<img width="960" alt="Analytics" src="https://github.com/harikrish-s/OpenVote-pragyan/assets/93265718/3d3019c6-309a-42c5-81bd-816416e3b164">


## Built With

- ReactJS
- TailwindCSS
- Ethers.JS
- Solidity
- Openzeppelin
- CosVM
- MetaMask
- Flask
- PostgreSQL

## Video Demo
<a href="https://drive.google.com/file/d/1RPO9ZHSPX-sjxImTTyCg-KXOBzhnSeWx/view?usp=sharing">Click here</a>


## Support Us

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!
