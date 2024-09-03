import { memo, FC, ReactNode } from 'react'
import classConnection from '../../utils/function/classConnection'
import classes from './Tabs.module.scss'
import ActiveLine from '../../UI/ActiveLine/ActiveLine';
interface ITabButton {
    isActive: boolean;
    className?: string;
    onClick: () => void;
    title: string;
    tabsName: string
}

const TabButton: FC<ITabButton> = memo(({
    isActive,
    className,
    onClick,
    title,
    tabsName
}
) => {
    return (
        <>
            <button
                className={classConnection(
                    classes.tabs__button,
                    className,
                    isActive ? classes.tabs__button_active : ''
                )}
                onClick={onClick}
                aria-label={`${tabsName}: ${title}`}
            >
                {title}
                <span aria-hidden>
                    {title}
                </span>
                <ActiveLine
                    className={classes.tabs__activeLine}
                    layoutId={tabsName}
                    isActive={isActive}
                />
            </button>

        </>

    );
});

export default TabButton;