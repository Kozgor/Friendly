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

  useEffect(() => {
    try {
      axios.get(`${FRIENDLY_DOMAIN}boards/active`).then((res) => {
        setBoardSettings(res.data);
        setBoardId(res.data._id);
      });
    } catch (err) {
      console.log(err);
    }
  }, [FRIENDLY_DOMAIN]);

  return (
    <div className={classes['board-container']}>
        <BoardHeader
          boardName={boardSettings.name}
          isTimerVisible={true}
          time={boardSettings.timer}
        />
        <main className={`container ${classes.board}`} data-testid="board">
          {boardSettings?.columns.map((column) => (
            <Column
              key={column.columnId}
              columnId={column.columnId}
              columnTitle={column.columnTitle}
              columnSubtitle={column.columnSubtitle}
              columnStyle={column.columnStyle}
              columnAvatar={column.columnAvatar}
              // columnCards={column.columnCards}
            />
          ))}
        </main>
    </div>
  );
};

export default Board;
