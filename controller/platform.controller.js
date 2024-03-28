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

const codeChefController = AsyncHandler(async (req, res, next) => {
    const userId = req.params.userId;
    // console.log(userId);
    if (!userId) {
        throw new ApiError(400, "User Handle required");
    }
    
    const url = `https://www.codechef.com/users/${userId}`;
    let response = await axios.get(url);
    // console.log(response.data);
    
    const $ = await cheerio.load(response.data);
    const rating = $('.rating-number').text();
    const stars = $('.rating-star').text();
    const globalRank = $('.rating-ranks > .inline-list > li > a').children().first().text();
    const countryRank = $('.rating-ranks > .inline-list ').children().last().children().first().text();

    // console.log(rating , stars , globalRank, countryRank);

    const data = {
        "userId" : userId,
        "rating" : rating,
        "stars" : stars,
        "globalRank" : globalRank,
        "countryRank" : countryRank,
    }

    return res.status(200)
              .json(new ApiResponse(200, "CodeChef Controller Working...",data))
})


const gfgController = AsyncHandler(async (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        throw new ApiError(400, "User Handle required");
    }
    
    const url = `https://auth.geeksforgeeks.org/user/${userId}`;
    let response = await axios.get(url);
    // console.log(userId);
    // console.log(response.data);
    
    const $ = await cheerio.load(response.data);
    const college = $('.basic_details_data > a').text();
    const collegeRank = $('.rankNum').children().first().text();
    
            //* contains many classes with "score_card_value" --- USE MAP
    // const score = $('.score_card_value').first().text();
    // const problemsSolved = $('.score_card_value').next().text();
    const detailsArray = $('.score_card_value').map((i, el) => $(el).text()).get();
    const score = detailsArray[0];
    const problemsSolved = detailsArray[1];

    console.log(college , " " , collegeRank, " ", detailsArray," ");
    console.log(score , " ",problemsSolved);

    const data = {
        "userId" : userId,
        "college": college,
        "collegeRank" : collegeRank,
        "score" : score,
        "problemsSolved" : problemsSolved,
    }

    return res.status(200)
              .json(new ApiResponse(200, "CodeChef Controller Working..." , data))
})

const hackerRankController = AsyncHandler(async (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        throw new ApiError(400, "User Handle required");
    }
    
    const url = `https://www.hackerrank.com/profile/${userId}`;
    let response = await axios.get(url);
    console.log(userId);
    console.log(response.data);

    return res.status(200)
              .json(new ApiResponse(200, "HackerRank Controller Working..."))
})

export { 
    leetcodeController ,
    codeForcesController,
    codeChefController,
    gfgController,
    hackerRankController
};
