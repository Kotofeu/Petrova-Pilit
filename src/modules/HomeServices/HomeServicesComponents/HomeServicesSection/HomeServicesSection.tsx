import { useState } from 'react'
import Section from '../../../../components/Section/Section'
import Avatar from '../../../../components/Avatar/Avatar'
import Accordion from '../../../../components/Accordion/Accordion'
import { observer } from 'mobx-react-lite'
import { servicesStore } from '../../../../store'
import { HomeServicesTitle } from '../HomeServicesTitle/HomeServicesTitle'
import classes from './HomeServicesSection.module.scss'

import { HomeServicesDescription } from '../HomeServicesDescription/HomeServicesDescription'
export const HomeServicesSection = observer(() => {
    const [isServiceOpen, setIsServiceOpen] = useState<number | null>(null)
    return (
        <Section className={classes.homeServices}>
            <h2 className={classes.homeServices__title}>Цены на услуги</h2>
            <div className={classes.homeServices__inner}>
                <Avatar className={classes.homeServices__avatar} />
                <Accordion
                    className={classes.homeServices__accordion}

                    items={servicesStore.services}
                    selectedItem={isServiceOpen}
                    setSelectedItem={setIsServiceOpen}
                    renderTitle={(service, index) =>
                        <HomeServicesTitle
                            className={classes.homeServices__servicesTitle}
                            title = {service.title}
                            time={service.time}
                            price={service.price}

                        />
                    }
                    renderDescription={(service, index) => {
                        if (!service.description) return null
                        return (
                            <HomeServicesDescription
                                className={classes.homeServices__description}
                                description={service.description}
                            />
                        )
                    }}
                />
            </div>
        </Section>
    )
})