const express = require('express');
const router = express.Router();
const { fetchContests, fetchPreviousContests } = require('../../controllers/leetcode/leetcodeController');
const { fetchLeetcodeSolution } = require('../../controllers/leetcode/leetcodeSolutionController');

router.get('/contests', fetchContests);
router.get('/pastcontests', fetchPreviousContests);
router.get('/solution', fetchLeetcodeSolution);

module.exports = router;
