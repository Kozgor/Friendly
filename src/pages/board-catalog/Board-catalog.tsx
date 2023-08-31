import Board from '../../components/Board/Board';

import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Board-catalog.module.scss';

const BoardCatalog = () => {
  const navigate = useNavigate();
  const handleClickSignOut: MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('role');
    navigate('/auth');
  };
  const fullName = localStorage.getItem('fullName') || '';
  return (
    <>
      <div className={classes.boardCatalog}>
        <Board
          fullName={fullName}
          isTimerVisible={true}
          onSignOut={handleClickSignOut}
        />
      </div>
    </>
  );
};

export default BoardCatalog;
