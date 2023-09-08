import { MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';

import BoardHeader from '../BoardHeader/BoardHeader';
import Column from '../Column/Column';
import { IBoardSettings } from '../../interfaces/boardSettings';

import { BoardProvider } from '../../context/board/board-context';

import classes from './Board.module.scss';

const Board = (props: {
  fullName: string;
  onSignOut: MouseEventHandler<HTMLButtonElement>;
}) => {
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
  useEffect(() => {
    try {
      axios.get(`${FRIENDLY_DOMAIN}boards/active`).then((res) => {
        setBoardSettings(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [FRIENDLY_DOMAIN]);

  return (
    <div className={classes['board-container']}>
      <BoardProvider>
        <BoardHeader
          fullName={props.fullName}
          boardName={boardSettings.name}
          isTimerVisible={true}
          time={boardSettings.timer}
          onSignOut={props.onSignOut}
        />
        <main className={classes.board} data-testid="board">
          {boardSettings?.columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              subtitle={column.subtitle}
              style={column.style}
              avatar={column.avatar}
              cards={column.cards}
            />
          ))}
        </main>
      </BoardProvider>
    </div>
  );
};

export default Board;
