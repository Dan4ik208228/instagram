import './post-modal-icon.scss';
import { ReactComponent as Profile } from '../../images/svg/profile.svg';
import { ReactComponent as Like } from '../../images/svg/like.svg'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { startLoad, stopLoad } from '../../redux/actions.ts';
import { server, PostData } from '../../services/service.ts';
import { useLocation } from 'react-router-dom';

function PostModal() {
    const location = useLocation();
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();
    const params: any = useParams();
    const { ifLike, text, likes, img } = data;
    const dataLoader = () => {
        const url = location.search;
        dispatch(startLoad());
        server.fromServer(url).then((res: PostData[]) => {
            console.log(res)
            setData(res[0])
        })
        dispatch(stopLoad());
    }
    useEffect(() => {
        dataLoader()
    }, []);

    const onLike = () => {
        dispatch({ type: 'ONLIKE', id: data.id, ifLike })
        dataLoader()
    }
    const onDelete = () => {
        dispatch({ type: 'ONDELETE', id: data.id })
    }



    return (
        <>
            <header className='add-post-header'>
                <h1>Add Post</h1>
                <Link className='link-home' to="/"><h3>To Home</h3></Link>
            </header>
            <div className='background-shadow'>
                <div className='image-block'>
                    <img src={img} className='post-image'></img>
                </div>
                <div className='profile-stats'>
                    <h3 className='title-prof'>Profile</h3>
                    <div className='profile-inf'>
                        <Profile />
                        <div className='stats'>
                            <div className='profile-name'>No name</div>
                            <div className='profile-subs'>0</div>
                        </div>
                    </div>
                </div>
                <div className='post-text-pack'><h3 className='aut-text'>Author's text</h3><div className="text-post">{text}</div></div>
                <div className='option'>
                    <div className='like-option'>
                        <p className='likes'>Likes</p>
                        <Like style={ifLike ? { 'color': '#3498db' } : { 'color': "white" }} onClick={onLike} />
                        <p className='likes-num'>{likes}</p>
                    </div>
                    <div className='delete-option'>
                        <Link to={`/`}><button onClick={() => onDelete()} className='btn-delete-posts'>Delete</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PostModal