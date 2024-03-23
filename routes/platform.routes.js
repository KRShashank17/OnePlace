import express from "express";
import {codeForcesController, leetcodeController } from "../controller/platform.controller.js";

const router = express.Router();

router.get("/leetcode/:userId" , leetcodeController);
router.get("/codeforces/:userId" , codeForcesController);

export default router