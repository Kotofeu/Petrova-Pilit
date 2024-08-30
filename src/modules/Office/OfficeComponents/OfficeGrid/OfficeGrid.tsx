import{FC} from 'react';
import { observer } from 'mobx-react-lite';
import Grid from '../../../../components/Grid/Grid';
import { applicationStore } from '../../../../store';
import classes from './OfficeGrid.module.scss';

export interface IOfficeGrid {
    openModal: (index: number) => void;
}

export const OfficeGrid: FC<IOfficeGrid> = observer(({ openModal }) => (
    <Grid
        className={classes.officeGrid}
        items={applicationStore.officeImages}
        renderItem={(image, index) => (
            <img
                className={classes.officeGrid__image}
                key={image.id}
                src={image.imageSrc}
                alt={`Мой офис: ${index}`}
                onClick={() => openModal(index)}
            />
        )}
    />
));