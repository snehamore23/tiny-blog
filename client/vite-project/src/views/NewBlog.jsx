import MarkdownEditor from "@uiw/react-markdown-editor";
import { useState, useEffect } from "react";
import { BLOG_CATEGORIES } from "./../constants";
import axios from "axios";
import { getCurrentUser } from "./../util";

function NewBlog() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");

    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const saveBlog = async () => {
    if (!title || !content || !category) {
      setMessage("Please fill all fields");
      return;
    }

    if (!user?._id) {
      setMessage("Please login first");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog`,
        {
          title,
          content,
          category,
          author: user._id,
        }
      );

      if (response.data.success) {
        setMessage("Blog saved successfully");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);

      setMessage(
        error.response?.data?.message ||
        "Failed to create blog"
      );
    }
  };

  return (
    <div className="max-w-[850px] mx-auto mt-8 px-4">

      {/* Heading + Success Message */}
      <div className="flex items-center gap-6 mb-5">
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
        onClick={saveBlog}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 mt-3 rounded-md"
      >
        Save Blog
      </button>

    </div>
  );
}

export default NewBlog;