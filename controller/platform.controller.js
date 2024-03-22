import {ApiResponse, AsyncHandler} from "../utils/index.js";

const leetcodeController = AsyncHandler(async (req, res, next) => {
    const userId = req.params.userId;
    // console.log(userId);
    
    res.json(new ApiResponse(200, "LeetCode Controller Working..."))
})

export {leetcodeController}