import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import BoardHeader from '../BoardHeader/BoardHeader';
import Column from '../Column/Column';

import { IBoardSettings } from '../../interfaces/boardSettings';

import { BoardContext } from '../../context/board/board-context';

import classes from './Board.module.scss';

const Board = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;
  const initSettings = {
    name: '',
    theme: '',
    timer: 0,
    columns: [],
    status: 'active'
  };
  const [boardSettings, setBoardSettings] =
    useState<IBoardSettings>(initSettings);
  const { setBoardId } = useContext(BoardContext);

  const getColumnData = async (boardId: string) => {
    try {
      const columns = await axios.post(`${FRIENDLY_DOMAIN}columns`, { boardId });

      return columns.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveBoard = async () => {
    try {
      const activeBoard = await axios.get(`${FRIENDLY_DOMAIN}boards/active`);

      return activeBoard.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeBoard = await getActiveBoard();

        setBoardId(activeBoard._id);

        if (activeBoard._id) {
          const columnsData = await getColumnData(activeBoard._id);

          for (const column of activeBoard.columns) {
            const { columnId } = column;

            if (columnsData[columnId]) {
              column.columnCards = columnsData[columnId];
            }
          }

          setBoardSettings(activeBoard);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [FRIENDLY_DOMAIN]);

  return (
    <div className={classes['board-container']}>
        <BoardHeader
          boardName={boardSettings.name}
          isTimerVisible={true}
          time={boardSettings.timer}
        />
        <main className={`container ${classes.board}`} data-testid='board'>
          {boardSettings?.columns.map((column) => (
            <Column
              key={column.columnId}
              columnId={column.columnId}
              columnTitle={column.columnTitle}
              columnSubtitle={column.columnSubtitle}
              columnStyle={column.columnStyle}
              columnAvatar={column.columnAvatar}
              columnCards={column.columnCards}
            />
          ))}
        </main>
    </div>
  );
};

export default Board;
