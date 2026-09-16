import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MarkdownEditor from "@uiw/react-markdown-editor";
import toast from "react-hot-toast";
import Navbar from "./../components/Navbar";
import {
  getCategoryTheme,
  getBlogCoverImage,
  calculateReadTime,
  FALLBACK_COVER_IMAGE,
  SVG_PLACEHOLDER,
} from "./../themeUtil";

function ReadBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog/${slug}`
      );
      setBlog(response.data.data || {});
    } catch (err) {
      console.error("Error loading blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    fetchBlog();
  }, [slug]);

  // Scroll reading progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formattedDate =
    blog.publishedAt || blog.updatedAt || blog.createdAt
      ? new Date(
          blog.publishedAt || blog.updatedAt || blog.createdAt
        ).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const theme = getCategoryTheme(blog.category);
  const coverImage = getBlogCoverImage(
    blog.content,
    blog.category,
    blog.title
  );
  const readTime = calculateReadTime(blog.content);

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Story link copied to clipboard! 📋");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors group"
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
            <span>Back to all stories</span>
          </Link>

          <button
            type="button"
            onClick={copyShareLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 shadow-2xs transition-all cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span>Share Story</span>
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-xs animate-pulse space-y-6">
            <div className="h-6 bg-slate-200 rounded-full w-28"></div>
            <div className="h-12 bg-slate-200 rounded-2xl w-5/6"></div>
            <div className="h-10 bg-slate-100 rounded-xl w-1/2"></div>
            <div className="aspect-[16/9] bg-slate-200 rounded-3xl w-full"></div>
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
              <div className="h-4 bg-slate-100 rounded w-4/6"></div>
            </div>
          </div>
        ) : (
          <article className="bg-white rounded-3xl p-6 sm:p-12 md:p-14 border border-slate-200/80 shadow-sm overflow-hidden">
            {/* Category & Status Bar */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
                <span>{theme.icon}</span>
                <span>{blog.category || "General"}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                <svg
                  className="w-3.5 h-3.5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{readTime}</span>
              </span>

              {blog.status !== "published" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wide">
                  Draft
                </span>
              )}
            </div>

            {/* Article Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] mb-6">
              {blog.title}
            </h1>

            {/* Author Profile Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-slate-100/90 mb-8">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 via-amber-400 to-orange-500 text-white font-bold flex items-center justify-center text-lg shadow-xs ring-2 ring-orange-100">
                  {blog?.author?.name
                    ? blog.author.name.substring(0, 1).toUpperCase()
                    : "A"}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    {blog?.author?.name || "Unknown Author"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {blog?.author?.email || "Contributing Author"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formattedDate}
                </span>

                <span className="flex items-center gap-1.5 font-medium text-slate-600">
                  <svg
                    className="w-4 h-4 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {blog.viewCount || 0} reads
                </span>
              </div>
            </div>

            {/* Visual Cover Banner Header */}
            <div className="relative aspect-[21/9] sm:aspect-[2/1] rounded-3xl overflow-hidden mb-10 bg-slate-100 shadow-sm">
              <img
                src={coverImage}
                alt={blog.title}
                onError={(e) => {
                  if (e.currentTarget.src !== FALLBACK_COVER_IMAGE) {
                    e.currentTarget.src = FALLBACK_COVER_IMAGE;
                  } else {
                    e.currentTarget.src = SVG_PLACEHOLDER;
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Markdown Content Section */}
            <div className="prose prose-slate max-w-none leading-relaxed text-slate-700">
              <MarkdownEditor.Markdown source={blog.content || ""} readOnly />
            </div>

            {/* Author Spotlight Signoff Card */}
            <div className="mt-14 pt-8 border-t border-slate-100/90">
              <div className="bg-orange-50/50 rounded-3xl p-6 sm:p-8 border border-orange-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-extrabold flex items-center justify-center text-xl shadow-md shadow-orange-500/10">
                    {blog?.author?.name
                      ? blog.author.name.substring(0, 1).toUpperCase()
                      : "A"}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                      Author Spotlight
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">
                      {blog?.author?.name || "Community Writer"}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Thank you for reading this piece on TinyBlog.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={copyShareLink}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-orange-50 hover:text-orange-700 transition-colors cursor-pointer"
                  >
                    Share Article
                  </button>
                  <Link
                    to="/"
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-200 transition-all text-center"
                  >
                    More Stories →
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 mt-auto py-8 text-slate-500 text-xs text-center">
        <p>© {new Date().getFullYear()} TinyBlog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ReadBlog;