import Section from "../../components/Section/Section"
import { Slider } from "../../components/Slider"
import { applicationStore } from "../../store"
import classConnection from "../../utils/function/classConnection"
import Instagram from '../../assets/icons/social/instagram.svg'
import Whatsapp from '../../assets/icons/social/whatsapp.svg'
import Map from '../../assets/icons/social/map.svg'
import sliderImage1 from '../../assets/images/12_11zon.jpg'
import sliderImage2 from '../../assets/images/background/1.png'
import sliderImage3 from '../../assets/images/background/2.png'
import Arrow from '../../assets/icons/Arrow.svg'
import classes from './/HomeMainSection.module.scss'
const slides = [
    {
        id: 1,
        image: sliderImage1,
    },
    {
        id: 2,
        image: sliderImage2,
    },
    {
        id: 3,
        image: sliderImage3,
    },
]
const HomeMainSection = () => {

    return (
        <Section className={classes.homeMain}>
            <div className={classes.homeMain__titleBox}>
                <span className={classConnection(classes.homeMain__titleDecoration, classes.homeMain__titleDecoration_reverse)} />
                <h1 className={classes.homeMain__title}>PETROVA PILIT</h1>
                <span className={classes.homeMain__titleDecoration} />
            </div>
            <div className={classes.homeMain__content}>
                <nav className={classes.homeMain__links}>
                    <a
                        className={classes.homeMain__contactLink}
                        href={applicationStore.whatsapp}
                        target="_blank"
                        title='WhatsApp'
                        aria-label="WhatsApp"
                    >
                        <img className={classes.homeMain__contactIcon} src={Whatsapp} alt="WhatsApp" />
                    </a>

                    <a
                        className={classes.homeMain__contactLink}
                        href={applicationStore.addressLink}
                        target="_blank"
                        title='Instagram'
                        aria-label="Instagram"

                    >
                        <img className={classes.homeMain__contactIcon} src={Instagram} alt="Instagram" />
                    </a>
                    <a
                        className={classes.homeMain__contactLink}
                        href={applicationStore.instagram}
                        target="_blank"
                        title={applicationStore.addressName}
                        aria-label={applicationStore.addressName}

                    >
                        <img className={classes.homeMain__contactIcon} src={Map} alt={applicationStore.addressName} />
                    </a>
                    <h6 className={classes.homeMain__contactDecoration}>Связь со мной</h6>

                </nav>
                <Slider
                    className={classes.homeMain__slider}
                    items={slides}
                    renderItem={
                        (item) =>
                            <div style={{ height: "80vh", width: "100%", maxHeight: '850px', minHeight: '650px', display: 'flex', justifyContent: 'center'}}>
                                <img src={item.image} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                            </div>
                    }
                    addArrows
                    draggable
                    looped
                    autoplay
                    autoplayDelay={5000}
                    slidesToShow={1}
                    slidesToScroll={1}
                />
                <div className={classes.homeMain__lookMore}>
                    <div className={classes.homeMain__lookMoreArrow}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span>
                            <img className={classes.homeMain__lookMoreIcon} src={Arrow} alt='arrow' />
                        </span>

                    </div>

                </div>
            </div>
        </Section>
    )
}

export default HomeMainSection