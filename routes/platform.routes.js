import express from "express";
import {codeChefController, codeForcesController, leetcodeController } from "../controller/platform.controller.js";

const router = express.Router();

router.get("/leetcode/:userId" , leetcodeController);
router.get("/codeforces/:userId" , codeForcesController);
router.get("/codechef/:userId" , codeChefController);

export default router