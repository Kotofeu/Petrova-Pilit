import { FC, memo, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import classConnection from '../../../../utils/function/classConnection'

import { ILink } from '../../../../store'
import classes from './HeaderLinks.module.scss'

export enum LinkType {
    underline = 'underline',
    none = 'none'

}
interface IHeaderLink extends ILink {
    className?: string,
    children?: ReactNode,
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
    type?: LinkType,
}

export const HeaderLink: FC<IHeaderLink> = memo((props) => {
    const {className, children, onClick, type = LinkType.none, title, link} = props
    return (
        <NavLink
            className={
                ({ isActive }) =>
                    classConnection(classes.headerLink, isActive ? classes.headerLink_active : '', className)
            }
            to={link}
            onClick={onClick}
            end
        >
            {({ isActive }) =>
                <>
                    {title}
                    {children}
                    {(isActive && type === LinkType.underline) &&
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
