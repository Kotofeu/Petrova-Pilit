import { FC, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useMessage } from '../../../MessageContext'
import { applicationStore, IWorkSchedule } from '../../../../store'

import ListItemController from '../../../../components/ListItemController/ListItemController'
import Input from '../../../../UI/Input/Input'
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton'

import classes from './AdminWorkDay.module.scss'


export const AdminWorkDay: FC = observer(() => {
    const [workSchedule, setWorkSchedule] = useState(applicationStore.workSchedule || []);
    const { addMessage } = useMessage();
    const workScheduleHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setWorkSchedule(prev =>
            prev.map(workDay =>
                workDay.title === name ? { ...workDay, value } : workDay
            )
        );
    }, []);
    const onSaveClick = useCallback((workDay: IWorkSchedule) => {
        applicationStore.changeWorkSchedule(workDay)
        addMessage(`Расписание на ${workDay.title} изменено`, 'complete')
    }, [])
    return (
        <ListItemController
            className={classes.adminWorkDay}
            itemClassName={classes.adminWorkDay__item}
            items={workSchedule}
            renderItem={(workDay) => (
                <div className={classes.adminWorkDay__row} key={workDay.id}>
                    <p
                        className={classes.adminWorkDay__name}
                    >
                        {workDay.title}:
                    </p>
                    <p
                        className={classes.adminWorkDay__shortName}
                    >
                        {workDay.shortTitle}:
                    </p>
                    <Input
                        className={classes.adminWorkDay__input}
                        value={workDay.value || ''}
                        onChange={workScheduleHandler}
                        name={workDay.title}
                        placeholder='00:00 - 00:00'
                        title={`Расписание на ${workDay.title}`}
                    />

                </div>
            )}
            saveItem={onSaveClick}
            addIndex={false}
        />
    );
});
