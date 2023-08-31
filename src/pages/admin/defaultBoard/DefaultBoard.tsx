import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import axios from 'axios';

import ColumnConfiguration from '../../../components/ColumnConfiguration/ColumnConfiguration';
import { IBoardSettings } from '../../../interfaces/boardSettings';
import { IColumn } from '../../../interfaces/column';

import classes from './DefaultBoard.module.scss';

const DefaultBoard = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;
  const navigate = useNavigate();

  const initColumns = [
    {
      id: 'start',
      title: 'START',
      subtitle: '',
      avatar: '',
      style: '',
      cards: []
    },
    {
      id: 'stop',
      title: 'STOP',
      subtitle: '',
      avatar: '',
      style: '',
      cards: []
    },
    {
      id: 'continue',
      title: 'CONTINUE',
      subtitle: '',
      avatar: '',
      style: '',
      cards: []
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

  const publishSettings = async () => {
    console.log(boardSettings);
    try {
      // const response = await axios.post(`${FRIENDLY_DOMAIN}boards/new-board`, {boardSettings});

      navigate('/admin');
    } catch (error) {
      return error;
    }
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
        <Breadcrumbs aria-label="breadcrumbs" separator="<">
          <Link className={classes.link} to="/admin">
            Back
          </Link>
          <Typography component="h3">Default Board</Typography>
        </Breadcrumbs>
        <Button
          color="neutral"
          variant="solid"
          type="button"
          aria-label="publish the board"
          onClick={publishSettings}
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
            />
          </div>
        ))}
        <div className={classes.columnsBox}>
          <p>Columns:</p>
          <section className={classes.columns}>
            {initialSettingsValue.columns.map((column) => (
              <ColumnConfiguration key={column.id} columnId={column.id} columns={columns} onUpdateColumns={columnsUpdateHandler} />
            ))}
          </section>
        </div>
      </form>
    </Box>
  );
};

export default DefaultBoard;
