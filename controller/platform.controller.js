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

const codeForcesController = AsyncHandler(async (req, res, next) => {
    const userHandle = req.params.userId;
        if (!userHandle) {
            throw new ApiError(400, "User Handle required");
        }

        const url = `https://codeforces.com/api/user.info?handles=${userHandle}`;
        let response = await axios.get(url);
        response = response.data;

        if (response.status !== "OK") {
            throw new ApiError(404, "User not found on CodeForces");
        }
        const result = response.result[0];
        const rating = result.rating;
        const maxRating = result.maxRating;
        const rank = result.rank;
        const maxRank = result.maxRank;

        const data = {
            "userHandle": userHandle,
            "rating": rating,
            "maxRating": maxRating,
            "rank": rank,
            "maxRank": maxRank,
        }
        console.log(data);

        return res.json(new ApiResponse(200, "CodeForces Controller Working...", data));
})

export { 
    leetcodeController ,
    codeForcesController
};
