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
            slug: `temp-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2, 9)}`
        });

        const savedBlog = await newBlog.save();

        savedBlog.slug =
            `${title.toLowerCase().replace(/ /g, "-")}-${savedBlog._id}`.replace(/[^\w-]+/g, "");

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
// GET BLOGS
const getBlog = async (req, res) => {
    const { author } = req.query;

const condition =[{status: "published"}];
if (author) {
    condition.push({ author: author });
}

    const blogs = await Blog.find({
        $or: condition,
        })
       .populate("author", "_id name email")
        .sort({status:1,
            updatedAt: -1,
        });

        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: blogs
        });
};

export { postBlog, getBlog };