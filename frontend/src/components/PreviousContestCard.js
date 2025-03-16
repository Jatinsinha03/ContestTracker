import React from 'react'

function PreviousContestCard({ contest }) {
  return (
    <div className="contest-card">
            <h3>{contest.name}</h3>
            <p>Date: {contest.date}</p>
            <a href={contest.link} target="_blank" rel="noopener noreferrer">Go to Contest</a>
            {contest.solutionLink && <a href={contest.solutionLink} target="_blank" rel="noopener noreferrer">View Solution</a>}
        </div>
  )
}

export default PreviousContestCard
