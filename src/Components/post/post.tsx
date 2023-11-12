import React from "react";
import './post.scss';
import { Link } from "react-router-dom";

type PostProps = {
    text: string;
    img: string;
    id: number;
}

function Post({ text, img, id }: PostProps) {

    return (
        <>
            <Link to={`/post/${id}`}>
                <div className="post-box">
                    <div className="post">
                        <img src={img} className='posts-image' alt="Post"></img>
                    </div>
                    <div className="post-body">
                        <div className="text-post">{text}</div>
                    </div>
                </div>
            </Link>
        </>
    );
}
export default Post;