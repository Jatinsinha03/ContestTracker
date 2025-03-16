const express = require('express');
const router = express.Router();
const { fetchCurrentContests, fetchPastContests } = require('../../controllers/codeforces/codeforcesController');
const { fetchCodeforcesSolution } = require('../../controllers/codeforces/codeforcesSolutionController');

router.get('/contests', fetchCurrentContests);  // For ongoing and upcoming contests
router.get('/pastcontests', fetchPastContests);  // For finished contests
router.get('/solution', fetchCodeforcesSolution);  // For finished contests

module.exports = router;
