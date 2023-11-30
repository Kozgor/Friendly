import { INITIAL_LOCAL_BOARD, INITIAL_LOCAL_PROFILE } from '../mocks/user';
import { ICurrentBoardDetails, IUserLocalProfile } from '../interfaces/user';

import moment from 'moment';

export const localStorageManager = () => {
  const saveLocalUserData = (data: IUserLocalProfile) => {
    const currentTime = moment();
    const expirationHours = currentTime.add(6, 'hours');

    const userProfile = {
      _id: data._id,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      avatar: data.avatar,
      token: data.token,
      expiration: expirationHours
    };
    const jsonStringUserProfile = JSON.stringify(userProfile);

    localStorage.setItem('localProfile', jsonStringUserProfile);
  };

  const removeLocalUserData = () => {
    localStorage.removeItem('localProfile');
  };

  const getLocalUserData = () => {
    const storedUserProfileJSON = localStorage.getItem('localProfile');

    return storedUserProfileJSON ? JSON.parse(storedUserProfileJSON) : INITIAL_LOCAL_PROFILE;
  };

  const saveLocalBoardDetails = (data: ICurrentBoardDetails) => {
    const currentBoardDetails = {
      currentBoardId: data.currentBoardId,
      currentBoardName: data.currentBoardName
    };
    const jsonStringCurrentBoardDetails = JSON.stringify(currentBoardDetails);

    localStorage.setItem('currentBoardDetails', jsonStringCurrentBoardDetails);
  };

  const removeLocalBoardDetails = () => {
    localStorage.removeItem('currentBoard');
  };

  const getLocalBoardDatails = () => {
    const storedCurrentBoardDetailsJSON = localStorage.getItem('currentBoardDetails');

    return storedCurrentBoardDetailsJSON ? JSON.parse(storedCurrentBoardDetailsJSON) : INITIAL_LOCAL_BOARD;
  };

  return {
    saveLocalUserData,
    removeLocalUserData,
    getLocalUserData,
    saveLocalBoardDetails,
    removeLocalBoardDetails,
    getLocalBoardDatails
  };
};
