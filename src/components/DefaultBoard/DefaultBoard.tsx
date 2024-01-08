/* eslint-disable max-lines */
import moment from 'moment';

import {
  Box,
  Button,
  Input
} from '@mui/joy';
import { useContext, useEffect, useState } from 'react';

import { BOARD_PUBLISH_MESSAGE, CREATE_NEW_BOARD_ERROR_MESSAGE, CREATION_ERROR, GET_ALL_USERS_ERROR_MESSAGE, panelTitles } from '../../constants';
import { BoardContext } from '../../context/board/boardContext';
import ColumnConfiguration from '../ColumnConfiguration/ColumnConfiguration';
import { IBoardSettings } from '../../interfaces/boardSettings';
import { IColumn } from '../../interfaces/column';
import { INITIAL_COLUMNS } from './DeafaultColumns';
import InteractivePanel from '../InteractivePanel/InteractivePanel';
import Participants from '../Participants/Participants';
import { PropsChildren } from '../../interfaces/interactivePanelChildren';
import Toastr from '../Toastr/Toastr';
import { boardAPI } from '../../api/BoardAPI';
import { numericFormatAdapter } from '../../utils/numericFormatAdapter';
import { pathConstants } from '../../router/pathConstants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../api/UserAPI';

import classes from './DefaultBoard.module.scss';

