import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Login from './screens/login';
import Results from './screens/results';
import Error404Page from './screens/404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
          <Route  path="/results" element={<Results/> }/>
          <Route path="*" element={<Error404Page/>}/>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App

{/* <input
            checked={chosenCandidateState === 2 }
            onChange={() => setChosenCandidate()}
            type='checkbox'
            >
            </input> */}