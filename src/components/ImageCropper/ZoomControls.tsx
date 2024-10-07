import React, { memo, FC } from 'react';
import classes from './ImageCropper.module.scss';
import Button from '../../UI/Button/Button';

interface IZoomControls {
    zoom: number;
    setZoom: (rotation: React.SetStateAction<number>) => void;
}

export const ZoomControls: FC<IZoomControls> = memo(({ zoom, setZoom }) => {
    return (
        <div className={classes.zoom}>
            <Button
                className={classes.inputButton}
                onClick={() => setZoom(prev => prev < 3 ? prev + 0.25 : 3)}
                title='Увеличить изображение'
            >
                <span className={classes.inputButton_plus} />
            </Button>

            <input
                className={classes.cropControl}
                id="zoom"
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
            />
            <Button
                className={classes.inputButton}
                onClick={() => setZoom(prev => prev > 1 ? prev - 0.25 : 1)}
                title='Уменьшить изображение'
            >
                <span className={classes.inputButton_minus} />
            </Button>
        </div>
    )
})