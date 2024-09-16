import { ReactNode, useState, useEffect, useMemo } from 'react';
import { SwipeableHandlers, useSwipeable } from 'react-swipeable';
import classes from './Slider.module.scss';
import classConnection from '../../utils/function/classConnection';
import { SliderPagination } from './SliderPagination';
import { SliderArrow } from './SliderArrow';

export interface IBaseSlide {
    id: string | number;
}

export interface ISlider<T extends IBaseSlide> {
    name?: string;
    className?: string;
    slideClassName?: string;
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    addArrows?: boolean;
    addDots?: boolean;
    autoplay?: boolean;
    draggable?: boolean;
    looped?: boolean;
    autoplayDelay?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    prevArrow?: ReactNode;
    nextArrow?: ReactNode;
    customArrow?: ReactNode;
    initialSlide?: number;
}

export const Slider = <T extends IBaseSlide>({
    name,
    className,
    slideClassName,
    items = [],
    renderItem,
    addArrows = false,
    addDots = false,
    draggable = false,
    autoplay = false,
    looped = false,
    slidesToShow = 1,
    slidesToScroll = 1,
    autoplayDelay = 2000,
    customArrow,
    initialSlide = 0

}: ISlider<T>) => {
    const [currentSlide, setCurrentSlide] = useState(initialSlide);
    const [translateX, setTranslateX] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isClickable, setIsClickable] = useState(true)
    const [swipeOffset, setSwipeOffset] = useState(0);

    const totalScrolls = useMemo(() => {
        return Math.ceil((items.length - slidesToShow) / slidesToScroll) + 1;
    }, [items.length, slidesToShow, slidesToScroll]);

    useEffect(() => {
        updateTranslateX();
        if (Math.abs(swipeOffset) > 1 && isClickable) setIsClickable(false)
    }, [currentSlide, swipeOffset]);

    useEffect(() => {
        if (autoplay) {
            const intervalId = setInterval(nextSlide, autoplayDelay);
            return () => clearInterval(intervalId);
        }
    }, [items.length, currentSlide, autoplayDelay, autoplay]);
    const updateTranslateX = () => {
        setTranslateX(-100 * (currentSlide * (slidesToScroll / slidesToShow)) + swipeOffset);
    };

    const changeSlide = (direction: number) => {
        setSwipeOffset(0);
        setIsAnimating(true);
        setIsClickable(true)
        setCurrentSlide((prev) => {
            const newSlide = prev + direction;
            if (looped) {
                return (newSlide + totalScrolls) % totalScrolls;
            }
            return Math.max(0, Math.min(newSlide, totalScrolls - 1));
        });
    };

    const nextSlide = () => changeSlide(1);
    const prevSlide = () => changeSlide(-1);

    let handlers: SwipeableHandlers | undefined = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        onSwiping: (eventData) => {
            setIsAnimating(false);
            setSwipeOffset((eventData.deltaX / window.innerWidth) * 100);
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    const handleMouseLeave = () => {
        setSwipeOffset(0);
        updateTranslateX();
    };
    const isLastSlide = () => !looped && currentSlide >= totalScrolls - 1;
    const isFirstSlide = () => !looped && currentSlide <= 0;
    if (!draggable || totalScrolls <= 1) handlers = undefined;
    if (!items.length) return null;


    return (
        <div
            className={classConnection(classes.slider, className)}
            style={{
                cursor: draggable && totalScrolls > 1 ? 'grab' : 'auto',
                userSelect: draggable && totalScrolls > 1 ? 'none' : 'auto',
                paddingBottom: (addDots && totalScrolls > 1) ? '30px' : undefined
            }}
            {...handlers}
            onMouseLeave={draggable && totalScrolls > 1 ? handleMouseLeave : undefined}
            aria-label={name}
        >
            {(addArrows && totalScrolls > 1) && (
                <>
                    <SliderArrow
                        direction="prev"
                        onClick={prevSlide}
                        customArrow={customArrow}
                        className={isFirstSlide() ? classes.slider__arrow_disabled : ''}
                    />
                    <SliderArrow
                        direction="next"
                        onClick={nextSlide}
                        customArrow={customArrow}
                        className={isLastSlide() ? classes.slider__arrow_disabled : ''}
                    />
                </>
            )}

            <div
                className={classes.slider__slides}
                style={{
                    transform: `translateX(${translateX}%)`,
                    transition: isAnimating ? 'transform 0.3s ease' : 'none',
                    pointerEvents: isClickable ? 'auto' : 'none'
                }}
            >
                {items.map((item, index) => (
                    <div className={classConnection(classes.slider__slide, slideClassName)} key={item.id} style={{ minWidth: `${100 / slidesToShow}%` }} aria-disabled>
                        {renderItem(item, index)}
                    </div>
                ))}
            </div>

            {(addDots && totalScrolls > 1) && (
                <SliderPagination
                    items={items}
                    currentSlide={currentSlide}
                    pageCount={totalScrolls}
                    setCurrentSlide={setCurrentSlide}
                />
            )}
        </div>
    );
};