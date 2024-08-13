import { FC, memo, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { ILink } from '../../../../store'
import { motion } from 'framer-motion'
import classes from './HeaderLinks.module.scss'
import classConnection from '../../../../utils/function/classConnection'
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
