import { FC } from 'react'
import ModalSend from '../../../../components/Modal/ModalSend';
import { observer } from 'mobx-react-lite';
import { IWorksType } from '../../../../store/WorksStore';


import classes from './WorkTypesModal.module.scss';

import { WorkEditType } from '../WorkEditType/WorkEditType';
import { AnimatePresence } from 'framer-motion';

interface IWorkTypesModal {
    isOpen: boolean;
    closeModal: () => void;
    tabs?: IWorksType[]
}
export const WorkTypesModal: FC<IWorkTypesModal> = observer(({
    isOpen,
    closeModal,
    tabs
}) => {

    return (
        <ModalSend
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <div className={classes.types}>

                <div className={classes.types__inner}>
                        {
                            tabs
                                ? tabs?.map((tab, index) =>
                                    <WorkEditType
                                        className={classes.types__item}
                                        key={tab.id}
                                        tab={tab}
                                        index={index}
                                        
                                    />
                                )
                                : null
                        }
                </div>
                <WorkEditType
                    className={classes.types__item_add}
                    index={tabs?.length || 0}
                />


            </div>

        </ModalSend >
    )
})
