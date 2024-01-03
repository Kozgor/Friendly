import axios from 'axios';

import { IUserProfile } from '../interfaces/user';

export const userAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

  const getAllUsers = async (): Promise<IUserProfile[]> => {
    try {
      const submitComments = await axios.get(`${FRIENDLY_DOMAIN}user/get-all-users`);

      return submitComments.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getUserById = async (userId: string): Promise<IUserProfile> => {
    try {
      const user = await axios.post(`${FRIENDLY_DOMAIN}user/get-user`, { _id: userId });

      return user.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const submitComments = async (userId: string): Promise<any> => {
    try {
      const submitComments = await axios.put(`${FRIENDLY_DOMAIN}user/submit-comments`, { _id: userId });

      return submitComments.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    getAllUsers,
    getUserById,
    submitComments
  };
};

