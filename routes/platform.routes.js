import express from "express";
import {codeChefController, codeForcesController, gfgController, hackerRankController, leetcodeController } from "../controller/platform.controller.js";

const router = express.Router();

router.get("/leetcode/:userId" , leetcodeController);
router.get("/codeforces/:userId" , codeForcesController);
router.get("/codechef/:userId" , codeChefController);
router.get("/gfg/:userId" , gfgController);
router.get("/hackerrank/:userId" , hackerRankController);

export default router