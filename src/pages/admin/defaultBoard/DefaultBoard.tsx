import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import { toast } from 'react-toastify';

import ColumnConfiguration from '../../../components/ColumnConfiguration/ColumnConfiguration';
import { IBoardSettings } from '../../../interfaces/boardSettings';
import { IColumn } from '../../../interfaces/column';
import Toastr from '../../../components/Toastr/Toastr';

import classes from './DefaultBoard.module.scss';

const DefaultBoard = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;
  const navigate = useNavigate();

  const initColumns = [
    {
      columnId: 'start',
      columnTitle: 'START',
      columnSubtitle: '',
      columnAvatar: '',
      columnStyle: '',
      columnCards: []
    },
    {
      columnId: 'stop',
      columnTitle: 'STOP',
      columnSubtitle: '',
      columnAvatar: '',
      columnStyle: '',
      columnCards: []
    },
    {
      columnId: 'continue',
      columnTitle: 'CONTINUE',
      columnSubtitle: '',
      columnAvatar: '',
      columnStyle: '',
      columnCards: []
    }
  ];
  const [columns, setColumns] = useState<IColumn[]>(initColumns);
  const initialSettingsValue = {
    name: 'RETROSPECTIVE',
    theme: 'NEUTRAL',
    timer: 15,
    columns: columns,
    status: 'active'
  };
  const [boardSettings, setBoardSettings] =
    useState<IBoardSettings>(initialSettingsValue);

  const boardNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBoardSettings((prevState) => ({
      ...prevState,
      name: event.target.value
    }));
  };

  const boardSettingsCollection = [
    {
      key: 'name',
      label: 'Board Name:',
      type: 'input',
      value: boardSettings.name,
      disabled: false,
      onChange: boardNameHandler,
      placeholder: 'Please enter board name...'
    },
    {
      key: 'theme',
      label: 'Theme:',
      type: 'input',
      value: boardSettings.theme,
      disabled: true,
      onChange: () => {},
      placeholder: 'Please choose board theme...'
    },
    {
      key: 'timer',
      label: 'Timer (min):',
      type: 'number',
      value: boardSettings.timer,
      disabled: true,
      onChange: () => {},
      placeholder: 'Please enter board timer...'
    }
  ];

  const columnsUpdateHandler = (updatedColumns: IColumn[]) => {
    setColumns(updatedColumns);
  };

  const publishSettings = () => {
    axios
      .post(`${FRIENDLY_DOMAIN}boards/new-board`, boardSettings)
      .then(() => {
        navigate('/admin');
        toast.success(
          <Toastr
            itemName={boardSettings.name}
            message="board was successfully published. Now your team can play with it"
          />
        );
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <Box
      component="section"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        padding: 3,
        paddingRight: 5,
        marginLeft: 0
      }}
    >
      <div className={classes.navbar}>
        <Breadcrumbs aria-label="breadcrumbs" separator="<" data-testid="breadcrumbs">
          <Link className={classes.link} to="/admin" data-testid="backLink">
            Back
          </Link>
          <Typography component="h3" data-testid="defaultTitle">Default Board</Typography>
        </Breadcrumbs>
        <Button
          color="neutral"
          variant="solid"
          type="button"
          aria-label="solid neutral button for publishing the board"
          onClick={publishSettings}
          data-testid="publishButton"
        >
          Publish
        </Button>
      </div>
      <form className={classes.boardSettings}>
        {boardSettingsCollection.map((setting) => (
          <div key={setting.key} className={classes[setting.key]}>
            <label htmlFor={setting.key}>{setting.label}</label>
            <Input
              className={classes.input}
              id={setting.key}
              type={setting.type}
              placeholder={setting.placeholder}
              value={setting.value}
              onChange={setting.onChange}
              disabled={setting.disabled}
              aria-label={`input for ${setting.label}`}
              data-testid="boardSetting"
            />
          </div>
        ))}
        <div className={classes.columnsBox}>
          <p>Columns:</p>
          <section className={classes.columns} data-testid="boardColumns">
            {initialSettingsValue.columns.map((column) => (
              <ColumnConfiguration
                key={column.columnId}
                columnId={column.columnId}
                columns={columns}
                onUpdateColumns={columnsUpdateHandler}
              />
            ))}
          </section>
        </div>
      </form>
    </Box>
  );
};

export default DefaultBoard;
