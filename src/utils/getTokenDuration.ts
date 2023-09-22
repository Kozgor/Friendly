import moment from 'moment';

import { localStorageManager } from './localStorageManager';

export const getTokenDuration = () => {
    const { getLocalUserData } = localStorageManager();
    const { expiration } = getLocalUserData();
    const expirationMoment = moment(expiration);
    const currentMoment = moment();
    const tokenDuration = expirationMoment.diff(currentMoment);

    return tokenDuration;
};
