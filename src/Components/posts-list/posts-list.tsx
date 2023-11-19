import React, { useMemo } from "react";
import Post from "../post/post.tsx";
import './posts-list.scss';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function PostList() {
    const state = useSelector(state => state.defaultPosts)

    const elements = useMemo(() => (
        state.map(item => (
            <Post
                key={item.id}
                {...item}
            />
        ))),
        [state]
    );

    return (
        <>
            <div className="info-block-slider">
                <p className="top-articles">
                    <b>Top articles</b>
                </p>
                <Link to="/view-All">
                    <p>
                        <b className="view-all">View all</b>
                    </p>
                </Link>
            </div>
            <div className="main">
                {elements}
            </div>
        </>
    );
}

export default PostList;