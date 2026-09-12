import React, { useState, useEffect } from "react";
import { getCurrentUser } from "./../util";
import axios from "axios";
import BlogCard from "./../components/BlogCard";

function AllBlogs() {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);

 const fetchBlogs = async () => {
       const response = await axios.get(
                   `${import.meta.env.VITE_API_URL}/blog?author=${getCurrentUser()?._id || ""}`
                );

setBlogs(response.data.data || []);
            };

    useEffect(() => {
        setUser(getCurrentUser());
        fetchBlogs();
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [user]);

    return (
        <div className="max-w-[850px] mx-auto mt-5">

            <h1 className="text-3xl font-bold mb-2">
                All Blogs
            </h1>

            <p className="mb-5">
                {user
                    ? `Hello, ${user.name}!`
                    : "Welcome, Guest!"}
            </p>

            {blogs.map((blog) => (
                <BlogCard
                    key={blog._id}
                    _id={blog._id}
                    title={blog.title}
                    content={blog.content}
                    author={blog.author}
                    createdAt={blog.createdAt}
                    updatedAt={blog.updatedAt}
                    status={blog.status}
                    category={blog.category}
                    slug={blog.slug}
                />
            ))}

        </div>
    );
}

export default AllBlogs;