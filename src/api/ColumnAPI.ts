import axios from 'axios';

import { ICardReactions, IColumnCard } from '../interfaces/columnCard';

export const columnAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

  const getUserColumnCards = async (boardId: string, cardAuthorId: string): Promise<IColumnCard[]> => {
    try {
      const userColumns = await axios.post(`${FRIENDLY_DOMAIN}columns/user-comments`, { boardId, cardAuthorId });

      return userColumns.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const getFinalColumnCards = async (boardId: string): Promise<IColumnCard[]> => {
    try {
      const finalColumns = await axios.post(`${FRIENDLY_DOMAIN}columns/users-comments`, { boardId });

      return finalColumns.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  const updateColumnCardReaction = async (reactions: ICardReactions): Promise<any> => {
    try {
      const updatedCardWithReactions = await axios.put(`${FRIENDLY_DOMAIN}card/update-card-reactions`, reactions);

      return updatedCardWithReactions.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    getUserColumnCards,
    getFinalColumnCards,
    updateColumnCardReaction
  };
};
