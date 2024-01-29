import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
export const VotingContext = React.createContext();



export const TransactionsProvider = ({ children }) => {
  const { ethereum } = window;
  // const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

  const [candidates, setCandidates] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [receiptID, setReciptID] = useState(4726);



  const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    return transactionsContract;
  };
    
  const contract = createEthereumContract();

  const getCandidates = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const cancount = await transactionsContract.getCandidateCount();
        const temp = [];
   
        for (let i = 0; i < cancount; i++) {
          const candidate = await transactionsContract.getCandidateDetails(i);
          temp.push({ partyName: candidate[0], candidateName: candidate[1] ,votes: candidate[2].toNumber(), partyLogo: candidate[3], description: candidate[4]  });
        }
        setCandidates(temp);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const startElection = async () => {
    try {
      if (ethereum) {
        const stElc = await contract.startElection();

        console.log(`Starting Election: Loading - ${stElc.hash}....`);
        await stElc.wait();
        console.log(`Starting Election: Success - ${stElc.hash}....`);
      

      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const endElection = async () => {
    try {
      if (ethereum) {
        const endElc = await contract.endElection();

        console.log(`Ending Election: Loading - ${endElc.hash}....`);
        await endElc.wait();
        console.log(`Ending Election: Success - ${endElc.hash}....`);
      
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const refreshElection = async () => {
    try {
      if (ethereum) {
        const refreshElc = await contract.refreshElection();

        console.log(`Refreshing Election: Loading - ${refreshElc.hash}....`);
        await refreshElc.wait();
        console.log(`Refreshing Election: Success - ${refreshElc.hash}....`);
    
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };


  const votehandler = async (index) => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const transactionHash = await transactionsContract.vote(index);
        console.log(`Vote Func: Loading - ${transactionHash.hash}....`);
        await transactionHash.wait();
        console.log(`Vote Func: Success - ${transactionHash.hash}....`);
        const getReceipt = await transactionsContract.generateGenerateRID();
        console.log(getReceipt)
        setReciptID(getReceipt)


        getCandidates();
  
        
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const checkIfTransactionsExists = async () => {
  //   try {
  //     if (ethereum) {
  //       const transactionsContract = createEthereumContract();
  //       const currentTransactionCount = await transactionsContract.getTransactionCount();

  //       window.localStorage.setItem("transactionCount", currentTransactionCount);
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error("No ethereum object");
  //   }
  // };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

 

  useEffect(() => {
    checkIfWalletIsConnect();
    // checkIfTransactionsExists();
  }, []);



  return (
    <VotingContext.Provider
      value={{
        connectWallet,
        currentAccount,
        isLoading,
        getCandidates,
        votehandler,
        candidates,
        setCandidates,
        createEthereumContract,
        ethereum,
        contract,
        receiptID,
        startElection,
        endElection,
        refreshElection,

      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
