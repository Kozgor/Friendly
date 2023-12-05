import { IBoardHeader } from '../../interfaces/boardHeader';
import { IconButton } from '@mui/joy';
import { icons } from '../../theme/icons/icons';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';

import classes from './BoardSubheader.module.scss';

const BoardSubheader = (props: IBoardHeader) => {
  const {
    backwardLabel,
    forwardLabel,
    backward,
    forward
  } = props;

  const navigate = useNavigate();

  const onBackward = () => {
    navigate(backward);
  };

  const onForward = () => {
    navigate(forward);
  };

  return(
    <div className={classes.subheaderContainer}>
      {!isEmpty(backward) &&
        <span className={classes.subheaderContainerBackward}>
          <IconButton
            variant="solid"
            onClick={onBackward}
            sx={{
              backgroundColor: '#ffa62b',
              '&:hover': {
                backgroundColor: '#ffa62b'
              }
            }}
          >
            {icons.shewronDoubleLeft}
          </IconButton>
        </span>
      }
      {!isEmpty(backwardLabel) &&
        <span className={classes.subheaderContainerFirstTitle}>
          <h2>{backwardLabel}</h2>
        </span>}
      {!isEmpty(forwardLabel) &&
        <span className={classes.subheaderContainerSecondTitle}>
          <h2>{forwardLabel}</h2>
        </span>}
      {!isEmpty(forward) &&
        <span className={classes.subheaderContainerForward}>
          <IconButton
            variant="solid"
            onClick={onForward}
            sx={{
              backgroundColor: '#ffa62b',
              '&:hover': {
                backgroundColor: '#ffa62b'
              }
            }}
          >
            {icons.shewronDoubleRigth}
          </IconButton>
        </span>
      }
    </div>
  );
};

export default BoardSubheader;
