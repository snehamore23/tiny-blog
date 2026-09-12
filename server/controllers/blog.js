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
        author,
        slug: `temp-slug-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` // Temporary slug, will be updated after saving
    });
    const savedBlog = await newBlog.save();

        savedBlog.slug = `${title.toLowerCase().replace(/ /g, "-")}-${savedBlog._id}`.replace(/[^\w-]+/g, "");

    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog: savedBlog
    });
};
    export {postBlog};