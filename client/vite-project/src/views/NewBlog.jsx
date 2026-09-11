import MdEditor from "tiny-markdown-editor";
function NewBlog() {
    const NewBlogEditor= new MdEditor.Editor({ element: "editor" });
    return <h1>New Blog</h1>;
}

export default NewBlog;