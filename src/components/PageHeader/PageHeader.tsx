import Button from '@mui/joy/Button';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';

import { localStorageManager } from '../../utils/localStorageManager';
import { useStoreUser } from '../../utils/storeUserManager';

import classes from './PageHeader.module.scss';

const PageHeader = () => {
  const navigate = useNavigate();
  const { removeUserFromStore } = useStoreUser();
  const { removeLocalUserData, getLocalUserData } = localStorageManager();
  const localUserData = getLocalUserData();

  const onSignOut: MouseEventHandler<HTMLButtonElement> = () => {
    removeUserFromStore();
    removeLocalUserData();
    navigate('/auth');
  };

  return (
    <header className={classes.header}>
      <div className={classes.mainHeader}>
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
    </header>
  );
};

export default PageHeader;
