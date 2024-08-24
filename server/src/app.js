import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import apiV1Router from "./routes/v1/api-routes.js";

// Set up server
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json())
app.use("/food-images", express.static("public"));
app.use("/api/v1", apiV1Router);

// Connect to database
dotenv.config();
const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;
await mongoose.connect(MONGO_CONNECTION_URL);

// Run server on the specified port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
