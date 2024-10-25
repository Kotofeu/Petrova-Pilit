import { FC, useCallback, useState } from 'react'
import ModalSend from '../../../../components/Modal/ModalSend'
import { observer } from 'mobx-react-lite'
import { IWorks, worksStore } from '../../../../store'

import classes from './WorkModal.module.scss'
import Button from '../../../../UI/Button/Button'
import { WorkModalTag } from '../WorkModalTag/WorkModalTag'
import Input from '../../../../UI/Input/Input'
import { useMessage } from '../../../MessageContext'
import { WorkModalImages } from '../WorkModalImages/WorkModalImages'
import TextArea from '../../../../UI/TextArea/TextArea'

interface IWorkModal {
    work?: IWorks;
}
export const WorkModal: FC<IWorkModal> = observer(({ work }) => {
    // undefined - тип не установлен, -1 - новый тип, другое число - выбранный тип
    const { addMessage } = useMessage()

    const [action, setAction] = useState<'type' | 'text' | 'photo'>('type');

    const [typeId, setTypeId] = useState<number | undefined>(work?.workType?.id);
    const [newType, setNewType] = useState<string>('')

    const [name, setName] = useState<string>(work?.name || '')
    const [description, setDescription] = useState<string>(work?.description || '')

    const [beforeImage, setBeforeImage] = useState<File | null>()
    const [afterImage, setAfterImage] = useState<File | null>()


    const [otherImages, setOtherImages] = useState<FileList>()



    const onConfirm = useCallback(() => {
        if (action === 'type') {
            if (!worksStore.workTypes.length || typeId === -1) {
                if (newType.length > 2) {
                    setTypeId(worksStore.addType(newType))
                    setAction('text')
                }
                else {
                    addMessage('Введите название больше 2 символов', 'error')
                }
            }
            if (typeId !== -1) {
                setAction('text')
            }
        }
        if (action === 'text') {
            if (name.length < 2) {
                addMessage('Введите название больше 2 символов', 'error')
            }
            else {
                setAction('photo')
            }

        }
        else {
            if (work?.imageAfterSrc) {

            }
            if (work?.imageBeforeSrc) {

            }
            if (otherImages?.length) {

            }
        }
    }, [worksStore, newType, typeId, name, action])

    const closeModal = useCallback(() => {
       
        worksStore.setIsWorkCreating(false)
        setTypeId(work?.workType?.id)
        setNewType('')
        setName(work?.name || '')
        setDescription(work?.description || '')
        setAction('type')
        setBeforeImage(undefined)
        setAfterImage(undefined)
        setOtherImages(undefined)
    }, [worksStore])

    const onBack = useCallback(() => {
        if (action === 'photo') {
            setAction('text')
        }
        else if (action === 'text') {
            setAction('type')
        }
        else {
            closeModal()
        }
    }, [action, setAction, closeModal])



    return (
        <ModalSend
            isOpen={worksStore.isWorkCreating}
            closeModal={closeModal}
        >
            <div className={classes.workModal}>
                <div className={classes.workModal__inner}>
                    <h3 className={classes.workModal__title}>
                        {
                            work
                                ? 'Редактирование работы'
                                : 'Создание работы'
                        }
                    </h3>

                    {
                        worksStore.workTypes.length && action === 'type'
                            ? <WorkModalTag
                                types={worksStore.workTypes}
                                typeId={typeId}
                                setTypeId={setTypeId}
                            />
                            : null
                    }
                    {
                        (!worksStore.workTypes.length || typeId === -1) && action === 'type'
                            ? <div className={classes.workModal__newTag}>
                                <Input
                                    value={newType}
                                    onChange={(event) => setNewType(event.target.value)}
                                    title='Новый тип'
                                    placeholder='Название типа'
                                />
                            </div>
                            : null
                    }
                    {
                        action === 'text'
                            ? <div className={classes.workModal__text}>
                                <Input
                                    className={classes.workModal__inputTitle}
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    name='title'
                                    title='Заголовок публикации'
                                    placeholder='Заголовок публикации'
                                />
                                <TextArea
                                    className={classes.workModal__description}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    name='description'
                                    title='Текст публикации'
                                    placeholder='Текст публикации'
                                />
                            </div>
                            : null
                    }

                    {
                        action === 'photo'
                            ? <WorkModalImages
                                initialAfter={work?.imageAfterSrc}
                                initialBefore={work?.imageBeforeSrc}
                                initialOtherImages={work?.othersImage}
                                setAfter={setAfterImage}
                                setBefore={setBeforeImage}
                                setOthers={setOtherImages}
                                title={name}
                                className={classes.workModal__photos}
                            />
                            : null
                    }

                </div>
                <div className={classes.workModal__buttons}>
                    <Button
                        className={classes.workModal__button}
                        onClick={onBack}
                    >
                        {action === 'type' ? 'Закрыть' : 'Назад'}
                    </Button>
                    <Button
                        className={classes.workModal__button}
                        onClick={onConfirm}
                    >
                        {action === 'photo' ? 'Сохранить' : 'Далее'}
                    </Button>
                </div>

            </div>
        </ModalSend>
    )
})
