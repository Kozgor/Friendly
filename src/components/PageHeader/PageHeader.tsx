import { MouseEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { useLocation } from 'react-router-dom';

import Button from '@mui/joy/Button';
import PageSubheader from '../PageSubheader/PageSubheader';
import Timer from '../Timer/Timer';

import { BoardContext } from '../../context/board/boardContext';
import { localStorageManager } from '../../utils/localStorageManager';
import { useStoreUser } from '../../utils/storeUserManager';
import { userAPI } from '../../api/UserAPI';

import classes from './PageHeader.module.scss';

const PageHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitButton, setIsSubmitButton] = useState(true);
  const { isTimerVisible, disableAdding, setFormSubmit, setTimerVisibility } = useContext(BoardContext);
  const { removeUserFromStore } = useStoreUser();
  const { removeLocalUserData, getLocalUserData } = localStorageManager();
  const localUserData = getLocalUserData();
  const { submitComments } = userAPI();
  const isBoardPage = location.pathname.startsWith('/board/');
  const isShowTimer = isTimerVisible && isSubmitButton && isBoardPage;

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
    setTimerVisibility(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.mainHeader}>
        <span className={classes['header__board-box']}>
          {isShowTimer &&
            <span className={classes['header__board-actions']}>
              <span className={classes['header__board-actions__timer']}>
                <Timer />
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
      </div>
      {localUserData.role === 'admin' &&
        <PageSubheader></PageSubheader>
      }
    </header>
  );
};

export default PageHeader;
