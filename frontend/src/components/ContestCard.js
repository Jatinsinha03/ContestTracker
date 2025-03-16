import React, { useState } from 'react';
import './Card.css';
import axios from 'axios';

function ContestCard({ contest }) {
    const [isBookmarked, setIsBookmarked] = useState(false);

const config = {
    headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Adjust according to how your token is expected
    }
};

const handleBookmarkToggle = async () => {
    if (!isBookmarked) {
        try {
            const res = await axios.post('http://localhost:3000/api/bookmark/addToBookmark', {
                title: contest.name,
                date: contest.startTime,
                link: contest.link
            }, config);
            setIsBookmarked(true);
            console.log(res.data.message);
        } catch (error) {
            console.error('Error bookmarking the contest:', error.response?.data?.error || error.message);
        }
    } else {
        try {
            const res = await axios.delete('http://localhost:3000/api/bookmark/removeBookmark', {
                data: { title: contest.name },
                ...config // Spread config to include headers in DELETE request
            });
            setIsBookmarked(false);
            console.log(res.data.message);
        } catch (error) {
            console.error('Error removing the bookmark:', error.response?.data?.error || error.message);
        }
    }
};

    return (
        <div className="contest-card">
            <h3>{contest.name}</h3>
            <p>Start Time: {contest.startTime}</p>
            <p>Time remaining: {contest.timeRemaining}</p>
            <a href={contest.link} target="_blank" rel="noopener noreferrer">Go to Contest</a>
            <button onClick={handleBookmarkToggle}>
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
        </div>
    );
}

export default ContestCard;
