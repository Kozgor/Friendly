import { IDownloadBoardSummaryCSVButton } from '../../interfaces/dowloadBoardSummaryCSVButton';
import { IconButton } from '@mui/joy';
import { icons } from '../../theme/icons/icons';

export const DownloadBoardSummaryCSVButton = (props: IDownloadBoardSummaryCSVButton) => {
  const { isDisabled, onClick } = props;
  const iconSize = 36;

  return (
    <IconButton
      color='neutral'
      onClick={onClick}
      size='md'
      variant='plain'
      disabled={isDisabled}
    >
      {icons.download('#303439', iconSize)}
    </IconButton>
  );
};

export default DownloadBoardSummaryCSVButton;
