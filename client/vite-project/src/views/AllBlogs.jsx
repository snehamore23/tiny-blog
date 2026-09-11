import React, { useState, useEffect } from "react";
import { getCurrentUser } from "./../util";

function AllBlogs() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = getCurrentUser();

        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    return (
        <div>
            <h1>All Blogs</h1>

            {user ? `Hello, ${user.name}!` : `Welcome, Guest!`}
        </div>
    );
}

export default AllBlogs;