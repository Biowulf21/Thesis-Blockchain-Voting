import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [account, setAccount] = useState(null);
  const [contractData] = useState(null);

  const {ethereum} = window;
  
  async function connectToMetaMask() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
      });
      setAccount(accounts[0]);
    }
  }

  return (
    <div className="App">
      <button onClick={connectToMetaMask}>Connect</button>
      {account}
    </div>
  )
}

export default App
