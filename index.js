import express from "express";
import dotenv from "dotenv";
import platformRoutes from "./routes/platform.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    res.send("Server is running");
})

app.use("/api" , platformRoutes);

app.listen(process.env.PORT , ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
})