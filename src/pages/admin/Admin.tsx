import { ChangeEvent, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Divider, Drawer, ListItem, List, ListItemButton, ListItemText } from '@mui/material';

import { Button, FormControl, FormLabel, Input, Modal, ModalDialog, Stack, Typography } from '@mui/joy';

import BoardHeader from '../../components/BoardHeader/BoardHeader';
import { IColumn } from '../../interfaces/column';

import classes from './Admin.module.scss';

const Admin = () => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const columnInitValue = {
    columnId: '',
    columnTitle: '',
    columnSubtitle: '',
    columnStyle: '',
    columnAvatar: '',
    columnCards: []
  };
  const [column, setColumn] = useState<IColumn>(columnInitValue);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const clearInputs = () => {
    setColumn(columnInitValue);
  };

  const openNewBoardTab = () => {
    navigate('/admin');
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
    clearInputs();
    setIsModalOpen(false);
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
            <Button aria-label='button for adding new column' onClick={addNewColumn}>Add Column</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );

  return (
    <>
      <BoardHeader
        boardName=''
        isTimerVisible={false}
        time={0}
      />
      <Stack className={classes.main} direction="row" spacing={2}>
        <Drawer
          sx={{
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              position: 'relative',
              backgroundColor: 'darkgray',
              borderRight: '1px solid black'
            }
          }}
          variant="permanent"
          anchor="left"
          data-testid="drawer"
        >
          <Divider data-testid="divider" />
          <List className={classes['newBoard']}>
            {['New Board'].map((text) => (
              <ListItem key={text} disablePadding onClick={openNewBoardTab} data-testid="newBoardTab">
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/* <List>
            {['My Boards'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Drawer>
        <Outlet />
      </Stack>
    </>
  );
};

export default Admin;
