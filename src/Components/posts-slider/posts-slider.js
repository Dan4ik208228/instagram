import './posts-slider.scss';
import Slide from '../slide/slide'
import React, { useState, useMemo, useContext } from 'react';
import Context from '../data-context/data-context';

function PostsSlider() {
    const [firstPos, setFirstPos] = useState(0);
    const [currPos, setCurrPos] = useState(0);
    const [transform, setTransform] = useState('');
    const [move, setMove] = useState(false);
    const [translate, setTranslate] = useState(0);
    const { data, slides, onLike, onDelete, sliderWidth, maxSlides } = useContext(Context);

    const mouseDown = (e, num) => {

        if (num) {
            setFirstPos(e.touches[0].clientX);
        } else {
            setFirstPos(e.clientX);
        }
        setMove(true);
    }

    const mouseUp = (e) => {
        setMove(false);
        if (firstPos - e.clientX > sliderWidth + (sliderWidth + sliderWidth / 4)) {
            mouseCalc(e, (firstPos - e.clientX));
        } else if (firstPos - e.clientX < (sliderWidth + (sliderWidth + sliderWidth / 4)) / -1) {
            mouseCalc(e, (firstPos - e.clientX));
        } else {
            mouseCalc(e);
        }
        setTransform('transform 0.2s ease');
    }

    const mouseCalc = (e, jump) => {
        if (jump !== undefined && translate > sliderWidth * -(data.slice(0, 5).length - maxSlides + 1) && translate < 0) {
        } else {
            if (((translate / sliderWidth) - (Math.floor(translate / sliderWidth + 1))) * -1 > 0.5 && translate < 0 && translate > sliderWidth * -(data.slice(0, 5).length - maxSlides + 1)) {
                setTranslate((Math.floor(translate / sliderWidth)) * sliderWidth);
                setCurrPos((Math.floor(translate / sliderWidth)) * sliderWidth);
                setMove(false);

            } else if (translate < 0) {
                if (translate * -1 > (sliderWidth * -(data.slice(0, 5).length - maxSlides)) * -1) {
                    setTranslate((sliderWidth * -(data.slice(0, 5).length - maxSlides)));
                    setCurrPos((sliderWidth * -(data.slice(0, 5).length - maxSlides)));
                    setMove(false);
                } else {
                    setTranslate((Math.floor(translate / sliderWidth)) * sliderWidth + sliderWidth);
                    setCurrPos((Math.floor(translate / sliderWidth)) * sliderWidth + sliderWidth);
                    setMove(false);
                }
            } else if (translate > 0) {
                setTranslate(0);
                setCurrPos(0);
                setMove(false);
            }
        }
    }


    const mouseMove = (e, num) => {
        setTransform('transform 0s ease');
        if (move === true) {
            if (num) {
                setTranslate(currPos + e.touches[0].clientX - firstPos);
            } else {
                setTranslate(currPos + e.clientX - firstPos);
            }
        }
    }

    const scrollSlide = (e) => {
        if (!e.shiftKey) {
            return;
        }
        setTransform('transform 0.2s ease');
        if (e.nativeEvent.deltaY > 0 && translate > sliderWidth * -(data.slice(0, 5).length - maxSlides)) {
            setTranslate(translate - sliderWidth);
            setCurrPos(translate - sliderWidth);
        } else if (e.nativeEvent.deltaY < 0 && translate < 0) {
            setTranslate(translate + sliderWidth);
            setCurrPos(translate + sliderWidth);
        }
    }

    const elements = useMemo(() =>
        slides.map(item => (
            <Slide
                key={item.id}
                {...item}
                like={onLike}
                deleteItem={onDelete}
            />
        )),
        [slides, onLike, onDelete]
    );

    const mouseOut = (e) => {
        setTransform('transform 0.2s ease');
        mouseCalc(e);
    }

    return (
        <div className='posts-slider-block'>
            <div className='info-block'>
                <p className='top-posts'><b>Top posts</b></p>
            </div>
            <div className="slider"
                onWheel={scrollSlide}
                onMouseMove={(e) => mouseMove(e, 0)}
                onMouseDown={(e) => mouseDown(e, 0)}
                onMouseUp={mouseUp}
                onTouchStart={(e) => mouseDown(e, 1)}
                onTouchMove={(e) => mouseMove(e, 1)}
                onTouchEnd={mouseUp}
                onMouseLeave={mouseOut}
            >
                <div className="slider-list">
                    <div style={{ 'transform': "translateX(" + translate + 'px)', 'transition': transform }} className="slider-cards">
                        {elements}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PostsSlider;