const DefaultBoard = () => {
  const navigate = useNavigate();
  const { setBoardId } = useContext(BoardContext);
  const { getAllUsers } = userAPI();
  const { createNewBoard } = boardAPI();
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [participantsList, setParticipantsList] = useState<any[]>([]);
  const [columns, setColumns] = useState<IColumn[]>(INITIAL_COLUMNS);
  const initialSettingsValue = {
    name: 'RETROSPECTIVE',
    theme: 'NEUTRAL',
    timer: 15,
    participants: [],
    columns: columns,
    status: 'active',
    createdAt: moment().toISOString()
  };
  const [boardSettings, setBoardSettings] = useState<IBoardSettings>(initialSettingsValue);

  const boardNameHandler = (event: any) => {
    setBoardSettings(prevState => ({
      ...prevState,
      name: event.target.value
    }));
  };

  const boardTimerHandler = (event: any) => {
    setBoardSettings((prevState) => ({
      ...prevState,
      timer: parseInt(event.target.value, 10) || 1
    }));
  };

  const boardParticipantsHandler = (partisipants: any) => {
    setBoardSettings(prevState => ({
      ...prevState,
      participants: partisipants
    }));
  };

  const boardSettingsCollection = [{
    key: 'name',
    label: 'Board Name',
    type: 'input',
    value: boardSettings.name,
    disabled: false,
    onChange: boardNameHandler,
    placeholder: 'Please enter board name...'
  }, {
    key: 'timer',
    label: 'Timer (min)',
    type: 'number',
    value: boardSettings.timer,
    disabled: false,
    onChange: boardTimerHandler,
    placeholder: 'Please enter board timer...'
  }, {
    key: 'participants',
    label: 'Participants',
    type: 'select',
    value: boardSettings.participants,
    disabled: false,
    onChange: boardParticipantsHandler,
    placeholder: 'Please select participants...'
  }];

  const columnsUpdateHandler = (updatedColumns: IColumn[]) => {
    setColumns(updatedColumns);
  };

  const publishSettings = async () => {
    if (isCreatingBoard) {
      return;
    }

    setIsCreatingBoard(true);
    try {
      const board = await createNewBoard(boardSettings);
      navigate('/admin');
      toast.success(
        <Toastr
          itemName={boardSettings.name}
          message={BOARD_PUBLISH_MESSAGE}
        />
      );
      setBoardId(board._id!);
    } catch (err) {
      toast.error(
        <Toastr
          itemName={CREATION_ERROR}
          message={CREATE_NEW_BOARD_ERROR_MESSAGE}
        />
      );
    }
    setIsCreatingBoard(false);
  };

  const childrenConfig: PropsChildren[] = [
    {
      path: pathConstants.ADMIN_NEW_BOARD,
      position: 'left',
      label: panelTitles.defaultBoard
    },
    {
      element:
        <Button
          role='button'
          color='secondary'
          variant="solid"
          type="button"
          aria-label="solid neutral button for publishing the board"
          onClick={publishSettings}
          data-testid="publishButton"
          sx={{
            backgroundColor: 'var(--friendly-palette-secondary-900)',
            color: 'var(--friendly-palette-shades-50)'
          }}
        >
          Publish
        </Button>,
      position: 'right'
    }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        if (allUsers) {
          const participants = allUsers.map(participant => ({
            fullName: participant.fullName,
            email: participant.email
          }));

          setParticipantsList(participants);
        }
      } catch (error) {
        toast.error(
          <Toastr
            itemName={'Error'}
            message={GET_ALL_USERS_ERROR_MESSAGE}
          />
        );
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={classes.boardSettingContainer}>
      <InteractivePanel childrenConfig={childrenConfig}></InteractivePanel>
      <Box
        component="section"
        sx={{
          flexGrow: 1,
          bgcolor: 'var(--friendly-palette-neutral-50)',
          marginLeft: 0,
          height: 'calc(100% - 22px)'
        }}
      >
        <div className={classes.boardSettings} aria-description='board settings'>
          <form role='form' className={classes.boardSettingsForm}>
            {boardSettingsCollection.map(setting => (
              <div key={setting.key} className={classes[setting.key]}>
                <div className={classes.boardSettingLabels}>
                  <label
                    className={classes.label}
                    htmlFor={setting.key}
                    aria-label={setting.label}
                  >
                    {setting.label}
                  </label>
                </div>
                <div className={classes.boardSettingInputs}>
                  {setting.key === 'timer' &&
                    <Input
                      className={classes.input}
                      id={setting.key}
                      type={setting.type}
                      placeholder={setting.placeholder}
                      aria-placeholder={setting.placeholder}
                      value={setting.value}
                      aria-valuetext={`${setting.value}`}
                      onChange={setting.onChange}
                      disabled={setting.disabled}
                      aria-disabled={setting.disabled}
                      aria-label={`input for ${setting.label}`}
                      data-testid={`boardSetting${setting.key}`}
                      slotProps={{
                        input: { component: numericFormatAdapter }
                      }}
                      sx={{
                        '--Input-radius': '0px',
                        '&::before': {
                          border: '1px solid var(--friendly-palette-primary-700)',
                          transform: 'scaleX(0)',
                          left: 0,
                          right: 0,
                          bottom: '-1px',
                          top: 'unset',
                          transition: 'transform 1s cubic-bezier(0.1,0.9,0.2,1)'
                        },
                        '&:focus-within::before': {
                          transform: 'scaleX(1)'
                        }
                      }}
                    />
                  }
                  {(setting.key === 'name') &&
                    <Input
                      className={classes.input}
                      id={setting.key}
                      type={setting.type}
                      placeholder={setting.placeholder}
                      aria-placeholder={setting.placeholder}
                      value={setting.value}
                      aria-valuetext={`${setting.value}`}
                      onChange={setting.onChange}
                      disabled={setting.disabled}
                      aria-disabled={setting.disabled}
                      aria-label={`input for ${setting.label}`}
                      data-testid={`boardSetting${setting.key}`}
                      sx={{
                        '--Input-radius': '0px',
                        borderColor: 'var(--friendly-palette-neutral-500)',
                        '&::before': {
                          border: '1px solid var(--friendly-palette-primary-700)',
                          transform: 'scaleX(0)',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          top: 'unset',
                          transition: 'transform 1s cubic-bezier(0.1,0.9,0.2,1)'
                        },
                        '&:focus-within::before': {
                          transform: 'scaleX(1)'
                        }
                      }}
                    />
                  }
                  {setting.key === 'participants' &&
                    <div className={classes.input}>
                      <Participants
                        participants={participantsList}
                        collectParticipants={setting.onChange}
                      />
                    </div>
                  }
                </div>
              </div>))
            }
          </form>

          <div className={classes.columnsBoxContainer} aria-description='columns configuration container'>
            <p className={classes.columnsBoxTitle}>Columns</p>
            <section className={classes.columnsBoxComponents} data-testid="boardColumns">
              {initialSettingsValue.columns.map(column => (
                <div key={column.columnId} className={classes.columnBoxComponent}>
                  <ColumnConfiguration
                    columnId={column.columnId}
                    columns={columns}
                    onUpdateColumns={columnsUpdateHandler}
                  />
                </div>
              ))}
            </section>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default DefaultBoard;
