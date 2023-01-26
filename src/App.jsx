import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState(null);
  const [candidate1, setCandidate1] = useState(null);
  const [candidate2, setCandidate2] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenCandidateState, setChosenCandidateState] = useState(null);

  const {ethereum} = window;

  useEffect(() => {
    if (account !== null) {
      connectToSmartContract();
    }
    
  }, [account])

  useEffect(() => {
    if (isLoggedIn) {
      connectToSmartContract();
    }
  }, [isLoggedIn])

  useEffect(() => {}, [chosenCandidateState])
  
  
  async function connectToMetaMask() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
      });
      setIsLoading(true);
      setAccount(accounts[0]);
      setIsLoading(false);
      setIsLoggedIn(true);
    }
  }


  
  let contractInstance;
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
            <img className='candidate-img' src="https://scontent.fcgm1-1.fna.fbcdn.net/v/t39.30808-6/324102820_2216538285216504_6974961729629479937_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5XrkS4oRcA0AX-hhqZg&_nc_ht=scontent.fcgm1-1.fna&oh=00_AfC7yPHG3RLcCjBmPd1MY0rG6cDKkiUcITmOmKaIKFUUpA&oe=63D79664"/>
          </div>
          <div className="candidate-info">
          <input
            checked={chosenCandidateState === 2 }
            onChange={() => setChosenCandidate()}
            type='checkbox'
            >
            </input>
            {candidate1}
          </div>
          <div className="vote-btn-container">
            <button className='vote-btn'>oten</button>
          </div>
          

        </div>

      </div>
    </>
    ) : isLoading === true? (<div>Loading...</div>) : (
      <div>
        <button onClick={connectToMetaMask}>Log in</button>
      </div>
    ) }
  </>
  )
}

export default App

{/* <input
            checked={chosenCandidateState === 2 }
            onChange={() => setChosenCandidate()}
            type='checkbox'
            >
            </input> */}