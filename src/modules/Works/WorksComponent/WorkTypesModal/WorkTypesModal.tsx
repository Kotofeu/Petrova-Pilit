import { FC, useCallback, useState } from 'react'
import ModalSend from '../../../../components/Modal/ModalSend';
import { observer } from 'mobx-react-lite';
import { IWorksType } from '../../../../store/WorksStore';


import classes from './WorkTypesModal.module.scss';

import ListItemController from '../../../../components/ListItemController/ListItemController';
import { useMessage } from '../../../MessageContext';
import { worksStore } from '../../../../store';
import Input from '../../../../UI/Input/Input';
import { WorkEditType } from '../WorkEditType/WorkEditType';

interface IWorkTypesModal {
    isOpen: boolean;
    closeModal: () => void;
    tabs?: IWorksType[]
}
export const WorkTypesModal: FC<IWorkTypesModal> = observer(({
    isOpen,
    closeModal,
    tabs
}) => {
    const [newType, setNewType] = useState<string>('')

    const { addMessage } = useMessage()
    const deleteHandler = useCallback((id: number | string) => {
        worksStore.deleteType(+id)
        addMessage('Тип удалён', 'complete')
    }, [worksStore])

    const addHandler = useCallback((title: string) => {
        if (title.length > 2) {
            worksStore.addType(title)
            setNewType('')
            addMessage('Тип добавлен', 'complete')
        }
        else {
            addMessage('Введите название больше 2 символов', 'error')
        }
    }, [setNewType, worksStore])

    return (
        <ModalSend
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <ListItemController
                className={classes.types}
                items={tabs || []}
                renderItem={(tab, index) => (
                    <WorkEditType
                        className={classes.type}
                        initialValue={tab.title}
                        id={tab.id}
                    />
                )}
                renderItemToAdd={() => (
                    <Input
                        className={classes.type}
                        value={newType}
                        onChange={(event) => setNewType(event.target.value)}
                        placeholder='Введите название'
                        title='Название нового тега'
                    />
                )}
                deleteItem={deleteHandler}
                addItem={() => addHandler(newType)}
                indexPadding='1.6em'
            />

        </ModalSend >
    )
})

