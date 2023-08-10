import { IBoardHeaderProps } from '../../interfaces/boardHeaderProps';
import BoardHeader from '../BoardHeader/BoardHeader';
import Column from '../Column/Column';

import classes from './Board.module.scss';
import { IColumn } from '../../interfaces/column';

const Board = (props: IBoardHeaderProps) => {
  const mockColumnsValue: IColumn[] = [
    {
      columnId: 'start',
      columnTitle: 'Start',
      columnSubtitle: 'What our team should start doing.',
      columnAvatar: '',
      columnColor: '',
      columnCards: []
    },
    {
      columnId: 'stop',
      columnTitle: 'Stop',
      columnSubtitle: 'What our team should stop doing.',
      columnAvatar: '',
      columnColor: '',
      columnCards: []
    },
    {
      columnId: 'continue',
      columnTitle: 'Continue',
      columnSubtitle: 'What out team should keep doing.',
      columnAvatar: '',
      columnColor: '',
      columnCards: []
    }
  ];

  const columns = mockColumnsValue;

  return (
    <>
      <BoardHeader fullName={props.fullName} onSignOut={props.onSignOut} />
      <main className={classes.board}>
        {columns.map((column) => (
          <Column
            key={column.columnId}
            columnId={column.columnId}
            columnTitle={column.columnTitle}
            columnSubtitle={column.columnSubtitle}
            columnColor={column.columnColor}
            columnAvatar={column.columnAvatar}
            columnCards={column.columnCards} />
        ))}
      </main>
    </>
  );
};

export default Board;
