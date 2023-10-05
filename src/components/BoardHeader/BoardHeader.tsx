import { MouseEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import Button from '@mui/joy/Button';
import Timer from '../Timer/Timer';

import { BoardContext } from '../../context/board/board-context';
import { IBoardHeaderProps } from '../../interfaces/boardHeaderProps';

import { localStorageManager } from '../../utils/localStorageManager';
import { useStoreUser } from '../../utils/storeUserManager';
import { userAPI } from '../../api/UserAPI';

import classes from './BoardHeader.module.scss';

const BoardHeader = (props: IBoardHeaderProps) => {
  const { boardName, time, isTimerVisible } = props;
  const navigate = useNavigate();
  const [isSubmitButton, setIsSubmitButton] = useState(true);
  const { disableAdding, setFormSubmit } = useContext(BoardContext);
  const { removeUserFromStore } = useStoreUser();
  const { removeLocalUserData, getLocalUserData } = localStorageManager();
  const localUserData = getLocalUserData();
  const { submitComments } = userAPI();
  const minute = 60000;

  const onSignOut: MouseEventHandler<HTMLButtonElement> = () => {
    removeUserFromStore();
    removeLocalUserData();
    navigate('/auth');
  };

  const onComplete = () => {
    submitComments(localUserData._id);
    disableAdding();
    setFormSubmit();
    setIsSubmitButton(false);
  };

  return (
    <header className={classes.header}>
      <h4 className={classes.boardName} data-testid='boardName'>{boardName}</h4>
      { (isTimerVisible && isSubmitButton) && <Timer time={time * minute} /> }
      { (isTimerVisible && isSubmitButton)&&
        <Button
          variant='solid'
          type='submit'
          aria-label='solid button for submitting the form'
          onClick= {onComplete}
          role='button'
          data-testid='submit'
        >
          Complete
        </Button>
      }
      <div className={classes.userBox}>
        <span>Hello, {localUserData.fullName}</span>|
        <Button
          className={classes.signOut}
          variant='soft'
          onClick={onSignOut}
          aria-label='plain primary button for signing out'
          role='button'
          data-testid='signOut'
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default BoardHeader;
