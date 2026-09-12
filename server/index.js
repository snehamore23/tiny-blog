import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { postBlog, getBlog } from "./controllers/blog.js";
import { postSignup, postLogin } from "./controllers/user.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.log("❌ MongoDB Error:", error.message);
    }
};


// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is up and running..."
    });
});


// Signup and Login
app.post("/signup", postSignup);
app.post("/login", postLogin);


// Blog routes
app.post("/blog", postBlog);
app.get("/blog", getBlog);


// Test route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Test route working"
    });
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
});