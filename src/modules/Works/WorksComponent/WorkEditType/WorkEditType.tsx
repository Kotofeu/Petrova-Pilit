import { FC, useCallback, useEffect, useState } from 'react'
import Input from '../../../../UI/Input/Input'
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton'
import { worksStore } from '../../../../store'
import { observer } from 'mobx-react-lite'
import { IWorksType } from '../../../../store/WorksStore'

import classes from './WorkEditType.module.scss'
import useDebounce from '../../../../utils/hooks/useDebounce'
import { classConnection } from '../../../../utils/function'
import { useMessage } from '../../../MessageContext'

interface IWorkEditType {
    className?: string;
    tab?: IWorksType;
    index: number
}

export const WorkEditType: FC<IWorkEditType> = observer(({ className, tab, index }) => {
    const [name, setName] = useState<string>(tab?.title || '')
    const debouncedName = useDebounce(name, 1000)
    const { addMessage } = useMessage()
    useEffect(() => {
        if (debouncedName && tab && debouncedName !== tab.title) {
            worksStore.editType({
                id: tab?.id,
                title: debouncedName
            })
            addMessage('Тип изменён', 'complete')
        }
    }, [tab, debouncedName])
    const addHandler = useCallback(() => {
        if (name.length > 2) {
            worksStore.addType(name)
            setName('')
            addMessage('Тип добавлен', 'complete')
        }
        else {
            addMessage('Введите название больше 2 символов', 'error')
        }
    }, [name, setName, worksStore])

    const deleteHandler = useCallback((id: number) => {
        worksStore.deleteType(id)
        addMessage('Тип удалён', 'complete')
    }, [debouncedName, setName, worksStore])
    return (
        <div
            className={classConnection(classes.type, className)}
        >
            <span className={classes.type__index}>{index + 1}.</span>
            <Input
                className={classes.type__title}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder='Введите название'
                title='Название тега'
            />
            {
                tab?.id !== undefined
                    ? <ControllerButton
                        className={classes.type__delete}
                        onClick={() => deleteHandler(tab.id)}
                        type='delete'
                        title='Удалить тип работы'
                    />
                    : <ControllerButton
                        className={classes.type__delete}
                        onClick={addHandler}
                        type='add'
                        title='Добавить тип работы'
                    />
            }

        </div>)
})
