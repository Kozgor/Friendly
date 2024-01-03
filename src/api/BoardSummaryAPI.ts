import axios from 'axios';

export const boardSummaryAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

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
