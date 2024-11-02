import { FC, useEffect, useState } from 'react'
import Input from '../../../../UI/Input/Input'
import { worksStore } from '../../../../store'
import { observer } from 'mobx-react-lite'

import useDebounce from '../../../../utils/hooks/useDebounce'
import { useMessage } from '../../../MessageContext'

interface IWorkEditType {
    className?: string;
    initialValue?: string | null;
    id?: number;
}

export const WorkEditType: FC<IWorkEditType> = observer(({ className, initialValue, id }) => {
    const [name, setName] = useState<string>(initialValue || '')
    const debouncedName = useDebounce(name, 1000)
    const { addMessage } = useMessage()
    
    useEffect(() => {
        console.log(debouncedName, initialValue, id)
        if (debouncedName && debouncedName !== initialValue && id !== undefined) {

            addMessage('Тип изменён', 'complete')
        }
    }, [initialValue, id, debouncedName])
    return (
        <Input
            className={className}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder='Введите название'
            title='Название тега'
        />
    )
})