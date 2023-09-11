import { MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';

import BoardHeader from '../BoardHeader/BoardHeader';
import Column from '../Column/Column';
import { IBoardSettings } from '../../interfaces/boardSettings';

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
    <>
      <BoardHeader
        fullName={props.fullName}
        boardName={boardSettings.name}
        isTimerVisible={true}
        time={boardSettings.timer}
        onSignOut={props.onSignOut}
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
            columnCards={column.columnCards}
          />
        ))}
      </main>
    </>
  );
};

export default Board;
