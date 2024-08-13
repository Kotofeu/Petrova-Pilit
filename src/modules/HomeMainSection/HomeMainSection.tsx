import Section from "../../components/Section/Section"
import { Slider } from "../../components/Slider"
import classConnection from "../../utils/function/classConnection"


import classes from './/HomeMainSection.module.scss'
const slides = [
    {
        id: 1,
        text: 'слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1слайд 1',
        image: 'https://get.wallhere.com/photo/3840x2160-px-mountain-1327909.jpg',
        color: 'red'
    },
    {
        id: 2,
        text: 'слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2слайд 2',
        image: 'https://s1.1zoom.me/big3/652/342768-sepik.jpg',
        color: 'yellow'
    },
    {
        id: 3,
        color: 'green',
        text: 'слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3',
        image: 'https://www.funnyart.club/uploads/posts/2022-12/1671663694_www-funnyart-club-p-kartinki-na-fon-pk-krasivie-19.jpg'

    },
    {
        id: 4,
        color: 'red',
        text: 'слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3',
        image: 'https://www.funnyart.club/uploads/posts/2022-12/1671663694_www-funnyart-club-p-kartinki-na-fon-pk-krasivie-19.jpg'

    },

    {
        id: 5,
        color: 'yellow',
        text: 'слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3',
        image: 'https://www.funnyart.club/uploads/posts/2022-12/1671663694_www-funnyart-club-p-kartinki-na-fon-pk-krasivie-19.jpg'

    },
    {
        id: 6,
        color: 'green',
        text: 'слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3',
        image: 'https://www.funnyart.club/uploads/posts/2022-12/1671663694_www-funnyart-club-p-kartinki-na-fon-pk-krasivie-19.jpg'

    },
    {
        id: 8,
        color: 'red',
        text: 'слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3слайд 3',
        image: 'https://www.funnyart.club/uploads/posts/2022-12/1671663694_www-funnyart-club-p-kartinki-na-fon-pk-krasivie-19.jpg'

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
            <Slider items={slides} renderItem={
                (item) =>
                    <div style={{ height: 500, width: "100%", background: item.color }}>
                    </div>
            }
                addArrows
                addDots
                draggable
                looped
                slidesToShow={6}
                slidesToScroll={1}
            />

            <Slider items={slides} renderItem={
                (item) =>
                    <div style={{ height: 500, width: "100%", background: item.color }}>
                    </div>
            }
                addArrows
                addDots
                draggable
                looped
                slidesToShow={4}
                slidesToScroll={2}
            />

            <Slider items={slides} renderItem={
                (item) =>
                    <div style={{ height: 500, width: "100%", background: item.color }}>
                    </div>
            }
                addArrows
                addDots
                draggable
                looped
                slidesToShow={7}
                slidesToScroll={1}
            />

            <Slider items={slides} renderItem={
                (item) =>
                    <div style={{ height: 500, width: "100%", background: item.color }}>
                    </div>
            }
                addArrows
                addDots
                draggable
                looped
                slidesToShow={4}
                slidesToScroll={3}
            />

            <Slider items={slides} renderItem={
                (item) =>
                    <div style={{ height: 500, width: "100%", background: item.color }}>
                    </div>
            }
                addArrows
                addDots
                draggable
                looped
                slidesToShow={6}
                slidesToScroll={1}
            />

            <Slider items={slides} renderItem={
                (item) =>
                    <div style={{ height: 500, width: "100%", background: item.color }}>
                    </div>
            }
                addArrows
                addDots
                draggable
                looped
                slidesToShow={6}
                slidesToScroll={5}
            />

            <Slider items={slides} renderItem={
                (item) =>
                    <div style={{ height: 500, width: "100%", background: item.color }}>
                    </div>
            }
                addArrows
                addDots
                draggable
                looped
                slidesToShow={1}
                slidesToScroll={1}
            />
            <Slider items={slides} renderItem={
                (item) =>
                    <div style={{ height: 500, width: "100%", background: item.color }}>
                        <a href="https://www.npmjs.com/package/react-swipeable" draggable={false}>{item.text}</a>
                        <img src={item.image} draggable={false}></img>
                    </div>
            }
                addArrows
                addDots
                draggable
                slidesToShow={3}
                slidesToScroll={1}
                
            />

        </Section>
    )
}

export default HomeMainSection