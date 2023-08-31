import BoardHeader from '../BoardHeader/BoardHeader';
import Column from '../Column/Column';
import { IBoardHeaderProps } from '../../interfaces/boardHeaderProps';
import { IColumn } from '../../interfaces/column';

import classes from './Board.module.scss';

const Board = (props: IBoardHeaderProps) => {
  const mockColumnsValue: IColumn[] = [
    {
      id: 'start',
      title: 'Start',
      subtitle: 'What our team should start doing.',
      avatar: '',
      style: '',
      cards: []
    },
    {
      id: 'stop',
      title: 'Stop',
      subtitle: 'What our team should stop doing.',
      avatar: '',
      style: '',
      cards: []
    },
    {
      id: 'continue',
      title: 'Continue',
      subtitle: 'What out team should keep doing.',
      avatar: '',
      style: '',
      cards: []
    }
  ];

  const columns = mockColumnsValue;

  return (
    <>
      <BoardHeader fullName={props.fullName} isTimerVisible={true} onSignOut={props.onSignOut} />
      <main className={classes.board} data-testid="board">
        {columns.map((column) => (
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
    </>
  );
};

export default Board;
