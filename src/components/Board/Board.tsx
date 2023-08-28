import BoardHeader from '../BoardHeader/BoardHeader';
import Column from '../Column/Column';
import { IBoardHeaderProps } from '../../interfaces/boardHeaderProps';
import { IColumn } from '../../interfaces/column';

import classes from './Board.module.scss';

import { ColumnContext } from '../../store/column-context';
import { useContext } from 'react';

const Board = (props: IBoardHeaderProps) => {
  const { isAddingDisabled } = useContext(ColumnContext);
  const mockColumnsValue: IColumn[] = [
    {
      columnId: 'start',
      columnTitle: 'Start',
      columnSubtitle: 'What our team should start doing.',
      columnAvatar: '',
      columnStyle: '',
      columnCards: [],
      isAddingDisabled: true
    },
    {
      columnId: 'stop',
      columnTitle: 'Stop',
      columnSubtitle: 'What our team should stop doing.',
      columnAvatar: '',
      columnStyle: '',
      columnCards: [],
      isAddingDisabled: true
    },
    {
      columnId: 'continue',
      columnTitle: 'Continue',
      columnSubtitle: 'What out team should keep doing.',
      columnAvatar: '',
      columnStyle: '',
      columnCards: [],
      isAddingDisabled: true
    }
  ];

  const columns = mockColumnsValue;

  return (
    <>
      <BoardHeader fullName={props.fullName} isTimerVisible={true} onSignOut={props.onSignOut} />
      <main className={classes.board} data-testid="board">
        {columns.map((column) => (
          <Column
            key={column.columnId}
            columnId={column.columnId}
            columnTitle={column.columnTitle}
            columnSubtitle={column.columnSubtitle}
            columnStyle={column.columnStyle}
            columnAvatar={column.columnAvatar}
            columnCards={column.columnCards}
            isAddingDisabled={isAddingDisabled}
          />
        ))}
      </main>
    </>
  );
};

export default Board;
