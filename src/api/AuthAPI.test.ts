import axios, { AxiosResponse } from 'axios';
import { IUserProfile } from '../interfaces/user';
import { STORE_USER_PROFILE } from '../mocks/user';
import { authAPI } from './AuthAPI';

jest.mock('axios');

describe('authAPI', () => {
  process.env.REACT_APP_FRIENDLY_DOMAIN = 'https://test.com/';

  const AUTH_LINK = 'https://test.com/auth/';
  const USER_EMAIL = 'user@mail-test.com';
  const USER_PASSWORD = '12345';

  const { login } = authAPI();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should login', async () => {
    const mockLoginUserData: IUserProfile = STORE_USER_PROFILE;

    const axiosResponse: AxiosResponse<IUserProfile> = {
      data: STORE_USER_PROFILE,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(axiosResponse);

    const result = await login(USER_EMAIL, USER_PASSWORD);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining(`${AUTH_LINK}login`), {
      'email': USER_EMAIL, 'password': USER_PASSWORD
    });
    expect(result).toEqual(mockLoginUserData);
  });
});
