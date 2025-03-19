import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import PreviousContestCard from '../components/PreviousContestCard';

function PastContests() {
    const [contests, setContests] = useState([]);
    const [filteredContests, setFilteredContests] = useState([]);
    const [allPlatforms] = useState(['codeforces', 'leetcode', 'codechef']); // Include 'codechef'
    const [selectedPlatforms, setSelectedPlatforms] = useState(['codeforces', 'leetcode', 'codechef']);

    useEffect(() => {
        fetchPastContests();
    }, []);

    const normalizeSolutions = (solutions) => {
        return solutions.map(solution => ({
            title: solution.title,
            link: solution.link
        }));
    };

    const normalizeCodeChefSolutions = (solutions) => {
        return solutions.map(solution => {
            // Original title for logging
            const originalTitle = solution.title;
            // Normalize title by removing common prefixes and non-alphanumeric characters except spaces
            const normalizedTitle = originalTitle.replace(/^CodeChef\s+/i, '').replace(/[^a-zA-Z0-9\s]/g, '');
    
            // Log both original and normalized titles to see the transformation
            console.log(`Original Title: ${originalTitle}, Normalized Title: ${normalizedTitle}`);
    
            return {
                title: normalizedTitle,
                link: solution.link
            };
        });
    };

    const normalizePastCodechefContests = (data, platform) => {
        return data.map(contest => {
            // Ensure that contest.name exists; provide a default if not
            const contestName = contest.title || 'Unknown Contest';
            
            // Normalize the contest title to match the format of the solution titles
            // This regex now targets any text in parentheses that starts with "Rated"
            const normalizedTitle = contestName.replace(/\s+\(Rated.*?\)$/i, '').trim();
            
            // Log to check the normalization
            console.log(`Normalized Contest Title: ${normalizedTitle}`);
    
            return {
                id: `${platform}-${contest.id || contest.title.replace(/\s/g, '-')}`,
                name: normalizedTitle,
                date: "NA",
                link: contest.link || 'No link provided',
                platform: platform
            };
        });
    };
    
    
    

    const fetchPastContests = async () => {
        try {
            const [codeforcesResponse, leetCodeResponse, codeChefResponse, leetcodeSolutionResponse, codeforcesSolutionResponse, codeChefSolutionResponse] = await Promise.all([
                axios.get('http://localhost:3000/api/codeforces/pastcontests'),
                axios.get('http://localhost:3000/api/leetcode/pastcontests'),
                axios.get('http://localhost:3000/api/codechef/pastcontests'), // Fetch CodeChef contests
                axios.get('http://localhost:3000/api/leetcode/solution'),
                axios.get('http://localhost:3000/api/codeforces/solution'),
                axios.get('http://localhost:3000/api/codechef/solution') // Fetch CodeChef solutions
            ]);
            const codeforcesContests = normalizeContests(codeforcesResponse.data, 'codeforces');
            const leetCodeContests = normalizeContests(leetCodeResponse.data, 'leetcode');
            const codeChefContests = normalizePastCodechefContests(codeChefResponse.data, 'codechef'); // Normalize CodeChef contests
            const leetCodeSolutions = normalizeSolutions(leetcodeSolutionResponse.data);
            const codeforcesSolutions = normalizeSolutions(codeforcesSolutionResponse.data);
            const codeChefSolutions = normalizeCodeChefSolutions(codeChefSolutionResponse.data); // Normalize CodeChef solutions

            // Match solutions to contests
            const mergedContests = [...codeforcesContests, ...leetCodeContests, ...codeChefContests].map(contest => {
                const foundSolution = (
                    contest.platform === 'leetcode' ? leetCodeSolutions :
                    contest.platform === 'codeforces' ? codeforcesSolutions :
                    codeChefSolutions
                ).find(sol => sol.title.includes(contest.name.split(" ").slice(0, 3).join(" ")));
                return {...contest, solutionLink: foundSolution ? foundSolution.link : undefined};
            });

            setContests(mergedContests);
            setFilteredContests(mergedContests);
        } catch (error) {
            console.error('Error fetching past contests:', error);
        }
    };

    const normalizeContests = (data, platform) => {
        return data.map(contest => ({
            id: `${platform}-${contest.id || contest.title.replace(/\s/g, '-')}`,
            name: contest.name || contest.title,
            date: contest.startTimeSeconds ? new Date(contest.startTimeSeconds * 1000).toLocaleString() : contest.date,
            link: contest.link || 'No link provided',
            platform: platform
        }));
    };

    const handleFilterChange = (newSelectedPlatforms) => {
        setSelectedPlatforms(newSelectedPlatforms);
        setFilteredContests(contests.filter(contest => newSelectedPlatforms.includes(contest.platform)));
    };

    return (
        <div>
            <FilterBar platforms={allPlatforms} selectedPlatforms={selectedPlatforms} onChange={handleFilterChange} />
            <div className="contest-list">
                {selectedPlatforms.length === 0 ? (
                    <p>Select a platform</p>
                ) : filteredContests.length > 0 ? (
                    filteredContests.map(contest => (
                        <PreviousContestCard key={contest.id} contest={contest} />
                    ))
                ) : (
                    <p>Fetching Past Contest</p>
                )}
            </div>
        </div>
    );
}

export default PastContests;
