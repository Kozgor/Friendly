import { ACTIVE_BOARD, FINALIZED_BOARD } from '../mocks/board';
import axios, { AxiosResponse } from 'axios';
import { IBoardSettings } from '../interfaces/boardSettings';
import { boardAPI } from './BoardAPI';

jest.mock('axios');

describe('boardAPI', () => {
  process.env.REACT_APP_FRIENDLY_DOMAIN = 'https://test.com/';

  const BOARDS_LINK = 'https://test.com/boards/';
  const BOARD_ID = 'oe2r4-2034rm-2or12-ok3rke';

  const {
    getActiveBoard,
    getFinalizedBoard,
    getBoardById,
    finalizeBoard,
    archiveBoard
} = boardAPI();

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

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`${BOARDS_LINK}active`));
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

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`${BOARDS_LINK}finalized`));
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

    const result = await getBoardById(BOARD_ID);

    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining(`${BOARDS_LINK}get-board`), {
      '_id': BOARD_ID
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

    const result = await finalizeBoard(BOARD_ID);

    expect(axios.put).toHaveBeenCalledWith(expect.stringContaining(`${BOARDS_LINK}finalize-board`), {
      '_id': BOARD_ID
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

    const result = await archiveBoard(BOARD_ID);

    expect(axios.put).toHaveBeenCalledWith(expect.stringContaining(`${BOARDS_LINK}archive-board`), {
      '_id': BOARD_ID
    });
    expect(result).toEqual(mockFinalizedBoardData);
  });
});
