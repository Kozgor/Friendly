import axios from 'axios';

import { IUserProfile } from '../interfaces/user';

/**
 * Function for using user API
 * @return {Function} Functions with api calls
 */
export const userAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

  /**
  * This api call get all registered users
  * @method GET
  * @return {Promise<IUserProfile[]>} Promise with array of IUserProfile data
  * @throws {Error<any>} Any possible error
  */
  const getAllUsers = async (): Promise<IUserProfile[]> => {
    try {
      const submitComments = await axios.get(`${FRIENDLY_DOMAIN}user/get-all-users`);

      return submitComments.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
  * This api call get user data by it id
  * @method POST
  * @param {string} userId user id to find it data
  * @return {Promise<IUserProfile>} Promise with IUserProfile data
  * @throws {Error<any>} Any possible error
  */
  const getUserById = async (userId: string): Promise<IUserProfile> => {
    try {
      const user = await axios.post(`${FRIENDLY_DOMAIN}user/get-user`, { _id: userId });

      return user.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
  * This api call save user's comments for special board
  * @method PUT
  * @param {string} userId user id
  * @return {Promise<any>} Promise with data
  * @throws {Error<any>} Any possible error
  */
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

