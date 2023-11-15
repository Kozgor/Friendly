import {
  useContext,
  useEffect,
  useState
} from 'react';
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
import { userAPI } from '../../api/UserAPI';

import { NO_BOARDS_MESSAGE, possibleBoardStatuses } from '../../constants';

import { isNull } from 'lodash';

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
  const { getUserById } = userAPI();
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

  const setupBoard = async (id: string, status?: string) => {
    if (id !== URLBoardId && user.role !== 'admin') {
      setIsTimerVisible(false);
      setIsBoardVisible(false);

      return;
    }

    try {
      const board: IBoardSettings | undefined = await getBoardById(URLBoardId);

      if (board && board?.status === status) {
        let columnsCards: IColumnCard[] | undefined;

        if (board.status === possibleBoardStatuses.active) {
          columnsCards = await fetchUserColumnCards(URLBoardId, user._id);
          setIsTimerVisible(true);
        } else {
          columnsCards = await fetchFinalColumnCards(URLBoardId);
          setIsTimerVisible(false);
        }

        board.columns.forEach((column: IColumn) => {
          const { columnId } = column;

          if (columnsCards && columnsCards[columnId]) {
            column.columnCards = columnsCards[columnId];
          }
        });

        setBoardId(URLBoardId);
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
  };

  const fetchUserData = async () => {
    setIsLoading(true);

    try {
      const userProfile: IUserProfile | undefined = await getUserById(user._id);

      if (userProfile && userProfile.boards) {
        if (userProfile && userProfile.boards && !isNull(userProfile.boards.active)) {
          setupBoard(userProfile.boards.active, possibleBoardStatuses.active);
          setIsLoading(false);

          return;
        }

        if (userProfile && userProfile.boards && !isNull(userProfile.boards.finalized)) {
          setupBoard(userProfile.boards.finalized, possibleBoardStatuses.finalized);
          setIsLoading(false);

          return;
        }
      }
    } catch (error){
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [boardStatus]);

  return (
    <div className={classes['board-container']}>
      <BoardHeader
        boardName={boardSettings.name}
        isTimerVisible={isTimerVisible}
        time={boardSettings.timer}
      />
      <main className={classes.board} data-testid='board'>
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
