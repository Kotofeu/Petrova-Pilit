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
    initialValue?: string;
    id?: number;
}

export const WorkEditType: FC<IWorkEditType> = observer(({ className, initialValue, id }) => {
    const [title, setTitle] = useState<string>(initialValue || '')
    const debouncedName = useDebounce(title, 1000)
    const { addMessage } = useMessage()
    
    useEffect(() => {
        console.log(debouncedName, initialValue, id)
        if (debouncedName && debouncedName !== initialValue && id !== undefined) {
            worksStore.editType({
                id: id,
                title: debouncedName
            })
            addMessage('Тип изменён', 'complete')
        }
    }, [initialValue, id, debouncedName])
    return (
        <Input
            className={className}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Введите название'
            title='Название тега'
        />
    )
})