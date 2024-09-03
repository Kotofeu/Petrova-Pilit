import { memo, FC } from 'react'
import classes from './Tabs.module.scss'
import classConnection from '../../utils/function/classConnection';
import TabButton from './TabButton';


interface ITabItem {
    id: number;
    title: string;
}

interface ITabs {
    name: string;
    className?: string;
    tabClassName?: string;
    tabs: ITabItem[];
    activeId: number | null;
    addAll?: boolean;
    setActiveID: (id: number | null) => void;
}

const Tabs: FC<ITabs> = memo(({
    name,
    className,
    tabClassName,
    tabs = [],
    activeId,
    addAll = false,
    setActiveID
}) => {
    if (!tabs.length) return null;

    return (
        <nav
            className={classConnection(classes.tabs, className)}
            aria-label={name}
        >
            {
                addAll && (
                    <TabButton
                        isActive={activeId === null}
                        className={tabClassName}
                        onClick={() => setActiveID(null)}
                        tabsName={name}
                        title='Все'
                    />
                )
            }
            {
                tabs.map(tab => (
                    <TabButton
                        key={tab.id}
                        isActive={activeId === tab.id}
                        className={tabClassName}
                        onClick={() => setActiveID(tab.id)}
                        tabsName={name}
                        title={tab.title}
                    />
                ))
            }
        </nav>
    );
});

export default Tabs;