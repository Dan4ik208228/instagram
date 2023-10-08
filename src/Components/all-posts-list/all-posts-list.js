import React, { useContext, useMemo } from "react";
import Post from "../post/post";
import './all-posts-list.scss';
import Context from "../data-context/data-context";

function AllPostList() {
    const { onDelete, onLike, posts } = useContext(Context);

    const elements = useMemo(() => (
        posts.map(item => (
            <Post
                key={item.id}
                {...item}
                like={onLike}
                deleteItem={onDelete}
            />
        ))),
        [posts, onLike, onDelete]
    );

    return (
        <>
            <h2 className="title-all">All posts</h2>
            <div className="main">
                {elements}
            </div>
        </>
    );
}

export default AllPostList;