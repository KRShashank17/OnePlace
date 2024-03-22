import express from "express";
import {leetcodeController } from "../controller/platform.controller.js";

const router = express.Router();

router.get("/leetcode/:userId" , leetcodeController);

export default router