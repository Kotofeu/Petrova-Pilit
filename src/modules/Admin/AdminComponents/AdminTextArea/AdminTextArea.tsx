import { FC, memo, useState } from 'react'
import TextArea from '../../../../UI/TextArea/TextArea'
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton'

import classes from './AdminTextArea.module.scss'

interface IAdminTextArea {
    initialValue?: string;
    saveValue: (value: string) => void
}
export const AdminTextArea: FC<IAdminTextArea> = memo(({ initialValue, saveValue }) => {
    const [value, setValue] = useState<string>(initialValue || '')

    return (
        <div className={classes.adminTextArea}>
            <TextArea
                className={classes.adminTextArea__textArea}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <ControllerButton
                className={classes.adminTextArea__save}
                type='save'
                onClick={() => saveValue(value)}
            />
        </div>
    )
})
