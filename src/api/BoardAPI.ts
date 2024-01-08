import axios from 'axios';

import { IBoardSettings } from '../interfaces/boardSettings';

/**
 * Function for using board API
 * @return {Function} Functions with api calls
 */
export const boardAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

  /**
   * This api call get active board
   * @method GET
   * @return {Promise<IBoardSettings>} Promise with IBoardSettings data
   * @throws {Error<any>} Any possible error
   */
  const getActiveBoard = async (): Promise<IBoardSettings> => {
    try {
      const activeBoard = await axios.get(`${FRIENDLY_DOMAIN}boards/active`);

      return activeBoard.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
   * This api call get finalized board
   * @method GET
   * @return {Promise<IBoardSettings>} Promise with IBoardSettings data
   * @throws {Error<any>} Any possible error
   */
  const getFinalizedBoard = async (): Promise<IBoardSettings> => {
    try {
      const finalizedBoard = await axios.get(`${FRIENDLY_DOMAIN}boards/finalized`);

      return finalizedBoard.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
  * This api call get board by id
  * @method POST
  * @param {string} boardId board id
  * @return {Promise<IBoardSettings>} Promise with IBoardSettings data
  * @throws {Error<any>} Any possible error
  */
  const getBoardById = async (boardId: string): Promise<IBoardSettings> => {
    try {
      const board = await axios.post(`${FRIENDLY_DOMAIN}boards/get-board`, {
        _id: boardId
      });

      return board.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
   * This api call get all boards
   * @method POST
   * @return {Promise<IBoardSettings[]>} Promise with array of IBoardSettings data
   * @throws {Error<any>} Any possible error
   */
  const getAllBoards = async (): Promise<IBoardSettings[]> => {
    try {
      const boards = await axios.post(`${FRIENDLY_DOMAIN}boards/get-boards`);

      return boards.data ? boards.data : [];
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
  * This api call finalize board by boardId
  * @method PUT
  * @param {string} boardId board id
  * @return {Promise<IBoardSettings>} Promise with IBoardSettings data
  * @throws {Error<any>} Any possible error
  */
  const finalizeBoard = async (boardId: string): Promise<IBoardSettings> => {
    try {
      const finalizeBoard = await axios.put(`${FRIENDLY_DOMAIN}boards/finalize-board`, {
        _id: boardId
      });

      return finalizeBoard.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
  * This api call archive board by id
  * @method PUT
  * @param {string} boardId board id
  * @return {Promise<IBoardSettings>} Promise with IBoardSettings data
  * @throws {Error<any>} Any possible error
  */
  const archiveBoard = async (boardId: string): Promise<IBoardSettings> => {
    try {
      const archiveBoard = await axios.put(`${FRIENDLY_DOMAIN}boards/archive-board`, {
        _id: boardId
      });

      return archiveBoard.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
  * This api call get board by id
  * @method POST
  * @param {IBoardSettings} boardSettings settings for board
  * @return {Promise<IBoardSettings>} Promise with IBoardSettings data
  * @throws {Error<any>} Any possible error
  */
  const createNewBoard = async (boardSettings: IBoardSettings): Promise<IBoardSettings> => {
    try {
      const board = await axios.post(`${FRIENDLY_DOMAIN}boards/new-board`, boardSettings);

      return board.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    getActiveBoard,
    getFinalizedBoard,
    getBoardById,
    getAllBoards,
    finalizeBoard,
    archiveBoard,
    createNewBoard
  };
};
