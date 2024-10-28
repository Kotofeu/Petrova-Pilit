import Section from '../../../../components/Section/Section'
import Avatar from '../../../../components/Avatar/Avatar'
import classes from './AboutMainSection.module.scss'
import { applicationStore, IContactLink, IGetAllJSON } from '../../../../store'
import ContactList from '../../../../components/ContactList/ContactList'
import { observer } from 'mobx-react-lite'
import { classConnection } from '../../../../utils/function'
import useRequest from '../../../../utils/hooks/useRequest'
import { contactApi, IMainInfoValue, mainInfoApi } from '../../../../http'
import { useMessage } from '../../../MessageContext'
import { useEffect } from 'react'

export const AboutMainSection = observer(() => {
  const [
    contacts,
    contactsIsLoading,
    contactsError
  ] = useRequest<IGetAllJSON<IContactLink>>(contactApi.getContacts);

  const [
    mainInfo,
    mainInfoIsLoading,
    mainInfosError
  ] = useRequest<IMainInfoValue>(mainInfoApi.getInfos)

  const { addMessage } = useMessage()

  useEffect(() => {
    if (contactsError && contactsError.toString() !== applicationStore.error.toString()) {
      applicationStore.setError(contactsError)
      addMessage(applicationStore.error.toString(), 'error')
    }
  }, [contactsError])

  useEffect(() => {
    if (contacts?.rows.length) {
      applicationStore.setContactsLinks(contacts.rows)
    }
  }, [contacts])

  useEffect(() => {
    if (mainInfosError && mainInfosError.toString() !== applicationStore.error.toString()) {
      applicationStore.setError(mainInfosError)
      addMessage(applicationStore.error.toString(), 'error')
    }
  }, [mainInfosError])
  useEffect(() => {
    if (mainInfo) {
      applicationStore.setGeneralData(mainInfo)
    }
  }, [mainInfo])

  return (
    <Section className={classes.aboutMain}>
      <h1 className={classes.aboutMain__title}>Обо мне</h1>
      <div className={classes.aboutMain__inner}>
        <div className={classes.aboutMain__content}>
          <div className={classes.aboutMain__avatarBox}>
            <Avatar className={classes.aboutMain__avatar} />
            <span className={classConnection(classes.aboutMain__heart, classes.aboutMain__heart_left)} />
            <ContactList
              className={classes.aboutMain__links}
              isLoading={contactsIsLoading}
            />
          </div>
        </div>
        <p className={classes.aboutMain__text}>
          {
            applicationStore.aboutMe
              ? <>{applicationStore.aboutMe}</>
              : <span className={classes.aboutMain__text_empty}>
                {
                  [1, 2, 3, 4, 5].map(i => (
                    <span key={i} className={classConnection(mainInfoIsLoading ? 'loading' : '')}></span>
                  ))
                }
              </span>
          }

          <span className={classConnection(classes.aboutMain__heart, classes.aboutMain__heart_right)} />
        </p>
      </div>
    </Section>
  )
})