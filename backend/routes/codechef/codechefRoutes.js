const express = require('express');
const router = express.Router();
const { fetchCurrentContests } = require('../../controllers/codechef/codechefController');
const { fetchPastContests } = require('../../controllers/codechef/codechefController');
const { fetchCodechefSolution } = require('../../controllers/codechef/codechefSolutionController');

router.get('/contests', fetchCurrentContests);  // For ongoing and upcoming contests
router.get('/pastcontests', fetchPastContests);  // For finished contestss
router.get('/solution', fetchCodechefSolution);  // For finished contests

module.exports = router;
