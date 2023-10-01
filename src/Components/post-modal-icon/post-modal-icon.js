import './post-modal-icon.scss';
import { useContext } from 'react';
import Context from '../data-context/data-context';
import { ReactComponent as Profile } from '../svg/profile.svg';
import { ReactComponent as Like } from '../svg/like.svg'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function PostModal() {
    const params = useParams();
    const { data, onLike, onDelete } = useContext(Context);
    let thisData = data.filter(function (e) { return e.id == params.post })
    const { ifLike, text, likes, img } = thisData[0];
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
                        <Like style={ifLike ? { 'color': '#3498db' } : { 'color': "white" }} onClick={() => onLike(params.post - 0, ifLike)} />
                        <p className='likes-num'>{likes}</p>
                    </div>
                    <div className='delete-option'>
                        <Link to={`/`}><button onClick={() => onDelete(params.post - 0)} className='btn-delete-posts'>Delete</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PostModal