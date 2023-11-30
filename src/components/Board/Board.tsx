/* eslint-disable complexity */
import {
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router';

import { NO_BOARDS_MESSAGE, possibleBoardStatuses } from '../../constants';
import { BoardContext } from '../../context/board/boardContext';
import { CircularProgress } from '@mui/joy';
import { IBoardSettings } from '../../interfaces/boardSettings';
import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';
import { INITIAL_BOARD } from '../../mocks/board';

import { ICurrentBoardDetails, IUserProfile } from '../../interfaces/user';
import { boardAPI } from '../../api/BoardAPI';
import { columnAPI } from '../../api/ColumnAPI';
import { isNull } from 'lodash';
import { localStorageManager } from '../../utils/localStorageManager';
import { userAPI } from '../../api/UserAPI';

import Column from '../Column/Column';
import NoContent from '../NoContent/NoContent';
import useBoardIdLocation from '../../utils/useBoardIdLocation';

import classes from './Board.module.scss';

const Board = () => {
  const [boardSettings, setBoardSettings] = useState<IBoardSettings>(INITIAL_BOARD);
  const [isLoading, setIsLoading] = useState(false);
  const [isBoardVisible, setIsBoardVisible] = useState(true);
  const {
    boardStatus,
    isFormSubmit,
    setBoardStatus,
    setBoardId,
    setBoardTime,
    setTimerVisibility
  } = useContext(BoardContext);
  const navigate = useNavigate();
  const { getLocalUserData, saveLocalBoardDetails } = localStorageManager();
  const { getFinalColumnCards, getUserColumnCards } = columnAPI();
  const { getBoardById } = boardAPI();
  const { getUserById } = userAPI();
  const localUser = getLocalUserData();
  const isBoard = (isBoardVisible && !isFormSubmit && !isLoading);
  const isNoBoard = (!isLoading && !isBoardVisible || isFormSubmit);
  const URLBoardId= useBoardIdLocation();
  const layoutHeight = localUser.role === 'admin' ? '80vh': '90vh';

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
    try {
      const board: IBoardSettings | undefined = await getBoardById(URLBoardId);

      if ((board && board?.status === status) || (board && localUser.role === 'admin')) {
        let columnsCards: IColumnCard[] | undefined;
        const currentBoard: ICurrentBoardDetails = {
          currentBoardId: board._id,
          currentBoardName: board.name
        };

        saveLocalBoardDetails(currentBoard);

        if (board.status === possibleBoardStatuses.active) {
          if (status === possibleBoardStatuses.finalized && localUser.role === 'admin' && URLBoardId === board._id) {
            setIsBoardVisible(false);
            setTimerVisibility(false);

            return;
          }
          columnsCards = await fetchUserColumnCards(URLBoardId, localUser._id);
          setTimerVisibility(true);
        } else {
          columnsCards = await fetchFinalColumnCards(URLBoardId);
          setTimerVisibility(false);
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
        setBoardTime(board.timer);
        setIsBoardVisible(true);
      } else {
        setIsBoardVisible(false);
        setTimerVisibility(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);

    try {
      const userProfile: IUserProfile | undefined = await getUserById(localUser._id);

      if (!URLBoardId && userProfile && userProfile.boards) {
        navigate(`/board/${userProfile.boards.finalized || userProfile.boards.active}`);

        return;
      }

      if (userProfile && userProfile.boards) {
        if (!isNull(userProfile.boards.active)) {
          setupBoard(userProfile.boards.active, possibleBoardStatuses.active);

          return;
        }

        if (!isNull(userProfile.boards.finalized)) {
          setupBoard(userProfile.boards.finalized, possibleBoardStatuses.finalized);

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
  }, [boardStatus, URLBoardId]);

  return (
    <div className={classes['board-container']}>
      <div className={classes.board} style={{ height: layoutHeight }} data-testid='board'>
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
      </div>
    </div>
  );
};

export default Board;
