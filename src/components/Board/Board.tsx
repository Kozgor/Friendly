import { useContext, useEffect, useState } from 'react';

import BoardHeader from '../BoardHeader/BoardHeader';
import Column from '../Column/Column';

import { IBoardSettings } from '../../interfaces/boardSettings';
import { INITIAL_BOARD } from '../../mocks/board';

import { BoardContext } from '../../context/board/board-context';
import { localStorageManager } from '../../utils/localStorageManager';

import { boardAPI } from '../../api/BoardAPI';
import { columnAPI } from '../../api/ColumnAPI';
import { userAPI } from '../../api/UserAPI';

import { possibleBoardStatuses } from '../../constants';

import { isNull } from 'lodash';

import classes from './Board.module.scss';

const Board = () => {
  const [boardSettings, setBoardSettings] = useState<IBoardSettings>(INITIAL_BOARD);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [isBoardVisible, setIsBoardVisible] = useState(false);
  const { boardStatus, isFormSubmit, setBoardId, setBoardStatus } = useContext(BoardContext);
  const { getLocalUserData } = localStorageManager();
  const { getFinalColumnCards, getUserColumnCards } = columnAPI();
  const { getActiveBoard, getFinalizedBoard } = boardAPI();
  const { getUserById } = userAPI();
  const user = getLocalUserData();

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

  const setUpActiveBoard = async () => {
    try {
      const activeBoard = await getActiveBoard();

      if (activeBoard && activeBoard._id) {
        const columnsData = await fetchUserColumnCards(activeBoard._id, user._id);

        setBoardStatus(activeBoard.status);

        activeBoard.columns.forEach((column) => {
          const { columnId } = column;

          if (columnsData && columnsData[columnId]) {
            column.columnCards = columnsData[columnId];
          }
        });

        setBoardId(activeBoard._id);
        setBoardSettings(activeBoard);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setUpFinalizedBoard = async () => {
    try {
      const finalizedBoard = await getFinalizedBoard();

      if (finalizedBoard && finalizedBoard._id) {
        const columnsData = await fetchFinalColumnCards(finalizedBoard._id);

        setBoardStatus(finalizedBoard.status);

        finalizedBoard.columns.forEach((column) => {
          const { columnId } = column;

          if (columnsData && columnsData[columnId]) {
            column.columnCards = columnsData[columnId];
          }
        });

        setBoardId(finalizedBoard._id);
        setBoardSettings(finalizedBoard);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setSessionVisibility = (userSettings: any) => {
    if (!isNull(userSettings.boards.active)) {
      setUpActiveBoard();
      setIsTimerVisible(true);
      setIsBoardVisible(true);

      if (!boardStatus) {
        setIsBoardVisible(false);
      }
    }

    else {
      setUpFinalizedBoard();
      boardStatus === possibleBoardStatuses.finalized ?
        setIsBoardVisible(true) : setIsBoardVisible(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const currentUserSetting = await getUserById(user._id);

      setSessionVisibility(currentUserSetting);
    } catch (error){
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [boardStatus, isFormSubmit]);

  return (
    <div className={classes['board-container']}>
      <BoardHeader
        boardName={boardSettings.name}
        isTimerVisible={isTimerVisible}
        time={boardSettings.timer}
      />
      <main className={`container ${classes.board}`} data-testid='board'>
        {(isBoardVisible && !isFormSubmit) &&
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
        {(isFormSubmit || !isBoardVisible) &&
          <div>
            <h2>No active board</h2>
          </div>
        }
      </main>
    </div>
  );
};

export default Board;
