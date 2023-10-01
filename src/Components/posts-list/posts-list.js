import React, { useEffect, useState, useContext, useMemo } from "react";
import Post from "../post/post";
import './posts-list.scss';
import Context from "../data-context/data-context";
import { Link} from "react-router-dom";

function PostList() {
    const { defaultPosts, onDelete, onLike } = useContext(Context);
    const [vievInfo, setVievInfo] = useState('grid')

    useEffect(() => {
        if (window.location.pathname == '/view-All') {
            setVievInfo('none');
        }
    }, []);

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
            <div style={{ display: vievInfo }} className="info-block-slider"><p className="top-articles"><b>Top articles</b></p><Link to="/view-All"><p ><b className="view-all">View all</b></p></Link></div>
            <div className="main">
                {elements}
            </div>
        </>
    );
}

export default PostList;