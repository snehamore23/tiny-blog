import Blog from "./../models/blog.js";


// CREATE BLOG
const postBlog = async (req, res) => {
    const { title, content, category, author } = req.body;

    if (!title || !content || !category || !author) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const newBlog = new Blog({
            title,
            content,
            category,
            author,
            slug: `temp-slug-${Date.now()}-${Math.random()
                .toString(36)
                .substr(2, 9)}`
        });

        const savedBlog = await newBlog.save();

        // Create final slug
        savedBlog.slug = `${title
            .toLowerCase()
            .replace(/ /g, "-")}-${savedBlog._id}`
            .replace(/[^\w-]+/g, "");

        // Save updated slug
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


// GET ALL BLOGS
const getBlog = async (req, res) => {

    try {
        const blog = await Blog.find()
            .populate("author", "_id name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            blog: blog
        });

    } catch (error) {
        console.log("Blog fetch error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export { postBlog, getBlog };