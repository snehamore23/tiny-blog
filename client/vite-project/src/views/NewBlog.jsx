import MarkdownEditor from "@uiw/react-markdown-editor";
import { useState, useEffect } from "react";
import { BLOG_CATEGORIES } from "./../Constants";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getCurrentUser } from "./../util";
import Navbar from "./../components/Navbar";
import SmartCoverStudio from "./../components/SmartCoverStudio";
import { getCategoryTheme, calculateReadTime } from "./../themeUtil";

function NewBlog() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInsertCover = (imageUrl) => {
    const coverMarkdown = `![Cover Image](${imageUrl})\n\n`;
    if (content.startsWith("![Cover Image](")) {
      const closingIdx = content.indexOf(")\n\n");
      if (closingIdx !== -1) {
        setContent(coverMarkdown + content.substring(closingIdx + 3));
        return;
      }
    }
    setContent(coverMarkdown + content);
  };

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
      setIsSubmitting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog`,
        {
          title,
          content,
          category,
          author: user._id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setMessage("Blog saved successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Failed to create blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSuccessMessage = message.toLowerCase().includes("success");
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTimePreview = calculateReadTime(content);
  const theme = getCategoryTheme(category);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Top Header & Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-orange-600 mb-2 transition-colors group"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to stories</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create New Story
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Craft your narrative using Markdown with real-time preview.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={saveBlog}
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{isSubmitting ? "Saving Story..." : "Save Blog"}</span>
            </button>
          </div>
        </div>

        {/* Status Message Banner */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border text-sm font-semibold shadow-xs ${
              isSuccessMessage
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <span>{isSuccessMessage ? "✅" : "⚠️"}</span>
            <span>{message}</span>
          </div>
        )}

        {/* Editor Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Story Title
            </label>
            <input
              type="text"
              placeholder="What is your story about? (e.g. Building Scalable Applications with React & Node)"
              className="w-full px-4 py-3.5 text-base sm:text-lg font-bold text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category Dropdown & Quick Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Category
              </label>
              <div className="relative inline-block w-full sm:w-72">
                <select
                  className="w-full pl-10 pr-9 py-2.5 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all cursor-pointer appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none">
                  {theme.icon}
                </span>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Live Writing Stats Badge */}
            <div className="flex items-center gap-3 self-end sm:self-center bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200/80 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">
                {wordCount} words
              </span>
              <span>•</span>
              <span className="text-orange-600 font-semibold">
                {readTimePreview}
              </span>
            </div>
          </div>

          {/* Smart Topic & Cover Studio */}
          <SmartCoverStudio
            title={title}
            content={content}
            category={category}
            onSelectCategory={(cat) => setCategory(cat)}
            onInsertCover={handleInsertCover}
          />

          {/* Markdown Content Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Article Body (Markdown)
              </label>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Supports headings, bold, code blocks, images & tables
              </span>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
              <MarkdownEditor
                value={content}
                onChange={(value) => setContent(value)}
                height="450px"
              />
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={saveBlog}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{isSubmitting ? "Saving..." : "Save Blog"}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NewBlog;