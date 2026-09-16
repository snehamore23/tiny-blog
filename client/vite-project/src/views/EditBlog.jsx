import MarkdownEditor from "@uiw/react-markdown-editor";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { BLOG_CATEGORIES } from "./../Constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCurrentUser } from "./../util";
import { useParams } from "react-router-dom";
import Navbar from "./../components/Navbar";


function EditBlog() {
    const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const { slug } = useParams();


const loadBlog = async () => {
    if (!slug) return; 
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/${slug}`);

    const blogData = response?.data?.data;
    setTitle(blogData?.title);
    setContent(blogData?.content);
    setCategory(blogData?.category);
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");

    const currentUser = getCurrentUser();
    setUser(currentUser);
    loadBlog();
  }, []);

  const UpdateBlog = async () => {
    try{
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blog/${slug}`,
        { title, content, category }
    ,{
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
    );
 
    if (response?.data?.success) {
        toast.success("Blog Updated successfully");

        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    }
  }
  catch(error){
    toast.error(error.response?.data?.message || "Error updating blog");
}
  };

const publishBlog = async () => {
  try {
    const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blog/${slug}/publish`,{},

  {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
      );

    if (response?.data?.success) {
        toast.success("Blog Published successfully");

        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    } 
  }

    catch (error) {
      toast.error(error.response?.data?.message || "Error publishing blog");
    }
  }
  return (
    <div className="max-w-[850px] mx-auto mt-8 px-4">

      {/* Heading + Success Message */}
      <div className="flex items-center gap-6 mb-5">
        <Navbar/>
        <h1 className="text-3xl font-bold">
          New Blog
        </h1>

        {message && (
          <div className="text-green-600 bg-green-50 px-4 py-2 rounded-md">
            🟢 {message}
          </div>
        )}
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="What is NodeJS?"
        className="border border-gray-500 w-full p-2 mb-5"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Category */}
      <select
        className="border border-gray-500 p-2 mb-5"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {BLOG_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Markdown Editor */}
      <MarkdownEditor
        value={content}
        onChange={(value) => setContent(value)}
        height="500px"
      />

      {/* Save Blog Button */}
      <button
        type="button"
        onClick={UpdateBlog}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 mt-3 rounded-md"
      >
        Save Blog
      </button>
      <button
      className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 mt-3 ml-3 rounded-md"
      type="button"
      onClick={publishBlog}
>
      Publish 
        </button>
    </div>
  );
};
export default EditBlog;