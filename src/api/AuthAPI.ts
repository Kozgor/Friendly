import axios from 'axios';

/**
 * Function for using auth API
 * @return {Function} Functions with api calls
 */
export const authAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

  /**
   * This api send email and password and if it's right login user to the system
   * @param {string} email  Email
   * @param {string} password Password
   * @return {Promise<any>} Promise with data for user
   * @throws {Error<any>} Any possible error
   */
  const login = async (email: string, password: string): Promise<any> => {
    try {
      const login = await axios.post(`${FRIENDLY_DOMAIN}auth/login`, {
        email,
        password
      });

      return login.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    login
  };
};
