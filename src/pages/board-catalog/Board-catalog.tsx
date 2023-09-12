import Board from '../../components/Board/Board';
import { BoardProvider } from '../../context/board/board-context';

import classes from './Board-catalog.module.scss';

const BoardCatalog = () => (
    <>
      <div className={classes.boardCatalog}>
        <BoardProvider>
          <Board />
        </BoardProvider>
      </div>
    </>
  );

export default BoardCatalog;
