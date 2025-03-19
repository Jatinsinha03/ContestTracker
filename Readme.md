# Contest Tracker

Contest Tracker is a web application designed for programming contest enthusiasts. It tracks **upcoming and past contests** from major platforms like Codeforces, LeetCode  CodeChef. It allows users to **filter contests by platforms**, **bookmark their favorite contests**, **and access video solutions directly linked from YouTube Playlist given**.

### Demo Youtube Link - [Link](https://youtu.be/GQDDkBCiOHs)


## Features

- **Web Scraping for Contest Data**: Utilizes web scraping to dynamically fetch contest data from LeetCode. This includes both current and past contests, which are displayed with details such as contest name, start time, and a link to the contest.
- **Bookmarking System**: Users can bookmark contests they are interested in. These bookmarks are saved in their user profile for easy access.
- **Dynamic Video Solutions**: Integrates with YouTube to automatically fetch and link contest solution videos. When a new solution video is uploaded to the specified YouTube playlist, the system automatically updates contest records with these links.
- **Filter Functionality**: Provides a filter bar that allows users to filter visible contests based on the platform, making it easier to navigate through large amounts of contest data.
- **Responsive Design**: The application is fully responsive, making it accessible on both desktops and mobile devices.
- **User Authentication**: Supports user login and logout functionalities, managing sessions securely.

## Functionality Overview

- ✅ **Current Contests from Codeforces and LeetCode**: Tracks and displays upcoming contests from both Codeforces and LeetCode.
- ✅ **Past Contests Log with Updatable Video Solutions**: Maintains a log of past contests and updates it with video solutions as they become available.
- ✅ **Automated Fetching of Video Links from YouTube**: Automatically retrieves new video links from specified YouTube playlists and updates contest entries with these links.
- ✅ **Date and Time Display for Each Contest**: Shows the exact date and time for each contest to help users plan their participation.
- ✅ **Platform-Specific Contest Filtering**: Allows users to filter contests by platform, making it easier to find contests from specific sources.
- ✅ **Light and Dark Mode with Toggle**: Users can switch between light and dark modes to enhance visual comfort based on their preference.
- ✅ **Responsive UI for Various Devices**: Ensures that the application is usable on a wide range of devices including desktops, tablets, and smartphones.


## Technologies Used

- **MERN Stack**: Built using MongoDB, Express.js, React.js, and Node.js.
- **Axios**: For HTTP requests to fetch contest data and handle user interactions.
- **Puppeteer**: For web scraping, particularly useful in extracting contest information from LeetCode.

## API Used

- **Codeforces API**: For retrieving information on upcoming and past contests from Codeforces, the application uses the official Codeforces API. This API provides structured data that is easily integrated into the application, ensuring that users have access to real-time updates on contest schedules and results.

- **LeetCode and CodeChef Data Retrieval**: Since there is no official API provided by LeetCode and CodeChef for contest information, the application employs web scraping techniques to extract contest data directly from the LeetCode and CodeChef website. This approach is necessary to ensure the application can provide comprehensive coverage of contests from this platform.

## Detailed Functionality

- **Contest Integration**: Fetches live contest data using web scraping techniques, specifically targeting contest pages. This ensures users receive the most current information available, including exact dates and times.
- **Past Contest Information**: Past contests are not only listed but are updated with links to solution videos as they become available on the associated YouTube channel.
- **Automated Video Link Integration**: The system monitors a YouTube playlist for new contest solution videos. When a new video is uploaded that matches a past contest title, the application automatically updates the contest information with the new video link.

This documentation provides a comprehensive overview of the Contest Tracker application, explaining its core functionalities and the technologies involved. The application is designed to be intuitive for users who are keen on following programming contests across different platforms.
