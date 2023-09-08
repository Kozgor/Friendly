/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from 'react-redux';

import { addUser, removeUser } from '../store/store';

import { IUserProfile } from '../interfaces/user';
import { RootStateInterface } from '../store/interfaces';

export const useStoreUser = () => {
  const dispatch = useDispatch();
  const addUserToStore = (user: IUserProfile) => {
    dispatch(addUser(user));
  };
  const removeUserFromStore = () => {
    dispatch(removeUser());
  };
  const getUserFromStore = () => useSelector((state: RootStateInterface) => state.user);

  return {
    addUserToStore,
    removeUserFromStore,
    getUserFromStore
  };
};
