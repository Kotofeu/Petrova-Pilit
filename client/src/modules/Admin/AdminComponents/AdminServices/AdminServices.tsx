import { FC, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useMessage } from '../../../MessageContext'
import { servicesStore, IService, IServiceCreate } from '../../../../store'

import ListItemController from '../../../../components/ListItemController/ListItemController'
import Input from '../../../../UI/Input/Input'

import TextArea from '../../../../UI/TextArea/TextArea'

import classes from './AdminServices.module.scss'

interface IServices extends IService, IServiceCreate {

}

export const AdminServices: FC = observer(() => {
    const [services, setServices] = useState<IServices[]>([]);
    const [newServices, setNewServices] = useState<IServiceCreate>({
        title: '',
        time: 0,
        description: '',
        price: 0,
    })

    const { addMessage } = useMessage();
    const validateLink = (service: IServices) => {
        if (service.title.length < 2) return 'Заголовок должен быть длиннее 2 символов';
        if (!service.description) return 'Описание отсутствует';
        if (!service.time) return 'Время работы';
        return null;
    };

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number, type: 'title' | 'description') => {
        const { value } = event.target;
        setServices(prev => prev.map(service =>
            service.id === id ? { ...service, [type]: value } : service
        ));
    }, []);
    const handleNumberChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number, type: 'time' | 'price') => {
        const { value } = event.target;
        setServices(prev => prev.map(service =>
            service.id === id ? { ...service, [type]: Number(value) >= 0 ? +value : service[type] } : service
        ));
    }, []);

    const onAddService = useCallback(() => {
        const errorMessage = validateLink(newServices as IServices);
        if (errorMessage) {
            addMessage(errorMessage, 'error');
            return;
        }
        servicesStore.addService(newServices)
        addMessage(`Услуга ${newServices.title} добавлена`, 'complete')
        setNewServices({ title: '', time: 0, description: '', price: 0 })
    }, [newServices])


    const onSaveClick = useCallback((contactLink: IServices) => {
        const errorMessage = validateLink(contactLink);
        if (errorMessage) {
            addMessage(errorMessage, 'error');
            return;
        }
        servicesStore.changeService(contactLink)
        addMessage(`Услуга ${contactLink.title} обновлена`, 'complete')
    }, [])


    useEffect(() => {
        setServices(servicesStore.services)
    }, [servicesStore.services])

    return (
        <ListItemController
            className={classes.adminServices}
            itemClassName={classes.adminServices__item}
            items={services}
            renderItem={(service) => (
                <div className={classes.adminServices__row} key={service.id}>
                    <div className={classes.adminServices__inputs}>
                        <Input
                            className={classes.adminServices__input}
                            value={service.title}
                            onChange={(event) => handleChange(event, service.id, 'title')}
                            placeholder='Заголовок услуги'
                            title='Заголовок услуги'
                        />
                        <div className={classes.adminServices__inputsRow}>
                            <Input
                                className={classes.adminServices__input}
                                value={service.time ? `${service.time}` : ''}
                                onChange={(event) => handleNumberChange(event, service.id, 'time')}
                                placeholder='Время (мин)'
                                title='Время (мин)'
                                type='number'
                            />
                            <Input
                                className={classes.adminServices__input}
                                value={service.price ? `${service.price}` : ''}
                                onChange={(event) => handleNumberChange(event, service.id, 'price')}
                                placeholder='Цена (от)'
                                title='Цена (от)'
                                type='number'
                            />
                        </div>

                    </div>
                    <TextArea
                        className={classes.adminServices__textArea}
                        value={service.description || ''}
                        onChange={(event) => handleChange(event, service.id, 'description')}
                        placeholder='Описание услуги'
                        title='Описание услуги'
                    />
                </div>
            )}
            addItem={onAddService}
            deleteItem={(id) => servicesStore.deleteService(+id)}
            saveItem={(service) => onSaveClick(service)}
            renderItemToAdd={() => (
                <div className={classes.adminServices__row}>
                    <div className={classes.adminServices__inputs}>
                        <Input
                            className={classes.adminServices__input}
                            value={newServices.title || ''}
                            onChange={(event) => setNewServices(prev => ({ ...prev, title: event.target.value }))}
                            placeholder='Заголовок услуги'
                            title='Заголовок услуги'
                        />
                        <div className={classes.adminServices__inputsRow}>
                            <Input
                                className={classes.adminServices__input}
                                value={newServices.time ? `${newServices.time}` : ''}
                                onChange={(event) => setNewServices(prev => ({ ...prev, time: Number(event.target.value) >= 0 ? Number(event.target.value) : 0 }))}
                                placeholder='Время (мин)'
                                title='Время (мин)'
                                type='number'
                            />
                            <Input
                                className={classes.adminServices__input}
                                value={newServices.price ? `${newServices.price}` : ''}
                                onChange={(event) => setNewServices(prev => ({ ...prev, price: Number(event.target.value) >= 0 ? Number(event.target.value) : 0 }))}
                                placeholder='Цена (от)'
                                title='Цена (от)'
                                type='number'
                            />
                        </div>

                    </div>
                    <TextArea
                        className={classes.adminServices__textArea}
                        value={newServices.description || ''}
                        onChange={(event) => setNewServices(prev => ({ ...prev, description: event.target.value }))}
                        placeholder='Описание услуги'
                        title='Описание услуги'
                    />
                </div>
            )}
            addIndex={false}
        />
    );
});
