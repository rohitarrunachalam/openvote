// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Voting {
   
    struct Candidate {
        uint256 id;
        string partyName;
        string candidateName;
        string partyLogo;
        string description;
        uint256 voteCount;
       
    }

    address public owner;
    uint256 public electionState = 0;

    struct Voter {
        uint256 id;
        address voterAddress;
        string aid;
        string vid;
        string name;
        string email;
        string region;
        string phone;
    }

    mapping(uint256 => Candidate) candidates;
    mapping(uint256 => Voter) voters;
    mapping(address => bool) voted;

    mapping(address => bool) isVoter;

    uint256 public candidatesCount = 0;
    

    struct Receipt{
        string partyName;
        string candidateName;
        uint timeStamp;
        address voterAddress;
    }

    mapping(uint256 => Receipt) voterBill;
    
    uint256 public receiptID = 4726;
   
    uint256 public votersCount = 0;

    constructor() {
        owner = msg.sender;
        electionState = 0;
       
    }

    event Voted(uint256 indexed _candidateId);

    function startElection() public {
        require(msg.sender == owner);
        require(electionState == 0);
        electionState = 1;
    }


    function refreshElection() public {
        require(msg.sender == owner);
        require(electionState == 2);
        electionState = 0;
    }



    function getElectionState() public view returns(uint256) {
      return electionState;
    }

    function endElection() public {
        require(msg.sender == owner);
        require(electionState == 1);
        electionState = 2;
    }

    function addCandidate(string memory _partyName, string memory _candidateName, string memory _partyLogo, string memory _description) public {
        require(owner == msg.sender, "Only owner can add candidates");
        require(
            electionState == 0,
            "Election has already started"
        );

        candidates[candidatesCount] = Candidate(candidatesCount, _partyName, _candidateName,_partyLogo,_description,0);
        candidatesCount++;
       
    }

    function getCandidateCount()public view returns(uint256) {
        return candidatesCount;
    }

 
    function addVoter( 
        address _voterAddress,
        string memory _aid,
        string memory _vid,
        string memory _name,
        string memory _email,
        string memory _region,
        string memory _phone
    ) 
        public {
        require(owner == msg.sender, "Only owner can add voter");
        require(!isVoter[_voterAddress], "Voter already added");
        require(
            electionState == 0,
            "Voter can't be added after election started"
        );
        voters[votersCount] = Voter(votersCount, _voterAddress, _aid, _vid, _name, _email, _region, _phone);
        isVoter[_voterAddress] = true;
        votersCount++;
    }

    function getVoterCount()public view returns(uint256) {
        return votersCount;
    }

    function getRole(address _current) public view returns (uint256) {
        if (owner == _current) {
            return 1;
        } else if (isVoter[_current]) {
            return 2;
        } else {
            return 3;
        }
    }

    function vote(uint256 _candidateId) public {
        require(
            electionState == 1,
            "Election is not in progress"
        );
        require(isVoter[msg.sender], "Non authorised user cannot vote");
        require(!voted[msg.sender], "You have already voted");
        require(
            _candidateId >= 0 && _candidateId < candidatesCount,
            "Invalid candidate ID"
        );

        candidates[_candidateId].voteCount++;
        voted[msg.sender] = true;
      
        returningReceiptID[msg.sender] = receiptID;
        voterBill[receiptID].partyName =  candidates[_candidateId].partyName;
        voterBill[receiptID].candidateName =  candidates[_candidateId].candidateName;
        voterBill[receiptID].timeStamp =  block.timestamp;
        voterBill[receiptID].voterAddress =  msg.sender;
        receiptID++;

        emit Voted(_candidateId);
    }

    mapping(address => uint256) returningReceiptID;

    function generateGenerateRID() public view returns(uint256){
        return returningReceiptID[msg.sender];
    }



    function getCandidateDetails(uint256 _candidateId)
        public
        view
        returns (string memory, string memory, uint256, string memory, string memory)
    {
        require(
            _candidateId >= 0 && _candidateId < candidatesCount,
            "Invalid candidate ID"
        );
        return (
            candidates[_candidateId].partyName,
            candidates[_candidateId].candidateName,
            candidates[_candidateId].voteCount,
            candidates[_candidateId].partyLogo,
            candidates[_candidateId].description

        );

       }


    function getVoterBill(uint256 _receiptID) public view returns(string memory,string memory, uint256){
        require(msg.sender ==  voterBill[_receiptID].voterAddress,'Invalid Account');
        return(
        voterBill[_receiptID].partyName,
        voterBill[_receiptID].candidateName,
        voterBill[_receiptID].timeStamp
        );
    }   
   
}


