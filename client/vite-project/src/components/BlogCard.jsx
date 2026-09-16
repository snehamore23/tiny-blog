import { Link } from "react-router-dom";
import {
  getBlogCoverImage,
  getCleanExcerpt,
  calculateReadTime,
  FALLBACK_COVER_IMAGE,
  SVG_PLACEHOLDER,
} from "./../themeUtil";

function BlogCard({
  title,
  content,
  author,
  createdAt,
  publishedAt,
  updatedAt,
  category,
  slug,
  status,
  viewCount,
  _id,
}) {
  const formattedDate = new Date(
    publishedAt || updatedAt || createdAt
  ).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const coverImage = getBlogCoverImage(content, category, title);
  const excerpt = getCleanExcerpt(content, 110);
  const readTime = calculateReadTime(content);
  const targetLink = status === "published" ? `/blog/${slug}` : `/edit/${slug}`;

  return (
    <article className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Simple, Clean Photo Cover Image */}
        <Link
          to={targetLink}
          className="block relative overflow-hidden aspect-[16/9] w-full bg-slate-100"
        >
          <img
            src={coverImage}
            alt={title}
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_COVER_IMAGE) {
                e.currentTarget.src = FALLBACK_COVER_IMAGE;
              } else {
                e.currentTarget.src = SVG_PLACEHOLDER;
              }
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Floating Category & Status Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-md text-slate-800 shadow-sm border border-white/50">
              {category || "General"}
            </span>

            {status !== "published" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-sm uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                {status || "draft"}
              </span>
            )}
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-6">
          {/* Read Time & Date Meta */}
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
            <span className="flex items-center gap-1 font-medium text-slate-500">
              <svg
                className="w-3.5 h-3.5 text-orange-500"
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
              {readTime}
            </span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2 mb-2.5">
            <Link to={targetLink}>{title}</Link>
          </h2>

          {/* Excerpt Snippet */}
          {excerpt && (
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
              {excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer: Author & Action Button */}
      <div className="px-6 pb-6 pt-3 border-t border-slate-100/80 flex items-center justify-between gap-3">
        {/* Author Details */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 via-amber-400 to-orange-500 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0 ring-2 ring-orange-100">
            {author?.name ? author.name.substring(0, 1).toUpperCase() : "A"}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {author?.name || "Anonymous"}
            </p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <svg
                className="w-3 h-3 text-slate-400"
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
              {viewCount || 0} reads
            </p>
          </div>
        </div>

        {/* Action Button */}
        {status === "published" ? (
          <Link
            to={`/blog/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-white bg-orange-50 hover:bg-orange-500 border border-orange-200/60 px-3.5 py-1.5 rounded-full transition-all duration-200 shrink-0 shadow-2xs group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500"
          >
            <span>Read</span>
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        ) : (
          <Link
            to={`/edit/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-white bg-amber-50 hover:bg-amber-500 border border-amber-200 px-3 py-1.5 rounded-full transition-all duration-200 shrink-0"
          >
            <span>Edit</span>
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}

export default BlogCard;
