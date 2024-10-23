import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { applicationStore } from '../../store'
import ContactLink from '../../UI/ContactLink/ContactLink'

import classes from './ContactList.module.scss'
import { classConnection } from '../../utils/function'
interface IContactList{
    className?: string
}

const ContactList: FC<IContactList> = observer((props) => {
    return (
        <nav className={classConnection(classes.contactList, props.className)}>
            {
                applicationStore.contactLinks.map(link => {
                    return (
                        <ContactLink
                            className={classes.contactList__link}
                            key={link.id}
                            href={link.link}
                            title={link.name}
                            linkType="socialLink"
                            imageSrc={link.imageSrc}
                        />
                    )
                })
            }
        </nav>)
})
export default ContactList;