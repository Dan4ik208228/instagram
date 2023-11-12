import React, { ReactElement, useMemo } from "react";
import Post from "../post/post.tsx";
import './all-posts-list.scss';
import { useSelector } from "react-redux";
import { StoreState } from "../../redux/reducers";

function AllPostList() {
    const state = useSelector((state: StoreState) => state.data)

    const elements = useMemo(() => (
        state.map< ReactElement >(item => (
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