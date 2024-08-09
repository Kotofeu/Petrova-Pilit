import { FC, memo, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { ILink } from '../../../../store'
import { motion } from 'framer-motion'
import classes from './HeaderLinks.module.scss'
import classConnection from '../../../../utils/function/classConnection'
interface IHeaderLink extends ILink {
    className?: string,
    children?: ReactNode,
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const HeaderLink: FC<IHeaderLink> = memo((props) => {
    return (
        <NavLink
            className={
                ({ isActive }) =>
                    classConnection(classes.headerLink, props.className, isActive ? classes.headerLink_active : '')
            }
            to={props.link}
            onClick={props.onClick}
        >
            {({ isActive }) =>
                <>
                    {props.title}
                    {isActive &&
                        <motion.div
                            className={classes.headerLink__activeLine}
                            layoutId='activeLine'
                        />
                    }
                </>

            }


        </NavLink>
    )
})
