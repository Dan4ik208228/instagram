import React from "react";
import './post.scss';
import { Link } from "react-router-dom";

function Post({ text, img, id}) {
    
    return (
        <>
            <Link to={`/post/${id}`}><div className="post-box">
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