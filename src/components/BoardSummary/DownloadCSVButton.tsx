import { Button } from '@mui/joy';

import { IDownloadBoardSummaryCSVButton } from '../../interfaces/downloadBoardSummaryCSVButton';
import { icons } from '../../theme/icons/icons';

export const DownloadBoardSummaryCSVButton = (props: IDownloadBoardSummaryCSVButton) => {
  const { isDisabled, onClick } = props;
  const iconSize = 16;
  const fontSize = '16px';

  return (
    <Button
      role="button"
      aria-label="Download CSV Report"
      color='neutral'
      onClick={onClick}
      size='sm'
      variant='outlined'
      disabled={isDisabled}
      aria-disabled={isDisabled}
      startDecorator={icons.download('#303439', iconSize)}
      sx={{
        fontSize
      }}
    >Download CSV Report
    </Button>
  );
};

export default DownloadBoardSummaryCSVButton;
