import { FC, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useMessage } from '../../../MessageContext'

import ListItemController from '../../../../components/ListItemController/ListItemController'
import Input from '../../../../UI/Input/Input'
import classes from './AdminAdvantages.module.scss'


import { IconLoader } from '../IconLoader/IconLoader'
import { applicationStore, IAdvantages, ICreateAdvantages } from '../../../../store'
import TextArea from '../../../../UI/TextArea/TextArea'

interface IAdvantageArray extends IAdvantages, ICreateAdvantages {

}
export const AdminAdvantages: FC = observer(() => {
    const [advantages, setAdvantages] = useState<IAdvantageArray[]>([]);
    const [newAdvantage, setNewAdvantage] = useState<ICreateAdvantages>({
        title: '',
        description: '',
        imageFile: undefined,
    })

    const { addMessage } = useMessage();
    const validateAdvantages = (advantage: IAdvantageArray) => {
        if (advantage.title.length < 2) return 'Заголовок должен быть длиннее 2 символов';
        if (advantage.description.length < 2) return 'Описание отсутствует';
        if (!advantage.imageFile && !advantage.imageSrc) return 'Отсутствует иконка';
        return null;
    };

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number, type: 'title' | 'description') => {
        const { value } = event.target;
        setAdvantages(prev => prev.map(advantage =>
            advantage.id === id ? { ...advantage, [type]: value } : advantage
        ));
    }, []);

    const handleImageChange = useCallback((file: File | null, id: number) => {
        setAdvantages(prev => prev.map(advantage =>
            advantage.id === id ? { ...advantage, imageFile: file || undefined } : advantage
        ));
    }, []);


    const onAddAdvantage = useCallback(() => {
        const errorMessage = validateAdvantages(newAdvantage as (IAdvantageArray));
        if (errorMessage) {
            addMessage(errorMessage, 'error');
            return;
        }
        applicationStore.addAdvantage(newAdvantage)
        addMessage(`Преимущество ${newAdvantage.title} добавлено`, 'complete')
        setNewAdvantage({ title: '', description: '', imageFile: undefined })
    }, [newAdvantage])


    const onSaveClick = useCallback((advantage: IAdvantages) => {
        const errorMessage = validateAdvantages(advantage);
        if (errorMessage) {
            addMessage(errorMessage, 'error');
            return;
        }
        applicationStore.changeAdvantages(advantage)
        addMessage(`Преимущество ${advantage.title} обновлено`, 'complete')
    }, [])


    useEffect(() => {
        setAdvantages(applicationStore.advantages)
    }, [applicationStore.advantages])

    return (
        <ListItemController
            className={classes.adminAdvantages}
            itemClassName={classes.adminAdvantages__item}
            items={advantages}
            renderItem={(advantage) => (
                <div className={classes.adminAdvantages__row} key={advantage.id}>
                    <IconLoader
                        className={classes.adminAdvantages__icon}
                        type='light'
                        setImage={(image) => handleImageChange(image, advantage.id)}
                        image={advantage.imageFile ? URL.createObjectURL(advantage.imageFile) : advantage.imageSrc}
                        title='Иконка'
                    />
                    <div className={classes.adminAdvantages__inputs}>
                        <Input
                            className={classes.adminAdvantages__input}
                            value={advantage.title || ''}
                            onChange={(event) => handleChange(event, advantage.id, 'title')}
                            placeholder='Заголовок преимущества'
                            title='Заголовок преимущества'
                        />
                        <TextArea
                            className={classes.adminAdvantages__textArea}
                            value={advantage.description || ''}
                            onChange={(event) => handleChange(event, advantage.id, 'description')}
                            placeholder='Описание преимущества'
                            title='Описание преимущества' />
                    </div>
                </div>
            )}
            addItem={onAddAdvantage}
            deleteItem={(id) => applicationStore.deleteAdvantages(+id)}
            saveItem={(advantage) => onSaveClick(advantage)}
            renderItemToAdd={() => (
                <div className={classes.adminAdvantages__row}>
                    <IconLoader
                        className={classes.adminAdvantages__icon}
                        type='light'
                        setImage={(image) => setNewAdvantage(prev => ({ ...prev, imageFile: image || undefined }))}
                        image={newAdvantage.imageFile ? URL.createObjectURL(newAdvantage.imageFile) : undefined}
                        title='Иконка'
                    />
                    <div className={classes.adminAdvantages__inputs}>
                        <Input
                            className={classes.adminAdvantages__input}
                            value={newAdvantage?.title || ''}
                            onChange={(event) => setNewAdvantage(prev => ({ ...prev, title: event.target.value }))}
                            placeholder='Заголовок преимущества'
                            title='Заголовок преимущества'
                        />
                        <TextArea
                            className={classes.adminAdvantages__textArea}
                            value={newAdvantage?.description || ''}
                            onChange={(event) => setNewAdvantage(prev => ({ ...prev, description: event.target.value }))}
                            placeholder='Описание преимущества'
                            title='Описание преимущества'
                        />

                    </div>

                </div>
            )}
            addIndex={false}
        />
    );
});
