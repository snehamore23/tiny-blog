import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

import { postBlog, getBlog,getBlogForSlug ,patchpublishBlog, putBlog} from "./controllers/blog.js";
import { postSignup, postLogin } from "./controllers/user.js";

dotenv.config();
import Blog from "./models/blog.js";

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

const jwtCheck = (req, res, next) => {
    req.user = null;
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).json({ message: "Authorization header missing" });
    }
    const token = authorization.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decodedToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
const incrementViewCount = async (req, res, next) => {
    const { slug } = req.params;
    try{
       const blog= await Blog.findOne({ slug: slug });
       if(blog){
        blog.viewCount += 1;
        await blog.save();
       }
      
    }
    catch(error){
        console.error("Error incrementing view count:", error);
    
    }
    next();
};
// Signup and Login
app.post("/signup", postSignup);
app.post("/login", postLogin);


// Blog routes
app.post("/blog",jwtCheck ,postBlog);
app.get("/blog", getBlog);
app.get("/blog/:slug",incrementViewCount, getBlogForSlug);
app.patch("/blog/:slug/publish",jwtCheck, patchpublishBlog);
app.put("/blog/:slug",jwtCheck, putBlog);


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