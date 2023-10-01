import React, { useState, useCallback } from "react";
import './post.scss';
import { Link } from "react-router-dom";

function Post({ text, img, id}) {
    const [thisPost, setThisPost] = useState(false);

    const postView = useCallback(() => {
        setThisPost(prevState => !prevState);
    }, []);

    return (
        <>
            <Link to={`/post/${id}`}><div onClick={postView} className="post-box">
                <div className="post">
                    <img src={img} className='posts-image' alt="Post"></img>

                </div>
                <div><div className="text-post">{text}</div></div>
            </div>
            </Link>
        </>
    );
}
export default Post;