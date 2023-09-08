import Board from '../../components/Board/Board';

import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStoreUser } from '../../utils/userManager';

import classes from './Board-catalog.module.scss';

const BoardCatalog = () => {
  const navigate = useNavigate();
  const { removeUserFromStore, getUserFromStore } = useStoreUser();
  const handleClickSignOut: MouseEventHandler<HTMLButtonElement> = () => {
    removeUserFromStore();
    navigate('/auth');
  };
  const user = getUserFromStore();
  const fullName = user.fullName || '';

  return (
    <>
      <div className={classes.boardCatalog}>
        <Board fullName={fullName} onSignOut={handleClickSignOut} />
      </div>
    </>
  );
};

export default BoardCatalog;
