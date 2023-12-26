import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Input, Textarea } from '@mui/joy';
import { IColumn } from '../../interfaces/column';

import classes from './ColumnConfiguration.module.scss';
import { columnConfigurationPlaceholders } from '../../constants';

const ColumnConfiguration = (props: {
  columns: IColumn[];
  columnId: string;
  onUpdateColumns: (columns: IColumn[]) => void;
}) => {
  const { columns, columnId, onUpdateColumns } = props;
  const column = columns.find(column => column.columnId === columnId);
  const [isColumnTitleInput, setIsColumnTitleInput] = useState<boolean>(false);
  const [isColumnSubtitleTextarea, setIsColumnSubtitleTextarea] = useState<boolean>(false);
  const inputTitleRef = useRef<HTMLDivElement>(null);
  const textareaSubtitleRef = useRef<HTMLDivElement>(null);

  const setColumnInputFocus = () => {
    let currentInputElement;

    (isColumnTitleInput && inputTitleRef.current) ?
      currentInputElement = inputTitleRef.current?.querySelector('input') : null;

    (isColumnSubtitleTextarea && textareaSubtitleRef.current) ?
      currentInputElement = textareaSubtitleRef.current?.querySelector('textarea') : null;

    currentInputElement?.focus();
  };

  const columnInputHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, currentInputField: string
  ) => {
    const updatedColumns = columns.map((column) => {
      if (column.columnId === event.target.id) {
        column[currentInputField] = event.target.value;
      }

      return column;
    });

    onUpdateColumns(updatedColumns);
  };

  useEffect(() => {
    setColumnInputFocus();
  }, [isColumnTitleInput, isColumnSubtitleTextarea]);

  return (
    <div className={classes.column}>
      <div className={classes.columnHeader}>
        <div>
          <h2 data-testid='title'>
            {!isColumnTitleInput ? (
              <p
                className={classes.columnHeaderTitle}
                onClick={() => { setIsColumnTitleInput(!isColumnTitleInput); } }
              >
                {column?.columnTitle}
              </p>
            ) :
              <Input
                ref={inputTitleRef}
                placeholder={columnConfigurationPlaceholders.inputTitle[columnId]}
                value={column?.columnTitle}
                onChange={(event) => columnInputHandler(event, 'columnTitle')}
                slotProps={{
                  input: {
                    id: `${column?.columnId}`,
                    onBlur: () => setIsColumnTitleInput(!isColumnTitleInput)
                  }
                }}
                sx={{
                  border: 'none',
                  backgroundColor: 'var(--friendly-palette-shades-50)',
                  boxShadow: 'none',
                  width: 'calc (100% - 20px)'
                }}
              />
            }
          </h2>
        </div>
        <div>
        {!isColumnSubtitleTextarea ? (
          <p
            className={classes.columnHeaderSubtitle}
            onClick={() => setIsColumnSubtitleTextarea(!isColumnSubtitleTextarea)}
          >
            {column?.columnSubtitle}
          </p>) :
          <Textarea
            ref={textareaSubtitleRef}
            placeholder={columnConfigurationPlaceholders.textareaSubtitle}
            value={column?.columnSubtitle}
            onChange={(event) => columnInputHandler(event, 'columnSubtitle')}
            maxRows={1}
            slotProps={{
              textarea: {
                id: `${column?.columnId}`,
                onBlur: () => setIsColumnSubtitleTextarea(!isColumnSubtitleTextarea)
              }
            }}
            data-testid="subtitle"
            sx={{
              border: 'none',
              backgroundColor: 'var(--friendly-palette-shades-50)',
              boxShadow: 'none',
              width: 'calc (100% - 20px)'
            }}
          />
        }
        </div>
      </div>
    </div>
  );
};

export default ColumnConfiguration;
