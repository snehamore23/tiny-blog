import React, { useState, useEffect } from "react";
import { getCurrentUser } from "./../util";
import axios from "axios";
import BlogCard from "./../components/BlogCard";
import Navbar from "./../components/Navbar";

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
        <div>


        <div className="max-w-[850px] mx-auto mt-5">
  <Navbar/>

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
                    viewCount={blog.viewCount}
                />
            ))}

        </div>
        </div>
    );
}

export default AllBlogs;