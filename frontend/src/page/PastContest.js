import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import PreviousContestCard from '../components/PreviousContestCard';

function PastContests() {
    const [contests, setContests] = useState([]);
    const [filteredContests, setFilteredContests] = useState([]);
    const [allPlatforms] = useState(['codeforces', 'leetcode']);
    const [selectedPlatforms, setSelectedPlatforms] = useState(['codeforces', 'leetcode']);

    useEffect(() => {
        fetchPastContests();
    }, []);

    const normalizeSolutions = (solutions) => {
        return solutions.map(solution => ({
            title: solution.title,
            link: solution.link
        }));
    };

    const fetchPastContests = async () => {
        try {
            const [codeforcesResponse, leetCodeResponse, leetcodeSolutionResponse, codeforcesSolutionResponse] = await Promise.all([
                axios.get('http://localhost:3000/api/codeforces/pastcontests'),
                axios.get('http://localhost:3000/api/leetcode/pastcontests'),
                axios.get('http://localhost:3000/api/leetcode/solution'),
                axios.get('http://localhost:3000/api/codeforces/solution')
            ]);
            const codeforcesContests = normalizeContests(codeforcesResponse.data, 'codeforces');
            const leetCodeContests = normalizeContests(leetCodeResponse.data, 'leetcode');
            const leetCodeSolutions = normalizeSolutions(leetcodeSolutionResponse.data);
            const codeforcesSolutions = normalizeSolutions(codeforcesSolutionResponse.data);
    
            // Match solutions to contests with adjusted logic
            const mergedContests = [...codeforcesContests, ...leetCodeContests].map(contest => {
                const titleBase = contest.name.split(" ").slice(0, 3).join(" "); // "Codeforces Round 1008"
                const foundSolution = (contest.platform === 'leetcode' ? leetCodeSolutions : codeforcesSolutions)
                                        .find(sol => sol.title.includes(titleBase));
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
