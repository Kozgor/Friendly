import Button from '@mui/joy/Button';

import { IBoardHeaderProps } from '../../interfaces/boardHeaderProps';
import Timer from '../Timer/Timer';

import classes from './BoardHeader.module.scss';

const BoardHeader = (props: IBoardHeaderProps) => (
  <header className={classes.header}>
    <span className={classes.userBlock}>Hello, {props.fullName}</span>
    <Timer time={600000} />
    <Button
      variant="plain"
      onClick={props.onSignOut}
      aria-label="plain primary button for signing out"
      role="button"
      data-testid="signOut"
    >
      Sig Out
    </Button>
  </header>
);

export default BoardHeader;
