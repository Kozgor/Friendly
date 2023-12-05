import axios from 'axios';

export const boardSummaryAPI = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

  const getBoardSummary = async (boardId: string) => {
    try {
      const finalColumns = await axios.post(`${FRIENDLY_DOMAIN}board_summary/get-board-summary`, { boardId });

      return finalColumns.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getBoardSummary
  };
};
