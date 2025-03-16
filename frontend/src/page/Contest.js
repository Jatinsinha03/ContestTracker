// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContestCard from '../components/ContestCard';
import FilterBar from '../components/FilterBar';
import moment from 'moment';
import 'moment-timezone';

function Contest() {
    const [contests, setContests] = useState([]);
    const [filteredContests, setFilteredContests] = useState([]);
    const [allPlatforms] = useState(['codeforces', 'leetcode']); // All available platforms
    const [selectedPlatforms, setSelectedPlatforms] = useState(['codeforces', 'leetcode']); // Initially select all

    
    useEffect(() => {
        fetchContests();
    }, []);

    // Assuming these functions are part of your service or utility layer

const normalizeCodeforcesContests = (contests) => {
  return contests.map(contest => {
    const startTime = new Date(contest.startTimeSeconds * 1000);
    const currentTime = new Date();
    const timeRemaining = startTime - currentTime; // time difference in milliseconds

    // Calculate days, hours, minutes left
    let delta = timeRemaining / 1000; // convert ms to seconds
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;

    // Format the remaining time string
    const remainingString = `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${minutes}m`;

    return {
        id: `cf-${contest.id}`,  // Prefix to ensure uniqueness across platforms
        name: contest.name,
        startTime: startTime.toLocaleString(), // Convert to readable date
        duration: contest.durationSeconds / 3600, // Convert seconds to hours
        link: `https://codeforces.com/contest/${contest.id}`,
        platform: 'codeforces',
        timeRemaining: remainingString // Time remaining until the contest starts
    };
});
};


const getDayIndex = (day) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days.indexOf(day);
};

// Include a parameter to indicate if the contest is biweekly
const getNextOccurrenceOfDay = (day, time, timeZone, isBiweekly) => {
  const today = moment().tz(timeZone);
  const todayDayIndex = today.day();
  const targetDayIndex = getDayIndex(day);
  let daysUntilNext = targetDayIndex - todayDayIndex;

  if (daysUntilNext < 0 || (daysUntilNext === 0 && today.format('HH:mm A') > moment(time, 'hh:mm A').format('HH:mm A'))) {
    daysUntilNext += 7; // Next week
  }

  // If the contest is biweekly and it is the week of the contest, add an additional week
  if (isBiweekly) {
    daysUntilNext += 7;
  }

  const nextOccurrence = today.add(daysUntilNext, 'days');
  nextOccurrence.hour(moment(time, 'hh:mm A').hour());
  nextOccurrence.minute(moment(time, 'hh:mm A').minute());
  return nextOccurrence;
};

const normalizeLeetCodeContests = (contests) => {
  return contests.reduce((acc, contest) => {
    if (contest.startingTime !== "No starting time info") {
      const [dayPart, timePart, timeZonePart] = contest.startingTime.split(' ');
      // Check if the contest is biweekly
      const isBiweekly = contest.title.toLowerCase().includes("biweekly");
      const nextOccurrence = getNextOccurrenceOfDay(dayPart, timePart, timeZonePart, isBiweekly);

      const timeRemaining = nextOccurrence.diff(moment(), 'seconds');
      const formattedTimeRemaining = timeRemaining > 0 ? `${Math.floor(timeRemaining / 86400)}d ${Math.floor((timeRemaining % 86400) / 3600)}h ${Math.floor((timeRemaining % 3600) / 60)}m` : 'Contest has started';

      acc.push({
        id: `lc-${contest.title.replace(/\s/g, '-')}`,
        name: contest.title,
        startTime: nextOccurrence.format('LLLL'),
        timeRemaining: formattedTimeRemaining,
        link: contest.link,
        imageUrl: contest.imageUrl,
        platform: 'leetcode'
      });
    }
    return acc;
  }, []);
};
  

// Fetch and normalize data from both platforms
const fetchContests = async () => {
  try {
      const [codeforcesResponse, leetCodeResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/codeforces/contests'),
          axios.get('http://localhost:3000/api/leetcode/contests') // Adjust the endpoint as necessary
      ]);
      const codeforcesContests = normalizeCodeforcesContests(codeforcesResponse.data);
      const leetCodeContests = normalizeLeetCodeContests(leetCodeResponse.data);
      console.log(leetCodeContests)
      const mergedContests = codeforcesContests.concat(leetCodeContests);
      console.log(mergedContests)
      setContests(mergedContests);
      setFilteredContests(mergedContests);
  } catch (error) {
      console.error('Error fetching contests:', error);
      throw error;
  }
};


const handleFilterChange = (newSelectedPlatforms) => {
  setSelectedPlatforms(newSelectedPlatforms);
  setFilteredContests(contests.filter(contest => newSelectedPlatforms.includes(contest.platform)));
};

  return (
      <div>
            <FilterBar platforms={allPlatforms} selectedPlatforms={selectedPlatforms} onChange={handleFilterChange} />          <div className="contest-list">
            <div className="contest-list">
                {selectedPlatforms.length === 0 ? (
                    <p>Select a platform</p>
                ) : filteredContests.length > 0 ? (
                    filteredContests.map(contest => (
                        <ContestCard key={contest.id} contest={contest} />
                    ))
                ) : (
                    <p>Fetching Contest</p>
                )}
            </div>
        
          </div>
      </div>
  );
}

export default Contest;
