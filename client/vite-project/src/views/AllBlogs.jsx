import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "./../util";
import { BLOG_CATEGORIES } from "./../Constants";
import axios from "axios";
import BlogCard from "./../components/BlogCard";
import Navbar from "./../components/Navbar";
import {
  getCategoryTheme,
  getBlogCoverImage,
  getCleanExcerpt,
  calculateReadTime,
  FALLBACK_COVER_IMAGE,
  SVG_PLACEHOLDER,
} from "./../themeUtil";

function AllBlogs() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [apiError, setApiError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setApiError("");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/blog?author=${getCurrentUser()?._id || ""}`
      );
      setBlogs(response.data.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setApiError(
        err.response?.data?.message ||
        err.message ||
        "Could not load stories from the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUser(getCurrentUser());
    fetchBlogs();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  // Combined category list: "All" plus all defined categories
  const allCategories = ["All", ...BLOG_CATEGORIES];

  // Top visible categories for quick pills
  const featuredCategories = [
    { name: "All", icon: "⚡" },
    { name: "Technology", icon: "💻" },
    { name: "Artificial Intelligence", icon: "🤖" },
    { name: "Machine Learning", icon: "🧠" },
    { name: "Career", icon: "🚀" },
    { name: "Business", icon: "💼" },
  ];

  // Count blogs per category for helper badges
  const getCategoryCount = (category) => {
    if (category === "All") return blogs.length;
    return blogs.filter((b) => b.category === category).length;
  };

  // Filter blogs based on category and search query
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Spotlight and Trending blogs
  const publishedBlogs = blogs.filter((b) => b.status === "published");
  const spotlightBlog =
    publishedBlogs.length > 0
      ? [...publishedBlogs].sort(
          (a, b) => (b.viewCount || 0) - (a.viewCount || 0)
        )[0]
      : blogs[0] || null;

  const trendingBlogs = [...publishedBlogs]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 3);

  const spotlightTheme = spotlightBlog
    ? getCategoryTheme(spotlightBlog.category)
    : null;
  const spotlightCover = spotlightBlog
    ? getBlogCoverImage(
        spotlightBlog.content,
        spotlightBlog.category,
        spotlightBlog.title
      )
    : null;
  const spotlightExcerpt = spotlightBlog
    ? getCleanExcerpt(spotlightBlog.content, 130)
    : "";
  const spotlightReadTime = spotlightBlog
    ? calculateReadTime(spotlightBlog.content)
    : "3 min read";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/80 via-amber-50/30 to-slate-50 border-b border-orange-100/70 py-12 sm:py-20">
        {/* Subtle grid pattern & glow */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-orange-200/40 to-amber-200/30 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-orange-800 border border-orange-200/80 shadow-2xs mb-5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span>The Modern Community Publication</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
                Ideas that inspire, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                  stories that connect.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Explore deep perspectives, programming notes, and life lessons from writers worldwide. Or start writing your own journey in seconds.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                {user ? (
                  <Link
                    to="/new"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all"
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
                        strokeWidth="2.5"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Write a Story</span>
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all"
                  >
                    <span>Start Writing Free</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                )}

                <a
                  href="#blogs-feed"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm text-slate-700 bg-white border border-slate-200/90 hover:bg-orange-50/60 hover:text-orange-700 hover:border-orange-200 transition-all shadow-2xs"
                >
                  <span>Browse Articles</span>
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-orange-200/60 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="text-orange-500">✦</span> 26 Categories
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="text-orange-500">✦</span> Markdown Studio
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="text-orange-500">✦</span> Zero Ads
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="text-orange-500">✦</span> Free Forever
                </span>
              </div>
            </div>

            {/* Right Column: Featured Spotlight Card */}
            <div className="lg:col-span-5">
              {spotlightBlog ? (
                <div className="relative group">
                  {/* Decorative glow ring */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-400 to-amber-300 opacity-30 group-hover:opacity-60 blur-xl transition duration-500"></div>

                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-orange-200/70 p-6 shadow-xl shadow-orange-500/5 hover:shadow-2xl transition-all">
                    {/* Header Ribbon */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
                        <span>🔥</span> Featured Story
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {spotlightReadTime}
                      </span>
                    </div>

                    {/* Spotlight Visual Header */}
                    <Link
                      to={`/blog/${spotlightBlog.slug}`}
                      className="block relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-slate-100"
                    >
                      <img
                        src={spotlightCover}
                        alt={spotlightBlog.title}
                        onError={(e) => {
                          if (e.currentTarget.src !== FALLBACK_COVER_IMAGE) {
                            e.currentTarget.src = FALLBACK_COVER_IMAGE;
                          } else {
                            e.currentTarget.src = SVG_PLACEHOLDER;
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
                      <Link to={`/blog/${spotlightBlog.slug}`}>
                        {spotlightBlog.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    {spotlightExcerpt && (
                      <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                        {spotlightExcerpt}
                      </p>
                    )}

                    {/* Author & CTA */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-amber-400 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                          {spotlightBlog?.author?.name
                            ? spotlightBlog.author.name
                                .substring(0, 1)
                                .toUpperCase()
                            : "A"}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            {spotlightBlog?.author?.name || "Author"}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {spotlightBlog.viewCount || 0} reads
                          </p>
                        </div>
                      </div>

                      <Link
                        to={`/blog/${spotlightBlog.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3.5 py-1.5 rounded-full transition-all"
                      >
                        <span>Read Story</span>
                        <svg
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-orange-200/70 p-8 shadow-xl shadow-orange-500/5 text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-4">
                    ✨
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    Welcome to TinyBlog Studio
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Be the creator of our very first featured article. Write with full markdown preview and instant publishing.
                  </p>
                  <Link
                    to={user ? "/new" : "/signup"}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-200 transition-all"
                  >
                    <span>Create First Story</span>
                    <span>→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Stories Strip (Substack / Medium style) */}
      {trendingBlogs.length > 0 && (
        <section className="border-b border-slate-200/70 bg-white/80 py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-500 font-bold text-sm">⚡</span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Trending on TinyBlog
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingBlogs.map((tBlog, idx) => (
                <Link
                  key={tBlog._id}
                  to={`/blog/${tBlog.slug}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-orange-50/60 transition-all group"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold text-orange-300 group-hover:text-orange-500 transition-colors font-mono shrink-0">
                    0{idx + 1}
                  </span>
                  <img
                    src={getBlogCoverImage(
                      tBlog.content,
                      tBlog.category,
                      tBlog.title
                    )}
                    alt={tBlog.title}
                    onError={(e) => {
                      if (e.currentTarget.src !== FALLBACK_COVER_IMAGE) {
                        e.currentTarget.src = FALLBACK_COVER_IMAGE;
                      } else {
                        e.currentTarget.src = SVG_PLACEHOLDER;
                      }
                    }}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-100/70 text-orange-800">
                        {tBlog.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {calculateReadTime(tBlog.content)}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug mb-1">
                      {tBlog.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">
                      By {tBlog.author?.name || "Author"} • {tBlog.viewCount || 0} reads
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Feed */}
      <main id="blogs-feed" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Search & Category Filter Section */}
        <div className="space-y-4 mb-8">
          {/* Top Bar: Quick Chips, More Button, Dropdown, and Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Quick Topic Pills & 'More Topics' Button */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none flex-1 min-w-0">
              {featuredCategories.map((catObj) => {
                const isSelected = selectedCategory === catObj.name;
                const count = getCategoryCount(catObj.name);

                return (
                  <button
                    key={catObj.name}
                    type="button"
                    onClick={() => setSelectedCategory(catObj.name)}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 scale-105"
                        : "bg-white text-slate-600 border border-slate-200/80 hover:bg-orange-50/60 hover:text-orange-700 hover:border-orange-200"
                    }`}
                  >
                    <span>{catObj.icon}</span>
                    <span>{catObj.name}</span>
                    {count > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isSelected
                            ? "bg-orange-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* 'More Topics' Trigger Button */}
              <button
                type="button"
                onClick={() => setShowAllCategories(!showAllCategories)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  showAllCategories
                    ? "bg-slate-800 text-white shadow-xs"
                    : "bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100/80"
                }`}
                title="Browse all 26 categories"
              >
                <svg
                  className="w-3.5 h-3.5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span>All Topics ({BLOG_CATEGORIES.length})</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    showAllCategories ? "rotate-180" : ""
                  }`}
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
              </button>
            </div>

            {/* Right Controls: Search Box */}
            <div className="relative w-full sm:w-72 shrink-0">
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search stories, tags or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-white border border-slate-200/90 rounded-full text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Clear search"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Expandable 'All Topics' Drawer / Panel */}
          {showAllCategories && (
            <div className="bg-white rounded-3xl border border-orange-100 p-6 shadow-xl shadow-orange-500/5 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Explore All 26 Topics & Categories
                  </h3>
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                    Select a topic to instantly filter the feed
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCategories(false)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-700 px-2.5 py-1 rounded-lg hover:bg-slate-100 cursor-pointer flex items-center gap-1"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>Close</span>
                </button>
              </div>

              {/* Grid of All Categories with Themes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {allCategories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = getCategoryCount(cat);
                  const theme = getCategoryTheme(cat);

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowAllCategories(false);
                      }}
                      className={`p-2.5 rounded-2xl text-xs font-medium transition-all cursor-pointer flex items-center justify-between gap-1.5 text-left ${
                        isSelected
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 font-semibold"
                          : "bg-slate-50 text-slate-700 border border-slate-200/70 hover:bg-orange-50 hover:text-orange-800 hover:border-orange-200"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="shrink-0">{theme.icon}</span>
                        <span className="truncate">{cat}</span>
                      </div>
                      {count > 0 && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                            isSelected
                              ? "bg-orange-600 text-white"
                              : "bg-slate-200/80 text-slate-600"
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Filter Indicators */}
          {(selectedCategory !== "All" || searchQuery.trim() !== "") && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Active Filter:
              </span>

              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
                  Topic: {selectedCategory}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("All")}
                    className="hover:text-orange-900 cursor-pointer ml-0.5"
                    title="Remove topic filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {searchQuery.trim() !== "" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  Search: "{searchQuery}"
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="hover:text-slate-900 cursor-pointer ml-0.5"
                    title="Clear search"
                  >
                    ×
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer ml-1"
              >
                Reset all
              </button>
            </div>
          )}
        </div>

        {/* Backend Connection Notice Banner */}
        {apiError && (
          <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Backend Connection Notice</h4>
                <p className="text-xs text-amber-800/90 mt-0.5">
                  {apiError} (If using Render Free Tier, ensure your MongoDB is connected and network IP allows access).
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={fetchBlogs}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-xs cursor-pointer shrink-0"
            >
              🔄 Retry Connection
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200/60">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {selectedCategory === "All"
                ? "Latest Stories"
                : selectedCategory}
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
              {filteredBlogs.length} articles
            </span>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden p-6 animate-pulse space-y-4"
              >
                <div className="aspect-[16/9] bg-slate-200 rounded-2xl w-full"></div>
                <div className="h-4 bg-slate-200 rounded-full w-24"></div>
                <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-slate-200 rounded w-20 mb-1"></div>
                    <div className="h-2.5 bg-slate-100 rounded w-28"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blogs Grid: 3 columns on large screens for vibrant magazine layout */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                _id={blog._id}
                title={blog.title}
                content={blog.content}
                author={blog.author}
                createdAt={blog.createdAt}
                updatedAt={blog.updatedAt}
                publishedAt={blog.publishedAt}
                status={blog.status}
                category={blog.category}
                slug={blog.slug}
                viewCount={blog.viewCount}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl mb-4 border border-orange-100">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No articles found
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {searchQuery
                ? `We couldn't find any articles matching "${searchQuery}". Try searching another topic.`
                : "No stories have been published in this category yet. Be the first writer to share insights!"}
            </p>
            {user ? (
              <Link
                to="/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-200 transition-all"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Write Story in this Category</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors"
              >
                <span>Log in to Write</span>
              </Link>
            )}
          </div>
        )}

        {/* Newsletter / Stay Connected Callout Banner */}
        <section className="mt-16 bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl shadow-orange-500/10">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-black/10 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-3">
              ✦ Stay Curious
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Never miss a thoughtful story.
            </h3>
            <p className="text-orange-100 text-sm sm:text-base mb-6 leading-relaxed">
              Read perspectives on tech, development, career, and lifestyle curated by independent thinkers across the globe.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-2xl bg-white/95 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="button"
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                Join Community
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 mt-auto py-10 text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                T
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                Tiny<span className="text-orange-500">Blog</span>
              </span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-500 hidden sm:inline">
                A modern publishing space for creative ideas and insights.
              </span>
            </div>

            <div className="flex items-center gap-5 font-semibold text-slate-600">
              <Link to="/" className="hover:text-orange-600 transition-colors">
                Explore
              </Link>
              <Link to="/new" className="hover:text-orange-600 transition-colors">
                Write
              </Link>
              <Link to="/login" className="hover:text-orange-600 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="hover:text-orange-600 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
            <span>
              © {new Date().getFullYear()} TinyBlog Inc. All rights reserved.
            </span>
            <span>Crafted for modern readers & writers.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AllBlogs;