import axios from 'axios';

import { IUserProfile } from '../interfaces/user';

export const userAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

  const submitComments = async (userId: string) => {
    try {
      const submitComments = await axios.put(`${FRIENDLY_DOMAIN}user/submit-comments`, { _id: userId });

      return submitComments.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getUserById = async (userId: string): Promise<IUserProfile | undefined> => {
    try {
      const user = await axios.post(`${FRIENDLY_DOMAIN}user/get-user`, { _id: userId });

      return user.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUserById,
    submitComments
  };
};

