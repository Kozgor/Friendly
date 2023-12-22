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

  useEffect(() => {
    if (isColumnTitleInput) {
      if (inputTitleRef.current) {
        const inputElement = inputTitleRef.current?.querySelector('input');

        if (inputElement) {
          inputElement.focus();
        }
      }
    }

    if (isColumnSubtitleTextarea) {
      if (textareaSubtitleRef.current) {
        const textareaElement = textareaSubtitleRef.current?.querySelector('textarea');

        if (textareaElement) {
          textareaElement.focus();
        }
      }
    }
  }, [isColumnTitleInput, isColumnSubtitleTextarea]);

  const subtitleHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedColumns = columns.map((column) => {
      if (column.columnId === event.target.id) {
        column.columnSubtitle = event.target.value;
      }

      return column;
    });

    onUpdateColumns(updatedColumns);
  };

  const titleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedColumns = props.columns.map((column) => {
      if (column.columnId === event.target.id) {
        column.columnTitle = event.target.value;
      }

      return column;
    });

    onUpdateColumns(updatedColumns);
  };

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
                onChange={titleHandler}
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
            onChange={subtitleHandler}
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
