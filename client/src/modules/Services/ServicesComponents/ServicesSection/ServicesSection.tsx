import { useState } from 'react'
import Section from '../../../../components/Section/Section'
import Avatar from '../../../../components/Avatar/Avatar'
import Accordion from '../../../../components/Accordion/Accordion'
import { observer } from 'mobx-react-lite'
import { servicesStore } from '../../../../store'
import { ServicesTitle } from '../ServicesTitle/ServicesTitle'
import classes from './ServicesSection.module.scss'

import { ServicesDescription } from '../ServicesDescription/ServicesDescription'
export const ServicesSection = observer(() => {
    const [isServiceOpen, setIsServiceOpen] = useState<number | null>(null)
    return (
        <Section className={classes.services}>
            <h2 className={classes.services__title}>Цены на услуги</h2>
            <div className={classes.services__inner}>
                <Avatar className={classes.services__avatar} />
                <Accordion
                    className={classes.services__accordion}

                    items={servicesStore.services}
                    selectedItem={isServiceOpen}
                    setSelectedItem={setIsServiceOpen}
                    renderTitle={(service, index) => {
                        if (!service.name || !service.time || !service.price) return null
                        return (
                            <ServicesTitle
                                className={classes.services__servicesTitle}
                                title={service.name}
                                time={service.time}
                                price={service.price}

                            />
                        )
                    }
                    }
                    renderDescription={(service, index) => {
                        if (!service.description) return null
                        return (
                            <ServicesDescription
                                className={classes.services__description}
                                description={service.description}
                            />
                        )
                    }}
                />
            </div>
        </Section>
    )
})