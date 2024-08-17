import { FC, memo } from 'react'
import classes from './HomeServicesDescription.module.scss'
import classConnection from '../../../../utils/function/classConnection';

interface IHomeServicesDescription {
  className?: string;
  description?: string;
}
export const HomeServicesDescription: FC<IHomeServicesDescription> = memo(({
  className,
  description,
}) => {
  return (
    <div className={classConnection(classes.servicesDescription, className)}>
      <p className={classes.servicesDescription__text}>
        {description}
      </p>
    </div>
  )
})