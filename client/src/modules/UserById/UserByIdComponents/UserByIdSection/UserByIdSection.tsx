import { FC, useMemo } from 'react'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom';
import { IUser, reviewsStore, userStore } from '../../../../store';
import classes from './UserByIdSection.module.scss';
import { UserReview } from '../UserReview/UserReview';
import { USER_ROUTE } from '../../../../utils/const/routes';
import Button from '../../../../UI/Button/Button';
import UserCard from '../../../../components/UserCard/UserCard';
import Error404 from '../../../../components/Error404/Error404';
import useRequest from '../../../../utils/hooks/useRequest';
import { userApi } from '../../../../http';

export const UserByIdSection: FC = observer(() => {
    const params = useParams();
    const [
      user,
      userIsLoading
    ] = useRequest<IUser>(userApi.getUserById, params ? Number(params.id) : undefined);

    const userReview = useMemo(() => {
        return reviewsStore.getReviewById(user?.review?.id)
    }, [user])


    if (!user) {
        return (
            <Error404
                className={classes.userById__noUser}
                text='Пользователь не найден :('
                buttonText='На страницу пользователей'
                page={USER_ROUTE}
            />
        )
    }

    return (
        <Section className={classes.userById}>
            <UserCard
                user={user}
            />
            {
                userReview
                    ? <UserReview
                        user={user}
                        userReview={userReview}
                    />

                    : null
            }


        </Section>
    )
})
