import { IUserLocalProfile } from '../interfaces/user';
import { initialLocalUserProfile } from '../mocks/user';

export const localStorageManager = () => {
    const saveLocalUserData = (data: IUserLocalProfile) => {
        const userProfile = {
            fullName: data.fullName,
            role: data.role,
            avatar: data.avatar,
            token: data.token
        };
        const jsonStringUserProfile = JSON.stringify(userProfile);

        localStorage.setItem('localProfile', jsonStringUserProfile);
    };
    const removeLocalUserData = () => {
        localStorage.removeItem('localProfile');
    };
    const getLocalUserData = () => {
        const storedUserProfileJSON = localStorage.getItem('localProfile');

        return storedUserProfileJSON ? JSON.parse(storedUserProfileJSON) : initialLocalUserProfile;
    };

    return {
      saveLocalUserData,
      removeLocalUserData,
      getLocalUserData
    };
};
