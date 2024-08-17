import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { applicationStore } from "../../../../store"
import classConnection from '../../../../utils/function/classConnection'
import ContactLink from '../../../../UI/ContactLink/ContactLink'


import classes from './HomeMainLinksList.module.scss'

interface IHomeMainLinksList{
    className?: string
}

export const HomeMainLinksList: FC<IHomeMainLinksList> = observer((props) => {
    return (
        <nav className={classConnection(classes.homeMainLinksList, props.className)}>
            {
                applicationStore.contactLinks.map(link => {
                    return (
                        <ContactLink
                            className={classes.homeMainLinksList__contactLink}
                            key={link.title}
                            href={link.link}
                            title={link.title}
                            linkType="socialLink"
                            imageSrc={link.imageSrc}
                        />
                    )
                })
            }
            <h6 className={classes.homeMainLinksList__contactDecoration}>Связь со мной</h6>
        </nav>)
})