import { MouseEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import Button from '@mui/joy/Button';
import Timer from '../Timer/Timer';

import { BoardContext } from '../../context/board/boardContext';
import { IBoardHeaderProps } from '../../interfaces/boardHeaderProps';

import { localStorageManager } from '../../utils/localStorageManager';
import { useStoreUser } from '../../utils/storeUserManager';
import { userAPI } from '../../api/UserAPI';

import classes from './BoardHeader.module.scss';

const BoardHeader = (props: IBoardHeaderProps) => {
  const { boardName, time, isTimerVisible } = props;
  const navigate = useNavigate();
  const [isSubmitButton, setIsSubmitButton] = useState(true);
  const [currentBoardName, setCurrentBoardName] = useState(boardName);
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
    setCurrentBoardName(' ');
  };

  return (
    <header className={classes.header}>
      <span className={classes['header__board-box']}>
        <span className={classes['header__board-box__name']}>
          <h4 data-testid='boardName'>{currentBoardName ? currentBoardName : boardName}</h4>
        </span>
        {(isTimerVisible && isSubmitButton) &&
          <span className={classes['header__board-actions']}>
            <span className={classes['header__board-actions__timer']}>
              <Timer time={time * minute} />
            </span>
            <span className={classes['header__board-actions__complete-button']}>
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
            </span>
          </span>
        }
      </span>
      <div className={classes['header__user-box']}>
        <span>Hello, {localUserData.fullName}</span>|
        <Button
          className={classes['header__user-box__sign-out']}
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
