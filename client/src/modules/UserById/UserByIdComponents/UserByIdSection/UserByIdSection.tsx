import { FC, useMemo } from 'react'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom';
import { IReview, IUser, reviewsStore } from '../../../../store';
import classes from './UserByIdSection.module.scss';
import { UserReview } from '../UserReview/UserReview';
import { USER_ROUTE } from '../../../../utils/const/routes';
import UserCard from '../../../../components/UserCard/UserCard';
import Error404 from '../../../../components/Error404/Error404';
import useRequest from '../../../../utils/hooks/useRequest';
import { reviewApi, userApi } from '../../../../http';
import Loader from '../../../../UI/Loader/Loader';

export const UserByIdSection: FC = observer(() => {
    const params = useParams();
    const [
        user,
        userIsLoading,
        userError
    ] = useRequest<IUser>(userApi.getUserById, params ? Number(params.id) : undefined);
    const [
        review,
        reviewIsLoading,
        reviewError
    ] = useRequest<IReview>(reviewApi.getReviewById, params ? Number(params.id) : undefined);

    if (!user && !userIsLoading) {
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
            <Loader
                className={classes.userById__loader}
                isLoading={reviewsStore.isLoading || userIsLoading || reviewIsLoading}
            />
            <UserCard
                user={user}
            />
            {
                review && user
                    ? <UserReview
                        user={user}
                        userReview={review}
                    />

                    : null
            }


        </Section>
    )
})
