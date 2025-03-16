const axios = require('axios');

// Fetch current contests (ongoing or upcoming)
exports.fetchCurrentContests = async (req, res) => {
    try {
        const response = await axios.get('https://codeforces.com/api/contest.list?gym=false');
        const contests = response.data.result.filter(contest => 
            contest.phase === "BEFORE" || contest.phase === "CODING"
        ).map(contest => ({
            id: contest.id,
            name: contest.name,
            type: contest.type,
            phase: contest.phase,
            startTimeSeconds: contest.startTimeSeconds,
            durationSeconds: contest.durationSeconds
        }));

        res.status(200).json(contests);
    } catch (error) {
        console.error('Error fetching current Codeforces contests:', error);
        res.status(500).json({ message: 'Failed to fetch current Codeforces contest data', error: error.toString() });
    }
};

// Fetch past contests (finished)
exports.fetchPastContests = async (req, res) => {
    try {
        const response = await axios.get('https://codeforces.com/api/contest.list?gym=false');
        const contests = response.data.result
            .filter(contest => contest.phase === "FINISHED")
            .slice(0, 10)  // Take only the first 10 elements after filtering
            .map(contest => ({
                id: contest.id,
                name: contest.name,
                type: contest.type,
                phase: contest.phase,
                startTimeSeconds: contest.startTimeSeconds,
                durationSeconds: contest.durationSeconds
            }));

        res.status(200).json(contests);
    } catch (error) {
        console.error('Error fetching past Codeforces contests:', error);
        res.status(500).json({ message: 'Failed to fetch past Codeforces contest data', error: error.toString() });
    }
};

