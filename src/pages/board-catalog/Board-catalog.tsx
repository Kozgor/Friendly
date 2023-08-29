import classes from './Board-catalog.module.scss';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../../components/Board/Board';
import Button from '@mui/joy/Button';
const BoardCatalog = () => {
  interface UserProfile {
    _id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    token: string;
  }
  const navigate = useNavigate();
  const handleClickSignOut: MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };
  return (
    <>
      <div>
        <span className={classes.userBlock}>Hello
          <Button variant="plain" onClick={handleClickSignOut}>Sig out</Button>
        </span>
        <Board />
      </div>
    </>
  );
};

export default BoardCatalog;
