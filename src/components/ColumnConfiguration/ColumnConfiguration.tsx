import { ChangeEvent } from 'react';
import { Textarea } from '@mui/joy';

import { IColumn } from '../../interfaces/column';

import classes from './ColumnConfiguration.module.scss';

const ColumnConfiguration = (props: {
  columns: IColumn[];
  columnId: string;
  onUpdateColumns: (columns: IColumn[]) => void;
}) => {
  const column = props.columns.find((column) => column.columnId === props.columnId);
  const subtitleHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedColumns = props.columns.map((column) => {
      if (column.columnId === event.target.id) {
        column.columnSubtitle = event.target.value;
      }
      return column;
    });
    props.onUpdateColumns(updatedColumns);
  };

  return (
    <div className={classes.column}>
      <div className={classes['column__header']}>
        <h2>{column?.columnTitle}</h2>
        {/* <div className={classes['column__addIcon']}>
        <i className="bi bi-plus-circle"></i>
      </div> */}
        <Textarea
          className={classes['column__subtitle']}
          placeholder="Type column description here..."
          value={column?.columnSubtitle}
          onChange={subtitleHandler}
          slotProps={{
            textarea: {
              id: `${column?.columnId}`
            }
          }}
        />
      </div>
    </div>
  );
};

export default ColumnConfiguration;
