import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import Navbar from "./../components/Navbar";
function ReadBlog() {

    const { slug } = useParams();
    const [blog, setBlog] = React.useState({});

    const fetchBlog = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/blog/${slug}`);
        setBlog(response.data.data);
    };

    useEffect(() => {
            document.documentElement.setAttribute("data-color-mode", "light");

        fetchBlog();
    }, [slug]);

    return(
<div className="max-w-[1200px] mx-auto p-4 mt-10">   
    <Navbar/>    
     <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
     <p>Published On: {new Date(blog.publishedAt || blog.updatedAt).toLocaleString()}, Read by {blog.viewCount}people</p>

     <div className="flex items-center mb-4">
     <span className="inline-block bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full ">
       {blog.category}
     </span>
      <div className="flex items-center gap-4 my-3 ml-14">

                {/* Profile Circle */}
                <div className="flex items-center justify-center font-semibold w-[50px] h-[50px] bg-orange-300 text-white rounded-full text-2xl">
                    {blog?.author?.name?.substring(0, 1).toUpperCase()}
                </div>

                {/* Author Details */}
                <div>
                    <p className="font-semibold">
                        Published By: {blog?.author?.name || "Unknown"}
                    </p>

                    <p className="text-sm text-gray-500">
                        {blog?.author?.email || ""}
                    </p>
                </div>

            </div>
            </div>

<MarkdownEditor.Markdown source={blog.content} readOnly />
    </div>
);
}

export default ReadBlog;