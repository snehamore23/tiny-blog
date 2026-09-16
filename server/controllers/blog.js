import Blog from "./../models/Blog.js";
import jwt from "jsonwebtoken";

// CREATE BLOG
const postBlog = async (req, res) => {
    const { title, content, category } = req.body;
    const { authorization } = req.headers;

    let decodedToken;

    try {
        decodedToken = jwt.verify(
            authorization.split(" ")[1],
            process.env.JWT_SECRET
        );

        console.log(decodedToken);

        if (!title || !content || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newBlog = new Blog({
            title,
            content,
            category,
            author: decodedToken.userId,
            slug: `temp-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 9)}`
        });

        const savedBlog = await newBlog.save();

        savedBlog.slug =
            `${title.toLowerCase().replace(/ /g, "-")}-${savedBlog._id}`
                .replace(/[^\w-]+/g, "");

        await savedBlog.save();

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog: savedBlog
        });

    } catch (error) {
        console.log("Blog save error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET BLOGS
const getBlog = async (req, res) => {
    try {
        const { author } = req.query;

        const condition = [{ status: "published" }];

        if (author) {
            condition.push({ author: author });
        }

        const blogs = await Blog.find({
            $or: condition,
        })
            .populate("author", "_id name email")
            .sort({
                status: 1,
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: blogs
        });
    } catch (error) {
        console.error("Error in getBlog:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch blogs from database",
            data: []
        });
    }
};


// GET BLOG BY SLUG
const getBlogForSlug = async (req, res) => {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug: slug })
        .populate("author", "_id name email");

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }

    res.status(200).json({
        success: true,
        data: blog,
        message: "Blog fetched successfully"
    });
};


// PUBLISH BLOG
const patchpublishBlog = async (req, res) => {
    const { slug } = req.params;
    const { authorization } = req.headers;

    let decodedToken;

    try {
        decodedToken = jwt.verify(
            authorization.split(" ")[1],
            process.env.JWT_SECRET
        );
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    const blog = await Blog.findOne({ slug: slug });

    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }

    console.log("BLOG AUTHOR:", blog.author.toString());
    console.log("TOKEN USER:", decodedToken.userId);

    if (blog.author.toString() !== decodedToken.userId) {
        return res.status(403).json({
            success: false,
            message: "You are not authorized to publish this blog"
        });
    }

    await Blog.findOneAndUpdate(
        { slug: slug },
        { status: "published" }
    );

    res.status(200).json({
        success: true,
        message: "Blog published successfully"
    });
};


// UPDATE BLOG
const putBlog = async (req, res) => {
    const { slug } = req.params;
    const { title, content, category } = req.body;
    const { authorization } = req.headers;

    let decodedToken;

    try {
        decodedToken = jwt.verify(
            authorization.split(" ")[1],
            process.env.JWT_SECRET
        );
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    const existingBlog = await Blog.findOne({ slug: slug });

    if (!existingBlog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }

    console.log("BLOG AUTHOR:", existingBlog.author.toString());
    console.log("TOKEN USER:", decodedToken.userId);

    if (existingBlog.author.toString() !== decodedToken.userId) {
        return res.status(403).json({
            success: false,
            message: "You are not authorized to update this blog"
        });
    }

    if (!title || !content || !category) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const blog = await Blog.findOneAndUpdate(
        { slug: slug },
        {
            title,
            content,
            category
        },
        {
            new: true
        }
    );

    return res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        data: blog
    });
};


export {
    postBlog,
    getBlog,
    getBlogForSlug,
    patchpublishBlog,
    putBlog
};