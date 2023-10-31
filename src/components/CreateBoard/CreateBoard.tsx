import { Outlet, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import classes from './CreateBoard.module.scss';
import { Typography } from '@mui/joy';

const CreateBoard = () => {
  const navigate = useNavigate();
  const openDefaultBoard = () => {
    navigate('/admin/default_board');
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginLeft: 0
        }}
      >
        <Typography level='h1' data-testid='templates'>New Board</Typography>
        <div
          className={classes.defaultBoard}
          onClick={openDefaultBoard}
          data-testid='defaultBoard'
        >
        </div>
        <Typography level='title-lg' data-testid='default-board'>Default Board</Typography>
      </Box>
      <Outlet />
    </>
  );
};

export default CreateBoard;
