import { observer } from 'mobx-react-lite'
import { Slider } from '../../../../components/Slider'
import { applicationStore } from '../../../../store'



import classes from './HomeMainSlider.module.scss'
export const HomeMainSlider = observer(() => {
    return (
        <Slider
            className={classes.homeMainSlider}
            items={applicationStore.homeSlider}
            renderItem={
                (item) =>
                    <div className={classes.homeMainSlider__slide}>
                        <img className={classes.homeMainSlider__image} src={item.imageSrc} alt={item.imageSrc}/>
                    </div>
            }
            addArrows
            draggable
            looped
            autoplay
            autoplayDelay={5000}
            slidesToShow={1}
            slidesToScroll={1}
        />)
})