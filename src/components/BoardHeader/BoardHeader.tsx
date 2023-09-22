import Button from '@mui/joy/Button';

import { IBoardHeaderProps } from '../../interfaces/boardHeaderProps';
import Timer from '../Timer/Timer';

import classes from './BoardHeader.module.scss';
import { useStoreUser } from '../../utils/storeUserManager';

import { localStorageManager } from '../../utils/localStorageManager';

import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';

const BoardHeader = (props: IBoardHeaderProps) => {
  const minute = 60000;
  const { removeUserFromStore } = useStoreUser();
  const { removeLocalUserData, getLocalUserData } = localStorageManager();
  const localUserData = getLocalUserData();
  const navigate = useNavigate();
  const onSignOut: MouseEventHandler<HTMLButtonElement> = () => {
    removeUserFromStore();
    removeLocalUserData();
    navigate('/auth');
  };

  return (
    <header className={classes.header}>
      <h4 className={classes.boardName} data-testid="boardName">{props.boardName}</h4>
      {props.isTimerVisible && <Timer time={props.time * minute} />}
      <div className={classes.userBox}>
        <span>Hello, {localUserData.fullName}</span>|
        <Button
          className={classes.signOut}
          variant="plain"
          onClick={onSignOut}
          aria-label="plain primary button for signing out"
          role="button"
          data-testid="signOut"
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default BoardHeader;
