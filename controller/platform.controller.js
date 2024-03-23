import {ApiError, ApiResponse, AsyncHandler} from "../utils/index.js";
import axios from "axios";
import cheerio from "cheerio";
import fetch from 'node-fetch';

const leetcodeController = AsyncHandler(async (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    if (!userId) {
        throw new ApiError(400, "User Handle required");
    }

    const graphqlQuery = `
    {
        userContestRanking(username: "${userId}") {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
        }
    }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: graphqlQuery }),
    });

    if (!response.ok) {
        throw new ApiError(404, "User not found on Leetcode");
    }

    const data = await response.json();
    const finaldata = data.data.userContestRanking;
    console.log(data.data.userContestRanking);

    res.json(new ApiResponse(200, "Leetcode Controller Working...", finaldata));
});


export { 
    leetcodeController ,
};
