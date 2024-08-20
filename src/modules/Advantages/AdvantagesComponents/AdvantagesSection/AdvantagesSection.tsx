import classes from './AdvantagesSection.module.scss'
import { Slider } from '../../../../components/Slider'
import { observer } from 'mobx-react-lite'
import { applicationStore } from '../../../../store'
import { AdvantagesCard } from '../AdvantagesCard/AdvantagesCard'
import Section from '../../../../components/Section/Section'

export const AdvantagesSection = observer(() => {
    return (
        <Section
            className={classes.advantagesSection}
        >
            <div className={classes.advantagesSection__inner}>
                <h2 className={classes.advantagesSection__title}>Приходите и убедитесь сами</h2>
                <Slider
                    className={classes.advantagesSection__slider}
                    items={applicationStore.advantages}
                    addDots
                    draggable
                    looped
                    autoplay
                    autoplayDelay={5000}
                    slidesToShow={4}
                    slidesToScroll={1}
                    slideClassName={classes.advantagesSection__slide}
                    renderItem={(advantage) =>
                        <AdvantagesCard
                            className={classes.advantagesSection__card}
                            key={advantage.id}
                            title={advantage.title}
                            description={advantage.description}
                            imageSrc={advantage.imageSrc}
                        />
                    }
                />
            </div>

        </Section>

    )
})
