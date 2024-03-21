import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", async (req, res) => {
    res.send("Server is running");
})

app.listen(process.env.PORT , ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
})