import MarkdownEditor from "@uiw/react-markdown-editor";
import { useState, useEffect } from "react";
import {BLOG_CATEGORIES} from "./../constatnts";
function NewBlog() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(BLOG_CATEGORIES[0]);

    useEffect(() => {
        document.documentElement.setAttribute("data-color-mode", "light");
    }, []);
  return (
    <div classsName="container mx-auto p-4">
      <h1>New Blog</h1>
<input
        type="text"
        placeholder="Enter blog title"
        className="border p-2 w-full mb-4"
        />
      <MarkdownEditor
        value={content}
        onChange={(value) => {
         setContent(value);
        }}
        height= "500px"
      />
    </div>
  );
}

export default NewBlog;