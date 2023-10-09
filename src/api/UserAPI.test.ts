import axios, { AxiosResponse } from 'axios';
import { IUserProfile } from '../interfaces/user';
import { STORE_USER_PROFILE } from '../mocks/user';
import { userAPI } from './UserAPI';

jest.mock('axios');

describe('userAPI', () => {
  process.env.REACT_APP_FRIENDLY_DOMAIN = 'https://test.com/';

  const USER_LINK = 'https://test.com/user/';
  const USER_ID = 'test-user-id';

  const {
    getUserById,
    submitComments
  } = userAPI();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch user by id', async () => {
    const mockActiveBoardData: IUserProfile = STORE_USER_PROFILE;

    const axiosResponse: AxiosResponse<IUserProfile> = {
      data: STORE_USER_PROFILE,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(axiosResponse);

    const result = await getUserById(USER_ID);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining(`${USER_LINK}get-user`), {
      '_id': USER_ID
    });
    expect(result).toEqual(mockActiveBoardData);
  });

  it('should submit comments', async () => {
    const mockActiveBoardData: IUserProfile = STORE_USER_PROFILE;

    const axiosResponse: AxiosResponse<IUserProfile> = {
      data: STORE_USER_PROFILE,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    };

    (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValue(axiosResponse);

    const result = await submitComments(USER_ID);

    expect(axios.put).toHaveBeenCalledWith(expect.stringContaining(`${USER_LINK}submit-comments`), {
      '_id': USER_ID
    });
    expect(result).toEqual(mockActiveBoardData);
  });
});
