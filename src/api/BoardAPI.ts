import axios from 'axios';

import { IBoardSettings } from '../interfaces/boardSettings';

export const boardAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

  const getActiveBoard = async (): Promise<IBoardSettings | undefined> => {
    try {
      const activeBoard = await axios.get(`${FRIENDLY_DOMAIN}boards/active`);

      return activeBoard.data ? activeBoard.data : undefined;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const getFinalizedBoard = async (): Promise<IBoardSettings | undefined> => {
    try {
      const finalizedBoard = await axios.get(`${FRIENDLY_DOMAIN}boards/finalized`);

      return finalizedBoard.data ? finalizedBoard.data : undefined;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const getBoardById = async (boardId: string): Promise<IBoardSettings | undefined> => {
    try {
      const board = await axios.post(`${FRIENDLY_DOMAIN}boards/get-board`, {
        _id: boardId
      });

      return board.data ? board.data : undefined;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const getAllBoards = async (): Promise<IBoardSettings[] | undefined> => {
    try {
      const boards = await axios.post(`${FRIENDLY_DOMAIN}boards/get-boards`);

      return boards.data ? boards.data : undefined;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const finalizeBoard = async (boardId: string): Promise<IBoardSettings | undefined> => {
    try {
      const finalizeBoard = await axios.put(`${FRIENDLY_DOMAIN}boards/finalize-board`, {
        _id: boardId
      });

      return finalizeBoard.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const archiveBoard = async (boardId: string): Promise<IBoardSettings | undefined> => {
    try {
      const archiveBoard = await axios.put(`${FRIENDLY_DOMAIN}boards/archive-board`, {
        _id: boardId
      });

      return archiveBoard.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

  const createNewBoard = async (boardSettings: IBoardSettings): Promise<IBoardSettings> => {
    try {
      const board = await axios.post(`${FRIENDLY_DOMAIN}boards/new-board`, boardSettings);

      return board.data;
    } catch (error: any) {
      console.log(error);
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
