import Board from '../../components/Board/Board';
import { BoardProvider } from '../../context/board/board-context';

import classes from './Board.module.scss';

const BoardPage = () => (
    <>
      <div className={classes.board}>
        <BoardProvider>
          <Board />
        </BoardProvider>
      </div>
    </>
  );

export default BoardPage;
