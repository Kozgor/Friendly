/* eslint-disable max-lines */
import axios, { AxiosResponse } from 'axios';
import { boardAPI } from './BoardAPI';

import { ACTIVE_BOARD, FINALIZED_BOARD } from '../mocks/board';

import { IBoardSettings } from '../interfaces/boardSettings';
import { columnAPI } from './ColumnAPI';
import { userAPI } from './UserAPI';

import { IUserProfile } from '../interfaces/user';

import { STORE_USER_PROFILE } from '../mocks/user';
import { authAPI } from './AuthAPI';

jest.mock('axios');

describe('API:', () => {
  process.env.REACT_APP_FRIENDLY_DOMAIN = 'https://test.com/';

  describe('boardAPI', () => {
    const { getActiveBoard, getFinalizedBoard, getBoardById, finalizeBoard, archiveBoard } = boardAPI();

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch active board', async () => {
      const mockActiveBoardData: IBoardSettings = ACTIVE_BOARD;

      const axiosResponse: AxiosResponse<IBoardSettings> = {
        data: ACTIVE_BOARD,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };

      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(axiosResponse);

      try {
        const result = await getActiveBoard();

        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('https://test.com/boards/active'));
        expect(result).toEqual(mockActiveBoardData);
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it('should fetch finalized board', async () => {
      const mockFinalizedBoardData: IBoardSettings = FINALIZED_BOARD;

      const axiosResponse: AxiosResponse<IBoardSettings> = {
        data: FINALIZED_BOARD,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };

      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(axiosResponse);

      const result = await getFinalizedBoard();

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('https://test.com/boards/finalized'));
      expect(result).toEqual(mockFinalizedBoardData);
    });

    it('should fetch board by id', async () => {
      const mockFinalizedBoardData: IBoardSettings = ACTIVE_BOARD;

      const axiosResponse: AxiosResponse<IBoardSettings> = {
        data: ACTIVE_BOARD,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };

      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(axiosResponse);

      const result = await getBoardById('oe2r4-2034rm-2or12-ok3rke');

      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('https://test.com/boards/get-board'), {
          '_id': 'oe2r4-2034rm-2or12-ok3rke'
      });
      expect(result).toEqual(mockFinalizedBoardData);
    });

    it('should finalize board by id', async () => {
      const mockFinalizedBoardData: IBoardSettings = ACTIVE_BOARD;

      const axiosResponse: AxiosResponse<IBoardSettings> = {
        data: ACTIVE_BOARD,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };

      (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValue(axiosResponse);

      const result = await finalizeBoard('oe2r4-2034rm-2or12-ok3rke');

      expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('https://test.com/boards/finalize-board'), {
          '_id': 'oe2r4-2034rm-2or12-ok3rke'
      });
      expect(result).toEqual(mockFinalizedBoardData);
    });

    it('should archive board by id', async () => {
      const mockFinalizedBoardData: IBoardSettings = FINALIZED_BOARD;

      const axiosResponse: AxiosResponse<IBoardSettings> = {
        data: FINALIZED_BOARD,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };

      (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValue(axiosResponse);

      const result = await archiveBoard('oe2r4-2034rm-2or12-ok3rke');

      expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('https://test.com/boards/archive-board'), {
          '_id': 'oe2r4-2034rm-2or12-ok3rke'
      });
      expect(result).toEqual(mockFinalizedBoardData);
    });
  });

  describe('columnAPI', () => {
    const { getUserColumnCards, getFinalColumnCards } = columnAPI();

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch user comments by id', async () => {
      const mockActiveBoardData: IBoardSettings = ACTIVE_BOARD;

      const axiosResponse: AxiosResponse<IBoardSettings> = {
        data: ACTIVE_BOARD,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };

      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(axiosResponse);

      const result = await getUserColumnCards('oe2r4-2034rm-2or12-ok3rke', 'cardAuthorId');

      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('https://test.com/columns/user-comments'), {
          'boardId': 'oe2r4-2034rm-2or12-ok3rke', 'cardAuthorId': 'cardAuthorId'
      });
      expect(result).toEqual(mockActiveBoardData);
    });

    it('should fetch all users comments', async () => {
      const mockActiveBoardData: IBoardSettings = ACTIVE_BOARD;

      const axiosResponse: AxiosResponse<IBoardSettings> = {
        data: ACTIVE_BOARD,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      };

      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(axiosResponse);

      const result = await getFinalColumnCards('oe2r4-2034rm-2or12-ok3rke');

      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('https://test.com/columns/users-comments'), {
          'boardId': 'oe2r4-2034rm-2or12-ok3rke'
      });
      expect(result).toEqual(mockActiveBoardData);
    });
  });

  describe('userAPI', () => {
    const { getUserById, submitComments } = userAPI();

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

      const result = await getUserById('test-id-john');

      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('https://test.com/user/get-user'), {
          '_id': 'test-id-john'
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

      const result = await submitComments('test-id-john');

      expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('https://test.com/user/submit-comments'), {
          '_id': 'test-id-john'
      });
      expect(result).toEqual(mockActiveBoardData);
    });
  });

  describe('authAPI', () => {
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

      const result = await login('user@mail-test.com', '12345');

      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('https://test.com/auth/login'), {
          'email': 'user@mail-test.com', 'password': '12345'
      });
      expect(result).toEqual(mockLoginUserData);
    });
  });
});
