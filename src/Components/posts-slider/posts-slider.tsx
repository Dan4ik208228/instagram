import './posts-slider.scss';
import Slide from '../slide/slide'
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

function PostsSlider() {
    const [firstPos, setFirstPos] = useState(0);
    const [currPos, setCurrPos] = useState(0);
    const [transform, setTransform] = useState('');
    const [move, setMove] = useState(false);
    const [translate, setTranslate] = useState(0);
    const { data, slides, onLike, onDelete, sliderWidth, maxSlides } = useSelector((state: any) => state);

    const mouseDown = (e, num) => {
        if (num) {
            setFirstPos(e.touches[0].clientX);
        } else {
            setFirstPos(e.clientX);
        }
        setMove(true);
    }

    const mouseUp = (e) => {
        const slide05 = sliderWidth + (sliderWidth + sliderWidth / 4);
        setMove(false);
        mouseCalc();

        setTransform('transform 0.2s ease');
    }

    const mouseCalc = () => {
        const slides = Math.min(data.length, 5) - maxSlides,
            slidesNowScrolled = translate / sliderWidth,
            slidesScrolled = Math.floor(slidesNowScrolled),
            allSlideWidth = sliderWidth * slides,
            slideScrolledWidth = slidesScrolled * sliderWidth;

        const translateAmount = slideScrolledWidth + Math.round(slidesNowScrolled - slidesScrolled) * sliderWidth;
        const translateValue = Math.max(-allSlideWidth, Math.min(translateAmount, 0));

        setTranslate(translateValue);
        setCurrPos(translateValue);

        setMove(false);
    }


    const mouseMove = (e, num) => {
        setTransform('transform 0s ease');
        if (move === true) {
            if (num) {
                setTranslate(currPos + e.touches[0].clientX - firstPos);
            } else {
                setTranslate(currPos + e.clientX - irstPos);
            }
        }
    }

    const scrollSlide = (e) => {
        if (!e.shiftKey) {
            return;
        }
        setTransform('transform 0.2s ease');
        if (e.nativeEvent.deltaY > 0 && translate > sliderWidth * -(slides)) {
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

    const mouseOut = () => {
        setTransform('transform 0.2s ease');
        mouseCalc();
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