import { SUMMARY_LABEL_TAIL } from '../constants';

export const truncateInteractivePanelLabel = () => {
  const truncateSummaryLabel = (inputString: string) => {
    const tailIndex = inputString.indexOf(SUMMARY_LABEL_TAIL);
      const textBeforeSummary = inputString.substring(0, tailIndex);

      return textBeforeSummary.length > 17 ? `${textBeforeSummary.substring(0, 17)}... ${SUMMARY_LABEL_TAIL}` :
        textBeforeSummary;
  };

  return {
    truncateSummaryLabel
  };
};
