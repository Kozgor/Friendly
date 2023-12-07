import Board from '../../components/Board/Board';

import classes from './Board.module.scss';

const BoardPage = () => (
    <>
      <div className={classes.board}>
        <Board />
      </div>
    </>
  );

export default BoardPage;
