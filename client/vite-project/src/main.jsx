import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import AppBlogs from "./views/AllBlogs";
import NewBlog from "./views/NewBlog";
import EditBlog from "./views/EditBlog";
import ReadBlog from "./views/ReadBlogs";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppBlogs />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />

      <Route
        path="*"
        element={
          <h1 className="text-center mt-5">
            404 Not Found
          </h1>
        }
      />
    </Routes>
  </BrowserRouter>
);