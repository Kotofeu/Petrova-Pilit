import { FC, ReactNode } from 'react'
import classes from './Container.module.scss'
import classConnection from '../../utils/function/classConnection';
interface IContainer {
  className?: string;
  children?: ReactNode | ReactNode[];
}

const Container: FC<IContainer> = (props) => {
  return (
    <section className={classConnection(classes.section, props.className)}>
      <div className={classes.container}>
        {props.children}
      </div>
    </section>
  )
}

export default Container