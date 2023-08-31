import Button from '@mui/joy/Button';

import { IBoardHeaderProps } from '../../interfaces/boardHeaderProps';
import Timer from '../Timer/Timer';

import classes from './BoardHeader.module.scss';

const BoardHeader = (props: IBoardHeaderProps) => {
  const minute = 60000;

  return (
    <header className={classes.header}>
      <h4 className={classes.boardName}>{props.boardName}</h4>
      {props.isTimerVisible && <Timer time={props.time * minute} />}
      <div className={classes.userBox}>
        <span>Hello, {props.fullName}</span>|
        <Button
          className={classes.signOut}
          variant="plain"
          onClick={props.onSignOut}
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
