import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";

import AllBlogs from "./views/AllBlogs";
import NewBlog from "./views/NewBlog";
import EditBlog from "./views/EditBlog";
import ReadBlog from "./views/ReadBlog";
import Login from "./views/Login";
import Signup from "./views/Signup";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/edit/:slug" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <span className="text-7xl font-extrabold text-orange-500 mb-2">404</span>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Page Not Found</h1>
            <p className="text-slate-500 max-w-md mb-6">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
              to="/"
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl shadow-md shadow-orange-200 transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        }
      />
    </Routes>
  </BrowserRouter>
);