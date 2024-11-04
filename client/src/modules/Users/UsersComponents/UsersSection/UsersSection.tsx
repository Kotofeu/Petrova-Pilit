import { useMemo, useState } from 'react'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { IGetAllJSON, IUser } from '../../../../store'
import useDebounce from '../../../../utils/hooks/useDebounce'
import Fuse from 'fuse.js';
import Input from '../../../../UI/Input/Input'

import classes from './UsersSection.module.scss'
import UserCard from '../../../../components/UserCard/UserCard'
import { useNavigate } from 'react-router-dom'
import { USER_ROUTE } from '../../../../utils/const/routes'
import useRequest from '../../../../utils/hooks/useRequest'
import { userApi } from '../../../../http'
export const UsersSection = observer(() => {
  const [
    users,
    usersIsLoading,
    usersError,
] = useRequest<IGetAllJSON<IUser>>(userApi.getAllUsers);
  const options = {
    keys: ['name', 'phone', 'email'],
    threshold: 0.3,
  };
  const [filter, setFilter] = useState<string>('')
  const debounceFilter = useDebounce(filter, 400)
  const router = useNavigate();

  const fuse = new Fuse(users?.rows || [], options);
  const filteredUsers: IGetAllJSON<IUser> | null = useMemo(() => {
    if (!users?.rows.length) return null
    if (!debounceFilter) return users
    const result = fuse.search(debounceFilter);
    return {
      count: result.length,
      rows: result.map(({ item }) => item),
    };
  }, [users, debounceFilter])
  return (
    <Section className={classes.users}>
      <header className={classes.users__header}>
        <h1 className={classes.users__title}>Поиск по имени, почте и телефону</h1>

        <span className={classes.users__usersCount}>{`Всего пользователей: ${users?.count || 0}`}</span>
        <Input
          className={classes.users__headerInput}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder='Поиск клиента'
          title='Поиск'
        />

      </header>
      {
        !!filteredUsers && filteredUsers.rows.length
          ? <div className={classes.users__users}>
            {
              filteredUsers.rows.map(user => {
                return (
                  <div
                    className={classes.users__userBox}
                    key={user.id}
                    onClick={() => router(`${USER_ROUTE}/${user.id}`)}
                  >
                    <UserCard
                      className={classes.users__user}
                      user={user}
                      isShortCard
                    />
                  </div>

                )
              })
            }
          </div>
          : <h3 className={classes.users__doesNotExist}>
            Такого пользователя не существует
          </h3>
      }


    </Section>
  )
})
