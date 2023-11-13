import {
  useContext,
  useEffect,
  useState
} from 'react';
import { useParams } from 'react-router-dom';

import { CircularProgress } from '@mui/joy';

import { IBoardSettings } from '../../interfaces/boardSettings';
import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';
import { IUserProfile } from '../../interfaces/user';

import { INITIAL_BOARD } from '../../mocks/board';

import { BoardContext } from '../../context/board/boardContext';
import { localStorageManager } from '../../utils/localStorageManager';

import { boardAPI } from '../../api/BoardAPI';
import { columnAPI } from '../../api/ColumnAPI';

import { NO_BOARDS_MESSAGE, possibleBoardStatuses } from '../../constants';

import BoardHeader from '../BoardHeader/BoardHeader';
import Column from '../Column/Column';
import NoContent from '../NoContent/NoContent';
import useBoardIdLocation from '../../utils/useBoardIdLocation';

import classes from './Board.module.scss';

const Board = () => {
  const [boardSettings, setBoardSettings] = useState<IBoardSettings>(INITIAL_BOARD);
  const [isLoading, setIsLoading] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [isBoardVisible, setIsBoardVisible] = useState(true);
  const { boardStatus, isFormSubmit, setBoardStatus, setBoardId } = useContext(BoardContext);
  const { getLocalUserData } = localStorageManager();
  const { getFinalColumnCards, getUserColumnCards } = columnAPI();
  const { getBoardById } = boardAPI();
  const user = getLocalUserData();
  const isBoard = (isBoardVisible && !isFormSubmit && !isLoading);
  const isNoBoard = (!isLoading && !isBoardVisible || isFormSubmit);
  const URLBoardId= useBoardIdLocation();

  const fetchUserColumnCards = async (boardId: string, userId: string) => {
    try {
      const columnsData = await getUserColumnCards(boardId, userId);

      return columnsData;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFinalColumnCards = async (boardId: string) => {
    try {
      const columnsData = await getFinalColumnCards(boardId);

      return columnsData;
    } catch (error) {
      console.log(error);
    }
  };

  const setupBoard = async (id: string) => {
    setIsLoading(true);

    try {
      const board: IBoardSettings | undefined = await getBoardById(id);

      if (board && board.participants.includes(user.email)) {
        let columnsCards: IColumnCard[] | undefined;

        if (board.status === possibleBoardStatuses.active) {
          columnsCards = await fetchUserColumnCards(id, user._id);
          setIsTimerVisible(true);
        } else {
          columnsCards = await fetchFinalColumnCards(id);
          setIsTimerVisible(false);
        }

        board.columns.forEach((column: IColumn) => {
          const { columnId } = column;

          if (columnsCards && columnsCards[columnId]) {
            column.columnCards = columnsCards[columnId];
          }
        });

        setBoardId(id);
        setBoardSettings(board);
        setBoardStatus(board.status);
        setIsBoardVisible(true);
      } else {
        setIsTimerVisible(false);
        setIsBoardVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('URLBoardId', URLBoardId);
    setupBoard(URLBoardId);
  }, [boardStatus]);

  return (
    <div className={classes['board-container']}>
      <BoardHeader
        boardName={boardSettings.name}
        isTimerVisible={isTimerVisible}
        time={boardSettings.timer}
      />
      <main className={`container ${classes.board}`} data-testid='board'>
        {isBoard &&
          boardSettings?.columns.map((column) => (
            <Column
              key={column.columnId}
              columnId={column.columnId}
              columnTitle={column.columnTitle}
              columnSubtitle={column.columnSubtitle}
              columnStyle={column.columnStyle}
              columnAvatar={column.columnAvatar}
              columnCards={column.columnCards}
            />
          ))
        }
        {isNoBoard &&
          <NoContent message={NO_BOARDS_MESSAGE} />
        }
        {isLoading &&
          <div>
            <CircularProgress
              color="primary"
              size="md"
              variant="soft"
            />
          </div>
        }
      </main>
    </div>
  );
};

export default Board;
