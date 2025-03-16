// src/components/ContestCard.js
import React from 'react';
import './Card.css'

function ContestCard({ contest }) {
    return (
        <div className="contest-card">
            <h3>{contest.name}</h3>
            <p>Start Time: {contest.startTime}</p>
            <p>Time remaining : {contest.timeRemaining}</p>
            <a href={contest.link} target="_blank" rel="noopener noreferrer">Go to Contest</a>
        </div>
    );
}

export default ContestCard;
