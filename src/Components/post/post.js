import React, { useState, useEffect, useCallback, useContext } from "react";
import Context from '../data-context/data-context';
import ReactDOM from 'react-dom';
import PostModal from '../post-modal-icon/post-modal-icon';
import './post.scss';
import { ReactComponent as Like } from '../svg/like.svg';
import { ReactComponent as Profile } from '../svg/profile.svg';
import { Link } from "react-router-dom";


function Post({ text, likes, img, id, ifLike, like, deleteItem }) {
    const [thisPost, setThisPost] = useState(false);

    const onLike = useCallback(() => {
        like(id, ifLike);
    }, [id, ifLike, like]);

    const onDelete = useCallback(() => {
        console.log(id)
        deleteItem(id);
    }, [id, deleteItem]);

    const postView = useCallback(() => {
        setThisPost(prevState => !prevState);
    }, []);

    return (
        <>
            <Link to={`post/${id}`}><div onClick={postView} className="post-box">
            <div className="post">
                <img src={img} className='posts-image' alt="Post"></img>
                <div><div className="text-post">{text}</div></div>
                </div>
            </div>
            </Link>

            {thisPost &&
                <Portal>
                    <PostModal
                        postView={postView}
                        text={text}
                        img={img}
                        onLike={onLike}
                        likes={likes}
                        onDelete={onDelete}
                        ifLike={ifLike}
                    />
                </Portal>
            }
        </>
    );
}
export default Post;