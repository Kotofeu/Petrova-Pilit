import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { PASSWORD_RECOVERY, REGISTRATION, registrationStore } from '../../../../store';
import classes from './RegistrationProgress.module.scss'
interface IRegistrationProgress {
    email?: string;
    jwt?: string;
}
const RegistrationProgress: FC<IRegistrationProgress> = observer(({
    email, jwt
}) => {
    if (registrationStore.actionType !== REGISTRATION
        && registrationStore.actionType !== PASSWORD_RECOVERY) return null
    return (
        <div className={classes.registrationProgress}>
            <span className={classes.registrationProgress__complete} />
            <span className={email ? classes.registrationProgress__complete : ''} />
            <span className={jwt && email ? classes.registrationProgress__complete : ''} />
        </div>)
})

export default RegistrationProgress