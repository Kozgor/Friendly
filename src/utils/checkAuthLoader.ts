import { redirect } from 'react-router-dom';

import { localStorageManager } from './localStorageManager';

import { getTokenDuration } from './getTokenDuration';

export const checkAuthLoader = () => {
  const { getLocalUserData } = localStorageManager();

  const checkAuth = () => {
    const { token, role } = getLocalUserData();
      const tokenDuration = getTokenDuration();

      if (!token || !role || tokenDuration <= 0) {

        return redirect('/auth');
      }

    return null;
  };

  const checkAdminRole = () => {
    const { token, role } = getLocalUserData();

    return role !== 'admin' || !token ? redirect('/auth') : null;
  };

  return {
    checkAuth,
    checkAdminRole
  };
};
