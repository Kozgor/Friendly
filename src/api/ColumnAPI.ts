import axios from 'axios';

import { ICardReactions, IColumnCard } from '../interfaces/columnCard';

/**
 * Function for using column API
 * @return {Function} Functions with api calls
 */
export const columnAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

  /**
    * This api call get cards for column by authorId
    * @method POST
    * @param {string} boardId board id
    * @param {string} cardAuthorId id of card author
    * @return {Promise<IColumnCard[]>} Promise with array of IColumnCard data
    * @throws {Error<any>} Any possible error
    */
  const getUserColumnCards = async (boardId: string, cardAuthorId: string): Promise<IColumnCard[]> => {
    try {
      const userColumns = await axios.post(`${FRIENDLY_DOMAIN}columns/user-comments`, { boardId, cardAuthorId });

      return userColumns.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
  * This api call get final cards for column by boardId
  * @method POST
  * @param {string} boardId board id
  * @return {Promise<IColumnCard[]>} Promise with array of IColumnCard data
  * @throws {Error<any>} Any possible error
  */
  const getFinalColumnCards = async (boardId: string): Promise<IColumnCard[]> => {
    try {
      const finalColumns = await axios.post(`${FRIENDLY_DOMAIN}columns/users-comments`, { boardId });

      return finalColumns.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  /**
  * This api call get cards for column by authorId
  * @method PUT
  * @param {ICardReactions} reactions reactions for special card
  * @return {Promise<any>} Promise with data
  * @throws {Error<any>} Any possible error
  */
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
