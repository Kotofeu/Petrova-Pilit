import { FC, useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { applicationStore } from '../../../../store';
import { observer } from 'mobx-react-lite';
import classes from './AdminHowToGet.module.scss';
import FileInput from '../../../../components/FileInput/FileInput';
import Button from '../../../../UI/Button/Button';
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton';
import { useMessage } from '../../../MessageContext';

export const AdminHowToGet: FC = observer(() => {
    const [video, setVideo] = useState<File | null>(null);
    const [preview, setPreview] = useState<File | null>(null);
    const { addMessage } = useMessage()

    const saveHowToGet = useCallback((type: 'preview' | 'video') => {
        if (type === 'preview' && preview) {
            applicationStore.changeHowToGetPreview(preview)
            addMessage("Превью сохранено", 'complete')
            setPreview(null)
        }
        else if (type === 'video' && video) {
            applicationStore.changeHowToGetVideo(video)
            addMessage("Видео сохранено", 'complete')
            setVideo(null)
        }
        else {
            addMessage("Неизвестная ошибка", 'error')

        }
    }, [preview, video])

    return (
        <div className={classes.adminHowToGet}>
            <div className={classes.adminHowToGet__inner}>
                <div className={classes.adminHowToGet__video}>
                    <div className={classes.adminHowToGet__videoBox}>
                        {
                            video || applicationStore.howToGetVideo
                                ? <ReactPlayer
                                    width='100%'
                                    height='100%'
                                    style={{ pointerEvents: 'all', aspectRatio: '3/4' }}
                                    url={video ? URL.createObjectURL(video) : applicationStore.howToGetVideo}
                                    controls
                                />
                                : null
                        }
                        {
                            video
                                ? <div className={classes.adminHowToGet__buttons}>
                                    <ControllerButton
                                        className={classes.adminHowToGet__button}
                                        type='save'
                                        onClick={() => saveHowToGet('video')}
                                        title='Сохранить видео'
                                    />
                                    <ControllerButton
                                        className={classes.adminHowToGet__button}
                                        type='delete'
                                        onClick={() => setVideo(null)}
                                        title='Удалить видео'
                                    />
                                </div>
                                : null
                        }
                    </div>
                    <FileInput
                        className={classes.adminHowToGet__fileInput}
                        handleFileChange={(file) => setVideo(file)}
                        title='Загрузить видео'
                        name='Upload video'
                        type='video'
                        maxFileSize={20971520}
                    />
                </div>
                <div className={classes.adminHowToGet__preview}>
                    <div className={classes.adminHowToGet__previewBox}>
                        {
                            preview || applicationStore.howToGetPreview
                                ? <img
                                    className={classes.adminHowToGet__previewImage}
                                    src={preview ? URL.createObjectURL(preview) : applicationStore.howToGetPreview}
                                    alt='Превью как добраться'
                                />
                                : null
                        }
                        {
                            preview
                                ? <div className={classes.adminHowToGet__buttons}>
                                    <ControllerButton
                                        className={classes.adminHowToGet__button}
                                        type='save'
                                        onClick={() => saveHowToGet('preview')}
                                        title='Сохранить превью'
                                    />
                                    <ControllerButton
                                        className={classes.adminHowToGet__button}
                                        type='delete'
                                        onClick={() => setPreview(null)}
                                        title='Удалить превью'
                                    />
                                </div>
                                : null
                        }
                    </div>
                    <FileInput
                        className={classes.adminHowToGet__fileInput}
                        handleFileChange={(file) => setPreview(file)}
                        title='Загрузить превью'
                        name='Upload preview'
                        type='photo'
                        maxFileSize={6291456}
                    />
                </div>
            </div>
        </div>
    );
});