const express = require('express');
const leetcodeRoutes = require('./routes/leetcode/leetcodeRoutes');
const codeforcesRoutes = require('./routes/codeforces/codeforcesRoutes');
const codechefRoutes = require('./routes/codechef/codechefRoutes')
const app = express();
const connectToMongo = require("./db");
const PORT = process.env.PORT || 3000;
const cors = require('cors')
connectToMongo() ;

app.use(express.json());  // Middleware for parsing JSON
app.use(cors())

// Mount routes
app.use('/api/leetcode', leetcodeRoutes);
app.use('/api/codeforces', codeforcesRoutes);
app.use('/api/codechef', codechefRoutes);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookmark', require('./routes/ContestBookmark'));


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
