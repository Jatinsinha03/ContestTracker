const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser'); // Assuming the middleware is for authentication
const Contest = require('../models/Contest');

router.post('/addToBookmark', fetchUser, async (req, res) => {
    try {
        const { title, date, link } = req.body;

        // Validate incoming data
        if (!title || !date || !link) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newBookmark = new Contest({
            user: req.user, // user ID from fetchUser middleware
            title,
            date,
            link,
        });

        await newBookmark.save();

        res.status(200).json({ message: 'Bookmarked successfully', contest: newBookmark });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/getBookmarks', fetchUser, async (req, res) => {
    try {
        const bookmarks = await Contest.find({ user: req.user });

        if (bookmarks.length === 0) {
            return res.status(404).json({ message: 'No Bookmarks found' });
        }

        res.status(200).json({ bookmarks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/removeBookmark', fetchUser, async (req, res) => {
    try {
        const { title } = req.body;

        // Validate incoming data
        if (!title) {
            return res.status(400).json({ error: 'Missing ' });
        }

        const removedContest = await Contest.findOneAndDelete({ user: req.user, title });

        if (!removedContest) {
            return res.status(404).json({ message: 'Contest not found bookmarked' });
        }

        res.status(200).json({ message: 'Contest removed', contest: removedContest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
