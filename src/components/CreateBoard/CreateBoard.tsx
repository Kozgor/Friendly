import { Box, Typography } from '@mui/joy';
import { Outlet, useNavigate } from 'react-router-dom';

import TitlePanel from '../TitlePanel/TitlePanel';
import { panelTitles } from '../../constants';

import classes from './CreateBoard.module.scss';

const CreateBoard = () => {
  const navigate = useNavigate();
  const openDefaultBoard = () => {
    navigate('/admin/new_board/default_board');
  };
  const title = panelTitles.newBoard;

  return (
    <div className={classes.createBoardContainer}>
      <TitlePanel title={title}></TitlePanel>
      <Box
        className={classes.createBoardBox}
        component="main"
      >
        <div
          className={classes.defaultBoard}
          onClick={openDefaultBoard}
          data-testid='defaultBoard'
        >
        </div>
        <Typography level='title-lg' data-testid='default-board'>Default Board</Typography>
      </Box>
      <Outlet />
    </div>
  );
};

export default CreateBoard;
