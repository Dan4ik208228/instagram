import React, { useState, useEffect, useCallback, useRef } from "react";
import './slide.scss';
import { ReactComponent as Profile } from '../../images/svg/profile.svg';
import { ReactComponent as Like } from '../../images/svg/like.svg';
import { ReactComponent as Dots } from '../../images/svg/dots-vertical.svg';
import { ReactComponent as Arrow } from '../../images/svg/arrow.svg';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMaxSlides, setSliderWidth } from "../../redux/actions.ts";

function Slide({ text, likes, img, id, ifLike, like }) {
    const dispatch = useDispatch();

    const [startMove, setStartMove] = useState<string>("none");
    const [colorlike, setColorLike] = useState<string>("white");
    const slideWidth = useRef<undefined>(null);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        if (ifLike === true) {
            setColorLike('#277be9');
        } else {
            setColorLike('white');
        }
        maxSlide();
        rend();
        window.addEventListener('resize', function () {
            maxSlide();
            rend();
        }
        );
        return () => {
            window.removeEventListener('resize', rend);
        };
    }, []);

    const maxSlide = () => {
        let windowWidth = window.innerWidth
        if (windowWidth > 1199.98) {
            dispatch(setMaxSlides(3));
        } else if (windowWidth > 991.98) {
            dispatch(setMaxSlides(2));
        } else {
           dispatch(setMaxSlides(1));
        }
    }

    const rend = () => {
        if (slideWidth.current) {
            const width = slideWidth.current.clientWidth;

            dispatch(setSliderWidth(width));
        }
    }

    const [thisPost, setThisPost] = useState(false);

    const onLike = useCallback(() => {
        if (ifLike === false) {
            setColorLike('#277be9');
        } else {
            setColorLike('white');
        }
        dispatch({type:'ONLIKE', id:id - 0, ifLike})
    }, [id, ifLike, like]);

    const postView = useCallback(() => {
        setThisPost(prevState => !prevState);
    }, []);

    const openMenu = () => {
        if (startMove === "flex") {
            setStartMove("none");
        } else {
            setStartMove("flex");
        }
        const timerId = setTimeout(() => {
            setIsActive(!isActive);
        }, 1);
        return () => clearTimeout(timerId);
    }
    const classes = isActive ? 'slideMenu openMenu' : 'slideMenu';

    return (
        <>
            <div ref={slideWidth} className="post-card">
                <div className="slide">
                    <div className="post-card-slide">
                        <img src={img} className='posts-image-slide' alt="Post"></img>
                    </div>
                    <div className="post-info-slider">
                        <div><div className="text-post-slide">{text}</div></div>
                        <div className='profile-slide'>
                            <Profile />
                            <div className='stats-slide'>
                                <div className='profile-name-slide'>No name</div>
                            </div>
                            <div className="options-slide">
                                <div className="menu">
                                    <Dots onClick={openMenu} className="dots-slide openMenu" />

                                    <div style={{ display: startMove }} className={classes}>
                                        <Like style={{ color: colorlike }} onClick={onLike} className="like-slide" /><p className="likes-slide">{likes}</p>
                                    </div>
                                </div>
                                <Link to={`post?id=${id}`}><Arrow onClick={postView} className="dots-slide" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Slide;