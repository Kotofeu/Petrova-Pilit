import { FC, useCallback, useMemo } from 'react'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom';
import { reviewsStore, userStore } from '../../../../store';
import classes from './UserByIdSection.module.scss';
import { UserReview } from '../UserReview/UserReview';
import { USER_ROUTE } from '../../../../utils/const/routes';
import Button from '../../../../UI/Button/Button';
import UserCard from '../../../../components/UserCard/UserCard';

export const UserByIdSection: FC = observer(() => {

    const params = useParams();
    const router = useNavigate();

    const user = useMemo(() => {
        if (params.id) return userStore.getUserById(+params.id)
    }, [params])
    const userReview = useMemo(() => {
        return reviewsStore.getReviewById(user?.review?.id)
    }, [user])

    const onReturnToUsersClick = useCallback(() => {
        router(USER_ROUTE);
    }, [router]);

    return (
        <Section className={classes.userById}>
            {
                user
                    ? <>
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
                    </>
                    : <div className={classes.userById__noUser}>
                        <h1 className={classes.userById__404}>
                            404
                        </h1>
                        <h2 className={classes.userById__noUserTitle}>
                            {"Пользователь не найден :("}
                        </h2>
                        <Button
                            className={classes.userById__noUserBtn}
                            onClick={onReturnToUsersClick}
                        >
                            На страницу пользователей
                        </Button>
                    </div>
            }

        </Section>
    )
})
