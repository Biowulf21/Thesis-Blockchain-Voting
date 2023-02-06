import React from 'react'
import { useState, useEffect } from 'react';

var contractInstance;

const Login = () => {
  const [account, setAccount] = useState(null);
  const [candidate1, setCandidate1] = useState(null);
  const [candidate2, setCandidate2] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenCandidateState, setChosenCandidateState] = useState(null);

  const {ethereum} = window;

  // useEffect(() => {
  //   if (account !== null) {
  //     connectToSmartContract();
  //   }
    
  // }, [account])

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     connectToSmartContract();
  //   }
  // }, [isLoggedIn])

  useEffect(() => {}, [chosenCandidateState])
  
  
  async function connectToMetaMask() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
      });
      setIsLoading(true);
      setAccount(accounts[0]);
      connectToSmartContract();
      setIsLoading(false);
      setIsLoggedIn(true);
    }
  }


  
  async function connectToSmartContract(){
    const address = '0x7A7333d93C9Ba7a3c63dD3F12D94622E440dfa99';
    const ABI = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_candidateId",
            "type": "uint256"
          }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "_candidateId",
            "type": "uint256"
          }
        ],
        "name": "votedEvent",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "candidates",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "voters",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contractInstance = new ethers.Contract(address, ABI, signer);
    getCandidatesInfo()
  }

  async function vote(){
    if (chosenCandidateState == null){
      alert("Please select a candidate");
      return;
    }

    // TODO: Check if voter has already voted and deny voting if ever

    if (chosenCandidateState !== 1 && chosenCandidateState !== 2){
      alert("Candidate ID not recognised.");
      return;
    }

    try {
      
      const voteResult = await contractInstance.vote(chosenCandidateState);
      console.log(voteResult);
      alert("Voting Success");
      window.location.reload();
    } catch (error) {
      console.log(error);
      
    }
    

  }


  async function getCandidatesInfo(){
      let candidateInfo = await contractInstance.candidates(1);
      setCandidate1(candidateInfo.name)
      candidateInfo = await contractInstance.candidates(2);
      setCandidate2(candidateInfo.name)
  }

  const setChosenCandidate = (candidateNumber) => {
    if (candidateNumber === 1){
      setChosenCandidateState(1)
    } else {
      setChosenCandidateState(2)
    }
  }

  

  return (
  <>
    {isLoggedIn === true && candidate1 !== null && candidate2 !== null ? (
    <>
      <div className="main-container">
        <div className="candidate-container">
          <div className="candidate-img-div">
            <img className='candidate-img' src="https://images.pexels.com/photos/4427630/pexels-photo-4427630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
          </div>
          <div className="candidate-info">
          <input
            className='candidate-checkbox'
            checked={chosenCandidateState === 1 }
            onChange={() => setChosenCandidate(1)}
            type='checkbox'
            >
            </input>
            {candidate1}
          </div>
        </div>
        <div className="candidate-container">
          <div className="candidate-img-div">
            <img className='candidate-img' src="https://images.pexels.com/photos/4427506/pexels-photo-4427506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
          </div>
          <div className="candidate-info">
          <input
            className='candidate-checkbox'
            checked={chosenCandidateState === 2 }
            onChange={() => setChosenCandidate(2)}
            type='checkbox'
            >
            </input>
          <p className='candidate-name-txt'>{candidate2}</p> 
          </div>      
        </div>
          <div className="vote-btn-container">
            <button onClick={vote} className='vote-btn'>Vote</button>
          </div>
      </div>
    </>
    ) : isLoading === true? (<div>Loading...</div>) : (
      <div className='unauth-main-container'>
        <button className="login-btn" onClick={connectToMetaMask}>Log in</button>
      </div>
    ) }
  </>
  )
}

export default Login