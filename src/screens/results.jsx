import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);
import "./results-css.css";
import { candidateInfo, contractInstance } from './login';

const Results = () => {
    const [candidate1VoteCount, setCandidate1VoteCount] = useState(0);
    const [candidate2VoteCount, setCandidate2VoteCount] = useState(0);

    useEffect( () => {
        const getVoteCounts = async () =>{

            const votes = await candidateInfo() 
            console.log(votes)
            setCandidate1VoteCount(votes.candidate1VoteCountDecimal);
            setCandidate2VoteCount(votes.candidate2VoteCountDecimal);
         }
        
        getVoteCounts();
    }, [])

    


   const data = {
        labels: ['Candidate 1', 'Candidate 2'],
        datasets: [
          {
            label: '# of Votes',
            data: [candidate1VoteCount, candidate2VoteCount],
            backgroundColor: [
                'rgba(255,0,0)',
                'rgba(0,0,255)'
            ],
            borderWidth: 1,
          },
        ],
      };
    

  return (
    <>
    <div className='pie-div'>
        {candidate1VoteCount === 0 && candidate2VoteCount === 0 ? 
        <>
            <h2>No votes to display</h2>
        </> 
        : 
        <Pie className='results-pie' data={data}/>
        }
    </div>
    </>
  )
}

export default Results