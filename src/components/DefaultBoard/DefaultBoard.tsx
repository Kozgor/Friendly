import axios from 'axios';
import { toast } from 'react-toastify';

import { useContext, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import { BoardContext } from '../../context/board/boardContext';
import ColumnConfiguration from '../ColumnConfiguration/ColumnConfiguration';
import { IBoardSettings } from '../../interfaces/boardSettings';
import { IColumn } from '../../interfaces/column';
import { INITIAL_COLUMNS } from './DeafaultColumns';
import Toastr from '../Toastr/Toastr';

import { numericFormatAdapter } from '../../utils/numericFormatAdapter';

import { InputLabel } from '@mui/material';

import Participants from '../Participants/Participants';

import classes from './DefaultBoard.module.scss';
import { userAPI } from '../../api/UserAPI';

const DefaultBoard = () => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;
  const navigate = useNavigate();
  const { setBoardId } = useContext(BoardContext);
  const { getAllUsers } = userAPI();
  const [names, setNames] = useState<string[]>([]);
  const [columns, setColumns] = useState<IColumn[]>(INITIAL_COLUMNS);
  const initialSettingsValue = {
    name: 'RETROSPECTIVE',
    theme: 'NEUTRAL',
    timer: 15,
    participants: [],
    columns: columns,
    status: 'active'
  };
  const [boardSettings, setBoardSettings] =
    useState<IBoardSettings>(initialSettingsValue);

  const boardNameHandler = (event: any) => {
    setBoardSettings((prevState) => ({
      ...prevState,
      name: event.target.value
    }));
  };

  const boardTimerHandler = (event: any) => {
    setBoardSettings((prevState) => ({
      ...prevState,
      timer: parseInt(event.target.value, 10) || 0
    }));
  };

  const boardParticipantsHandler = (partisipants: any) => {
    setBoardSettings((prevState) => ({
      ...prevState,
      participants: partisipants
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
      disabled: false,
      onChange: boardTimerHandler,
      placeholder: 'Please enter board timer...'
    },
    {
      key: 'participants',
      label: 'Participants:',
      type: 'select',
      value: boardSettings.participants,
      disabled: false,
      onChange: boardParticipantsHandler,
      placeholder: 'Please select participants...'
    }
  ];

  const columnsUpdateHandler = (updatedColumns: IColumn[]) => {
    setColumns(updatedColumns);
  };

  const publishSettings = () => {
    axios
      .post(`${FRIENDLY_DOMAIN}boards/new-board`, boardSettings)
      .then((board: any) => {
        navigate('/admin');
        toast.success(
          <Toastr
            itemName={boardSettings.name}
            message="board was successfully published. Now your team can play with it"
          />
        );
        setBoardId(board.data._id);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        const allUserNames = allUsers?.map(user => user.email) || [];

        setNames(allUserNames || []);
        console.log(allUserNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

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
            <InputLabel id={setting.key}>{setting.label}</InputLabel>
            {setting.key === 'timer'&&
              <Input
                className={classes.input}
                id={setting.key}
                type={setting.type}
                placeholder={setting.placeholder}
                value={setting.value}
                onChange={setting.onChange}
                disabled={setting.disabled}
                aria-label={`input for ${setting.label}`}
                data-testid={`boardSetting${setting.key}`}
                slotProps={{
                  input: {
                    component: numericFormatAdapter
                  }
                }}
              />
            }
            {setting.key === 'theme'&&
              <Input
                className={classes.input}
                id={setting.key}
                type={setting.type}
                placeholder={setting.placeholder}
                value={setting.value}
                onChange={setting.onChange}
                disabled={true}
                aria-label={`input for ${setting.label}`}
                data-testid={`boardSetting${setting.key}`}
              />
            }
            {(setting.key === 'name')&&
              <Input
                className={classes.input}
                id={setting.key}
                type={setting.type}
                placeholder={setting.placeholder}
                value={setting.value}
                onChange={setting.onChange}
                disabled={setting.disabled}
                aria-label={`input for ${setting.label}`}
                data-testid={`boardSetting${setting.key}`}
              />
            }
            {setting.key === 'participants' &&
              <div className={classes.input}>
                <Participants
                  participants={names}
                  collectParticipants={setting.onChange}
                />
              </div>
            }
          </div>
        ))
        }
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
