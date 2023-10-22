import React, {useMemo } from "react";
import Post from "../post/post";
import './all-posts-list.scss';
import { useSelector } from "react-redux";
function AllPostList() {
    const state = useSelector(state => state.data)

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
            <h2 className="title-all">All posts</h2>
            <div className="main">
                {elements}
            </div>
        </>
    );
}

export default AllPostList;