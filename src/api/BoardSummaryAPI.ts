import axios from 'axios';

/**
 * Function for using boardSummary API
 * @return {Function} Functions with api calls
 */
export const boardSummaryAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

  /**
  * This api call get summary data for board by boardId
  * @method POST
  * @param {string} boardId board id
  * @return {Promise<any>} Promise with data
  * @throws {Error<any>} Any possible error
  */
  const getBoardSummary = async (boardId: string): Promise<any> => {
    try {
      const boardSummary = await axios.post(`${FRIENDLY_DOMAIN}board_summary/get-board-summary`, { boardId });

      return boardSummary.data || null;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  };

  return {
    getBoardSummary
  };
};
