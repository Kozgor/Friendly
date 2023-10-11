import axios, { AxiosResponse } from 'axios';
import { ACTIVE_BOARD } from '../mocks/board';
import { IBoardSettings } from '../interfaces/boardSettings';
import { columnAPI } from './ColumnAPI';

jest.mock('axios');

describe('columnAPI', () => {
  process.env.REACT_APP_FRIENDLY_DOMAIN = 'https://test.com/';

  const COLUMN_LINK = 'https://test.com/columns/';
  const BOARD_ID = 'oe2r4-2034rm-2or12-ok3rke';

  const {
    getUserColumnCards,
    getFinalColumnCards
  } = columnAPI();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch user comments by id', async () => {
    const AUTHOR_ID = 'cardAuthorId';
    const mockActiveBoardData: IBoardSettings = ACTIVE_BOARD;

    const axiosResponse: AxiosResponse<IBoardSettings> = {
      data: ACTIVE_BOARD,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(axiosResponse);

    const result = await getUserColumnCards(BOARD_ID, AUTHOR_ID);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining(`${COLUMN_LINK}user-comments`), {
      'boardId': BOARD_ID, 'cardAuthorId': AUTHOR_ID
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

    const result = await getFinalColumnCards(BOARD_ID);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining(`${COLUMN_LINK}users-comments`), {
      'boardId': BOARD_ID
    });
    expect(result).toEqual(mockActiveBoardData);
  });
});
