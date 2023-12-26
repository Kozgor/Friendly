import { IDownloadBoardSummaryCSVButton } from '../../interfaces/dowloadBoardSummaryCSVButton';
import { Button, IconButton } from '@mui/joy';
import { icons } from '../../theme/icons/icons';

export const DownloadBoardSummaryCSVButton = (props: IDownloadBoardSummaryCSVButton) => {
  const { isDisabled, onClick } = props;
  const iconSize = 16;
  const fontSize = '16px';

  return (
    <Button
      color='neutral'
      onClick={onClick}
      size='sm'
      variant='outlined'
      disabled={isDisabled}
      startDecorator={icons.download('#303439', iconSize)}
      sx={{
        fontSize
      }}
    >Download CSV Report
    </Button>
  );
};

export default DownloadBoardSummaryCSVButton;
