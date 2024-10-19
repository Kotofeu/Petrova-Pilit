import { FC, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useMessage } from '../../../MessageContext'
import { applicationStore, IContactLink, ICreateContactLink } from '../../../../store'

import ListItemController from '../../../../components/ListItemController/ListItemController'
import Input from '../../../../UI/Input/Input'
import classes from './AdminSocial.module.scss'


import { IconLoader } from '../IconLoader/IconLoader'
import TextArea from '../../../../UI/TextArea/TextArea'

interface IChooseContactLink extends IContactLink, ICreateContactLink {

}
export const AdminSocial: FC = observer(() => {
    const [socialLinks, setSocialLinks] = useState<IChooseContactLink[]>([]);
    const [newSocialLinks, setNewSocialLinks] = useState<ICreateContactLink>({
        title: '',
        link: '',
    })

    const { addMessage } = useMessage();
    const validateLink = (link: IChooseContactLink) => {
        if (link.title.length < 2) return 'Заголовок должен быть длиннее 2 символов';
        if (link.link.length < 2) return 'Ссылка отсутствует';
        if (!link.imageFile && !link.imageSrc) return 'Отсутствует тёмная иконка';
        return null;
    };

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number, type: 'title' | 'link') => {
        const { value } = event.target;
        setSocialLinks(prev => prev.map(contactLink =>
            contactLink.id === id ? { ...contactLink, [type]: value } : contactLink
        ));
    }, []);

    const handleImageChange = useCallback((file: File | null, id: number) => {
        setSocialLinks(prev => prev.map(contactLink =>
            contactLink.id === id ? { ...contactLink, imageFile: file || undefined } : contactLink
        ));
    }, []);


    const onAddLink = useCallback(() => {
        const errorMessage = validateLink(newSocialLinks as IChooseContactLink);
        if (errorMessage) {
            addMessage(errorMessage, 'error');
            return;
        }
        applicationStore.addContactLink(newSocialLinks)
        addMessage(`Ссылка на ${newSocialLinks.title} добавлена`, 'complete')
        setNewSocialLinks({ title: '', link: '', imageFile: undefined})
    }, [newSocialLinks])


    const onSaveClick = useCallback((contactLink: IChooseContactLink) => {
        const errorMessage = validateLink(contactLink);
        if (errorMessage) {
            addMessage(errorMessage, 'error');
            return;
        }
        applicationStore.changeContactLink(contactLink)
        addMessage(`Ссылка на ${contactLink.title} обновлена`, 'complete')
    }, [])


    useEffect(() => {
        setSocialLinks(applicationStore.contactLinks)
    }, [applicationStore.contactLinks])

    return (
        <ListItemController
            className={classes.adminSocial}
            itemClassName={classes.adminSocial__item}
            items={socialLinks}
            renderItem={(socialLink) => (
                <div className={classes.adminSocial__row} key={socialLink.id}>
                    <div className={classes.adminSocial__icons}>
                        <IconLoader
                            className={classes.adminSocial__icon}
                            type='dark'
                            setImage={(image) => handleImageChange(image, socialLink.id)}
                            image={socialLink.imageFile ? URL.createObjectURL(socialLink.imageFile) : socialLink.imageSrc}
                            title='Иконка'
                        />
                    </div>
                    <div className={classes.adminSocial__inputs}>
                        <Input
                            className={classes.adminSocial__input}
                            value={socialLink.title || ''}
                            onChange={(event) => handleChange(event, socialLink.id, 'title')}
                            placeholder='Заголовок ссылки'
                            title='Заголовок ссылки'
                        />
                        <TextArea
                            className={classes.adminSocial__textArea}
                            value={socialLink.link || ''}
                            onChange={(event) => handleChange(event, socialLink.id, 'link')}
                            placeholder='Ссылка'
                            title='Ссылка'
                        />

                    </div>

                </div>
            )}
            addItem={onAddLink}
            deleteItem={(id) => applicationStore.deleteContactLink(+id)}
            saveItem={(socialLink) => onSaveClick(socialLink)}
            renderItemToAdd={() => (
                <div className={classes.adminSocial__row}>
                    <div className={classes.adminSocial__icons}>
                        <IconLoader
                            className={classes.adminSocial__icon}
                            type='dark'
                            setImage={(image) => setNewSocialLinks(prev => ({ ...prev, imageFile: image || undefined }))}
                            image={newSocialLinks.imageFile ? URL.createObjectURL(newSocialLinks.imageFile) : undefined}
                            title='Иконка'
                        />
                    </div>
                    <div className={classes.adminSocial__inputs}>
                        <Input
                            className={classes.adminSocial__input}
                            value={newSocialLinks?.title || ''}
                            onChange={(event) => setNewSocialLinks(prev => ({ ...prev, title: event.target.value }))}
                            placeholder='Заголовок ссылки'
                            title='Заголовок ссылки'
                        />
                        <TextArea
                            className={classes.adminSocial__textArea}
                            value={newSocialLinks?.link || ''}
                            onChange={(event) => setNewSocialLinks(prev => ({ ...prev, link: event.target.value }))}
                            placeholder='Ссылка'
                            title='Ссылка'
                        />

                    </div>

                </div>
            )}
            addIndex={false}
        />
    );
});
