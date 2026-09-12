import { Link } from "react-router-dom";

function BlogCard({
    title,
    author,
    createdAt,
    category,
    slug,
    status,
    _id
}) {
    return (
        <div className="relative border border-gray-400 p-4 my-3 rounded-md">

            {/* Title */}
            <h2 className="text-xl font-bold">

                {/* Status */}
                {status !== "published" ? (
                    <span className="bg-yellow-200 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-md mr-4">
                        {status}
                    </span>
                ) : null}

                {title}
            </h2>

            {/* Author */}
            <div className="flex items-center gap-4 my-3">

                {/* Profile Circle */}
                <div className="flex items-center justify-center font-semibold w-[50px] h-[50px] bg-orange-300 text-white rounded-full text-2xl">
                    {author?.name?.substring(0, 1).toUpperCase()}
                </div>

                {/* Author Details */}
                <div>
                    <p className="font-semibold">
                        Published By: {author?.name || "Unknown"}
                    </p>

                    <p className="text-sm text-gray-500">
                        {author?.email || ""}
                    </p>
                </div>

            </div>

            {/* Published Date */}
            <p className="text-sm mt-2">
                Published On:{" "}
                {createdAt
                    ? new Date(createdAt).toLocaleString()
                    : "Not available"}
            </p>

            {/* Category */}
            <span className="absolute top-3 right-3 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md">
                {category}
            </span>

            {/* Button */}
            {status === "published" ? (
                <Link
                    className="bg-gray-700 text-white px-3 py-1 rounded-md absolute bottom-3 right-4 cursor-pointer hover:bg-gray-800"
                    to={`/blog/${slug}`}
                >
                    Read More
                </Link>
            ) : (
                <Link
                    className="bg-gray-700 text-white px-3 py-1 rounded-md absolute bottom-3 right-4 cursor-pointer hover:bg-gray-800"
                    to={`/edit/${_id}`}
                >
                    Edit Blog
                </Link>
            )}

        </div>
    );
}

export default BlogCard;