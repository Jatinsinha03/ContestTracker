// const handleBookmarkToggle = async () => {
//     if (!isBookmarked) {
//         try {
//             const res = await axios.post('http://localhost:3000/api/bookmark/addToBookmark', {
//                 title: contest.name,
//                 date: contest.startTime,
//                 link: contest.link
//             }, config);
//             setIsBookmarked(true);
//             console.log(res.data.message);
//         } catch (error) {
//             console.error('Error bookmarking the contest:', error.response?.data?.error || error.message);
//         }
//     } else {
//         try {
//             const res = await axios.delete('http://localhost:3000/api/bookmark/removeBookmark', {
//                 data: { title: contest.name },
//                 ...config // Spread config to include headers in DELETE request
//             });
//             setIsBookmarked(false);
//             console.log(res.data.message);
//         } catch (error) {
//             console.error('Error removing the bookmark:', error.response?.data?.error || error.message);
//         }
//     }
// };


import React, { useState, useEffect } from 'react';
import './Card.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ContestCard({ contest }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const location = useLocation();
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token') // Assuming token is stored in localStorage
        }
    };

    // Function to check if the current contest is bookmarked
    const checkIfBookmarked = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/bookmark/getBookmarks', config);
            const bookmarks = res.data.bookmarks || [];
            const isBookmarked = bookmarks.some(b => b.title === (contest.name || contest.title));
            setIsBookmarked(isBookmarked);
        } catch (error) {
            console.error('Error checking bookmarks:', error.response?.data?.error || error.message);
        }
    };

    useEffect(() => {
        checkIfBookmarked();
    }, []); // Dependency array is empty to only run once on mount

    const handleBookmarkToggle = async () => {
        const endpoint = isBookmarked ? 'removeBookmark' : 'addToBookmark';
        const url = `http://localhost:3000/api/bookmark/${endpoint}`;
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') // Ensure token is available
            }
        };
    
        try {
            let res;
            if (isBookmarked) {
                // For DELETE, config must include headers and data must be sent under config
                res = await axios.delete(url, {
                    ...headers,
                    data: { title: contest.name || contest.title } // Send data under config for DELETE
                });
            } else {
                // For POST, data is sent directly with headers as the second argument
                res = await axios.post(url, {
                    title: contest.name,
                    date: contest.startTime,
                    link: contest.link
                }, headers);
            }
            setIsBookmarked(!isBookmarked);
            console.log(res.data.message);
        } catch (error) {
            console.error(`Error ${isBookmarked ? 'removing' : 'adding'} the bookmark:`, error.response?.data?.error || error.message);
        }
    };
    

    return (
        <div className="contest-card">
            <h3>{contest.name || contest.title}</h3>
            <p>Start Time: {contest.startTime || contest.date}</p>
            {contest.timeRemaining ? <p>Time remaining: {contest.timeRemaining}</p> : null}
            <a href={contest.link} target="_blank" rel="noopener noreferrer">Go to Contest</a>
                <button 
                onClick={handleBookmarkToggle}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: isBookmarked ? '#4CAF50' : 'grey', // Green for bookmarked, red for not bookmarked
                    color: 'white',
                    transition: 'background-color 0.3s, color 0.3s',
                    outline: 'none',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
            >
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>            
        </div>
    );
}

export default ContestCard;

