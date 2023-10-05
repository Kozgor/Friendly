import { Outlet, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import classes from './CreateBoard.module.scss';

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
        {/* <div className={classes.customBoard}></div>
          <h3>Custom Board</h3>

          <Divider className={classes.divider} /> */}

        <h2 className={classes.title} data-testid="templates">TEMPLATES</h2>
        <div className={classes.defaultBoard} onClick={openDefaultBoard} data-testid="defaultBoard">
          <div className={classes['defaultBoard__column']}></div>
          <div className={classes['defaultBoard__column']}></div>
          <div className={classes['defaultBoard__column']}></div>
        </div>
        <h3>Default Board</h3>
      </Box>
      <Outlet />
    </>
  );
};

export default CreateBoard;
