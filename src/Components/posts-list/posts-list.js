import React, { useContext, useMemo } from "react";
import Post from "../post/post";
import './posts-list.scss';
import Context from "../data-context/data-context";

function PostList() {
    const { defaultPosts, onDelete, onLike } = useContext(Context);
console.log(defaultPosts)
    const elements = useMemo(() =>
        defaultPosts.map(item => (
            <Post
                key={item.id}
                {...item}
                like={onLike}
                deleteItem={onDelete}
            />
        )),
        [defaultPosts, onLike, onDelete]
    );

    return (
    <>
        <div className="info-block-slider"><p className="top-articles"><b>Top articles</b></p><p><b className="view-all">View all</b></p></div>
        <div className="main">
            {elements}
        </div>
    </>
    );
}

export default PostList;