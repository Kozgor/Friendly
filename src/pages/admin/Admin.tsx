import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import axios from 'axios';

import BoardHeader from '../../components/BoardHeader/BoardHeader';
import DefaultBoard from './defaultBoard/DefaultBoard';
import { IColumn } from '../../interfaces/column';
// import { ITheme } from '../../interfaces/theme';
import { environment } from '../../environment';

import classes from './Admin.module.scss';

const AdminPage = (props: { onSignOut: () => void }) => {
  const timeRef = useRef<HTMLInputElement>(null);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const columnInitValue = {
    columnId: '',
    columnTitle: '',
    columnSubtitle: '',
    columnStyle: '',
    columnAvatar: '',
    columnCards: [],
    isAddingDisabled: true
  };
  const [column, setColumn] = useState<IColumn>(columnInitValue);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [themes, setThemes] = useState<ITheme[]>([]);
  const [isDefaultBoardActive, setIsDefaultBoardActive] = useState(false);

  const columnTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setColumn((prevState) => ({
      ...prevState,
      columnTitle: event.target.value
    }));
  };

  const columnSubTitleChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setColumn((prevState) => ({
      ...prevState,
      columnSubtitle: event.target.value
    }));
  };

  const columnStyleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setColumn((prevState) => ({
      ...prevState,
      columnStyle: event.target.value
    }));
  };

  const columnAvatarChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setColumn((prevState) => ({
      ...prevState,
      columnAvatar: event.target.value
    }));
  };

  const columnInputsCollection = [
    {
      key: 'columnTitle',
      label: 'Column title:',
      type: 'input',
      value: column.columnTitle,
      onChange: columnTitleChangeHandler,
      placeholder: 'Please enter the column title:'
    },
    {
      key: 'columnSubtitle',
      label: 'Column subtitle:',
      type: 'input',
      value: column.columnSubtitle,
      onChange: columnSubTitleChangeHandler,
      placeholder: 'Please enter the column subtitle:'
    },
    {
      key: 'columnStyle',
      label: 'Column style:',
      type: 'color',
      value: column.columnStyle,
      onChange: columnStyleChangeHandler,
      placeholder: 'Please choose the column style:'
    },
    {
      key: 'columnAvatar',
      label: 'Column avatar:',
      type: 'input',
      value: column.columnAvatar,
      onChange: columnAvatarChangeHandler,
      placeholder: 'Please choose the column avatar:'
    }
  ];

  useEffect(() => {
    try {
      // axios.get(`${environment.FRIENDLY_LINK}admin/settings`).then(data => {
      //   console.log(data);
      // });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmitChangeSettings = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const time = (timeRef.current?.children[0] as HTMLInputElement)?.value;

      const response = await axios.post(
        `${environment.FRIENDLY_LINK}admin/settings`,
        { columns, time }
      );
      const responseData = response.data;
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const clearInputs = () => {
    setColumn(columnInitValue);
  };

  const addNewColumn = () => {
    setColumns((prevState) => [
      ...prevState,
      {
        ...column,
        columnId: Math.random().toString(),
        columnStyle: !column.columnStyle ? '#000' : column.columnStyle
      }
    ]);
    console.log(column);
    clearInputs();
    setIsModalOpen(false);
  };

  const openDefaultBoard = () => {
    setIsDefaultBoardActive(true);
  };

  const modal = (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
      >
        <Typography id="basic-modal-dialog-title" level="h2">
          Add new column
        </Typography>
        <Typography id="basic-modal-dialog-description">
          Fill in all inputs.
        </Typography>
        <form>
          <Stack spacing={2}>
            {columnInputsCollection.map((columnInput) => (
              <FormControl
                key={columnInput.key}
                className={classes[columnInput.key]}
              >
                <FormLabel htmlFor={columnInput.key}>
                  {columnInput.label}
                </FormLabel>
                <Input
                  className={classes.input}
                  id={columnInput.key}
                  type={columnInput.type}
                  placeholder={columnInput.placeholder}
                  value={columnInput.value}
                  onChange={columnInput.onChange}
                />
              </FormControl>
            ))}
            <Button onClick={addNewColumn}>Add Column</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );

  const drawerWidth = 240;

  return (
    <>
      <BoardHeader
        fullName={'Admin'}
        isTimerVisible={false}
        onSignOut={props.onSignOut}
      />
      <Stack className={classes.main} direction="row" spacing={2}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              position: 'relative',
              backgroundColor: 'darkgray',
              borderRight: '1px solid black'
            }
          }}
          variant="permanent"
          anchor="left"
        >
          <Divider />
          <List className={classes['newBoard']}>
            {['New'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/* <List>
            {['My Boards'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Drawer>
        {!isDefaultBoardActive && (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              p: 3,
              marginLeft: 0
            }}
          >
            {/* <div className={classes.customBoard}></div>
                  <h3>Custom Board</h3>

                  <Divider className={classes.divider} /> */}

            <h2>TEMPLATES</h2>
            <div className={classes.defaultBoard} onClick={openDefaultBoard}>
              <div className={classes['defaultBoard__column']}></div>
              <div className={classes['defaultBoard__column']}></div>
              <div className={classes['defaultBoard__column']}></div>
            </div>
            <h3>Default Board</h3>
          </Box>
        )}
        { isDefaultBoardActive && <DefaultBoard /> }
      </Stack>
      {/* <form className={classes.settings} onSubmit={handleSubmitChangeSettings}>
        <FormControl className={classes.time}>
          <FormLabel htmlFor="time">Time: (minutes)</FormLabel>
          <Input
            className={classes.input}
            id="time"
            type="number"
            placeholder="Please enter the retrospective time"
            ref={timeRef}
            required
            defaultValue={10}
            slotProps={{
              input: {
                ref: timeRef,
                min: 1
              }
            }}
          />
        </FormControl>
        <section className={classes.columns}>
          <div className={classes['columns__header']}>
            <h3>Columns:</h3>
            <Button onClick={() => setIsModalOpen(true)}>Add Column</Button>
          </div>
          <div className={classes['columns__content']}>
            {columns.map((column) => (
              <div
                key={column.columnId}
                className={classes.column}
                style={{ backgroundColor: column.columnStyle }}
              >
                <img
                  className={classes['column__avatar']}
                  src={column.columnAvatar}
                  alt="avatar for column"
                />
                <div className={classes['column__info']}>
                  <h4>{column.columnTitle}</h4>
                  <p>{column.columnSubtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className={classes.themes}>
          <h3>Themes:</h3>
          {themes.map((theme) => (
            <div key={theme.name} className={classes.theme}>
              <div className={classes['theme-context']}>{theme.name}</div>
            </div>
          ))}
        </section>
        <Button className={classes.submitButton} type="submit">
          Save
        </Button>
      </form> */}
    </>
  );
};

export default AdminPage;
