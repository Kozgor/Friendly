import axios from 'axios';

export const authAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

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
