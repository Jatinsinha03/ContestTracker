import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContestCard from '../components/ContestCard';

function Bookmarked() {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const fetchBookmarks = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token // Adjust according to how your token is expected
                }
            };
            const response = await axios.get('http://localhost:3000/api/bookmark/getBookmarks', config);
            console.log(response.data.bookmarks);
            setBookmarks(response.data.bookmarks);
        } catch (error) {
            console.error('Error fetching bookmarks:', error.response?.data?.error || error.message);
        }
    };

    return (
        <div className="bookmark-list">
            {bookmarks.length > 0 ? (
                bookmarks.map(bookmark => (
                    <ContestCard key={bookmark._id} contest={bookmark} />
                ))
            ) : (
                <p>No bookmarks found.</p>
            )}
        </div>
    );
}

export default Bookmarked;
