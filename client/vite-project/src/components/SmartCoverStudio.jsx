import React, { useState, useEffect } from "react";
import { guessTopic, FALLBACK_COVER_IMAGE, extractCoverImage } from "./../themeUtil";

function SmartCoverStudio({
  title = "",
  content = "",
  category = "",
  onSelectCategory,
  onInsertCover,
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [customUrl, setCustomUrl] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [justInserted, setJustInserted] = useState(false);

  // Guess the topic from the title, content, and category
  const guessed = guessTopic(title, content, category);
  const images = guessed?.images && guessed.images.length > 0 ? guessed.images : [FALLBACK_COVER_IMAGE];

  // Active cover image (custom or cycled topic image)
  const activeImage = customUrl.trim() || images[imageIndex % images.length];

  // Check if content already contains an embedded cover image
  const existingCoverInContent = extractCoverImage(content);

  // Reset variation index if topic changes significantly
  useEffect(() => {
    setImageIndex(0);
  }, [guessed.topic]);

  const handleCycleNext = () => {
    setCustomUrl("");
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleInsert = () => {
    if (onInsertCover) {
      onInsertCover(activeImage);
      setJustInserted(true);
      setTimeout(() => setJustInserted(false), 2500);
    }
  };

  const isCategoryMismatch =
    guessed.category &&
    category &&
    guessed.category.toLowerCase() !== category.toLowerCase() &&
    guessed.topic !== "General Story";

  return (
    <div className="bg-gradient-to-br from-orange-50/70 via-amber-50/40 to-slate-50 rounded-3xl p-5 sm:p-6 border border-orange-200/80 shadow-xs space-y-4">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center text-sm shadow-xs">
            ✨
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Auto Topic Detection & Cover Studio</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                AI Powered
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Guesses the topic from your title & story to automatically generate a matching cover.
            </p>
          </div>
        </div>

        {/* Guessed Topic Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-orange-200/90 text-xs font-bold text-slate-800 shadow-2xs">
          <span>{guessed.icon}</span>
          <span>Guessed Topic:</span>
          <span className="text-orange-600 font-extrabold">{guessed.topic}</span>
        </div>
      </div>

      {/* Live Preview Container */}
      <div className="relative rounded-2xl overflow-hidden aspect-[21/9] sm:aspect-[2.4/1] bg-slate-100 border border-orange-200/60 shadow-inner group">
        <img
          src={activeImage}
          alt={title || guessed.topic}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_COVER_IMAGE;
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

        {/* Floating Badges on Preview */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-900 shadow-sm">
            <span>{guessed.icon}</span>
            <span>{guessed.topic}</span>
          </span>

          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white">
            {customUrl ? "Custom Image" : `Variation ${((imageIndex % images.length) + 1)}/${images.length}`}
          </span>
        </div>

        {/* Bottom Title Preview on Image */}
        <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
          <p className="text-white font-bold text-sm sm:text-base leading-tight drop-shadow-md line-clamp-1">
            {title.trim() ? title : "Your Story Title Preview..."}
          </p>
          <p className="text-white/80 text-[11px] mt-0.5">
            {guessed.description}
          </p>
        </div>
      </div>

      {/* Action Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Cycle Next Variation */}
          <button
            type="button"
            onClick={handleCycleNext}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 shadow-2xs transition-all cursor-pointer"
            title="Cycle through matching high-res photos for this topic"
          >
            <span>🔄</span>
            <span>Cycle Another Image</span>
          </button>

          {/* Insert into Markdown Body */}
          <button
            type="button"
            onClick={handleInsert}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
              justInserted
                ? "bg-emerald-500 text-white"
                : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/10"
            }`}
          >
            <span>{justInserted ? "✅" : "📌"}</span>
            <span>
              {justInserted
                ? "Inserted at top of story!"
                : "Insert Cover into Story"}
            </span>
          </button>

          {/* Custom URL Toggle */}
          <button
            type="button"
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white/80 transition-colors cursor-pointer"
          >
            <span>🔗</span>
            <span>{showCustomInput ? "Hide URL Input" : "Use Custom URL"}</span>
          </button>
        </div>

        {/* Sync Category Suggestion if mismatched */}
        {isCategoryMismatch && onSelectCategory && (
          <button
            type="button"
            onClick={() => onSelectCategory(guessed.category)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300/80 transition-all cursor-pointer"
          >
            <span>🏷️</span>
            <span>
              Set category to <strong>{guessed.category}</strong>
            </span>
          </button>
        )}
      </div>

      {/* Expandable Custom URL Input */}
      {showCustomInput && (
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <input
              type="url"
              placeholder="Paste any custom photo URL (https://...)"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs text-slate-800 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {customUrl && (
              <button
                type="button"
                onClick={() => setCustomUrl("")}
                className="px-2.5 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Helpful Info Footnote */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-orange-100/80">
        <span className="flex items-center gap-1">
          <span>💡</span>
          <span>
            {existingCoverInContent
              ? "Your article has an embedded image which will be used as the primary cover."
              : "TinyBlog will automatically display this guessed topic cover across all feeds even if you don't insert it into markdown."}
          </span>
        </span>
      </div>
    </div>
  );
}

export default SmartCoverStudio;
