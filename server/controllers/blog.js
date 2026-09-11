import Blog from "./../models/blog.js";
const postBlog = async (req, res) => {
    const { title, content, category, author } = req.body;

    if (!title || !content || !category || !author) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const newBlog = new Blog({
        title,
        content,
        category,
        author
    });
    const savedBlog = await newBlog.save();

    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog: savedBlog
    });
};
    export {postBlog};