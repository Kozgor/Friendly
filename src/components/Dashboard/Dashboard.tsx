/* eslint-disable max-lines */
import {
  ChangeEvent,
  useContext,
  useEffect,
  useState
} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Typography
} from '@mui/joy';

import BoardHeader from '../BoardHeader/BoardHeader';

import { ADMIN_PAGE_HEADER_TITLE, dashboardTitles } from '../../constants';
import { BoardContext } from '../../context/board/boardContext';
import { ThemeContext } from '../../context/theme/themeContext';

import { IBoardSettings } from '../../interfaces/boardSettings';
import { IColumn } from '../../interfaces/column';
import { boardAPI } from '../../api/BoardAPI';

import classes from './Dashboard.module.scss';

const Dashboard = () => {
  const { boardId, setBoardId } = useContext(BoardContext);
  const { theme } = useContext(ThemeContext);
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
  const [isListItemActive, setListItemActive] = useState<boolean[]>([true, false]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getActiveBoard } = boardAPI();

  const fetchData = async () => {
    if (!boardId) {
      try {
        const activeBoard: IBoardSettings | undefined = await getActiveBoard();

        (activeBoard && activeBoard._id) ? setBoardId(activeBoard._id) : setBoardId('');
      } catch (error) {
        return Promise.resolve(columnInitValue);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const updateList = (ListItemindex: number) => {
    setListItemActive(prevState => prevState.map(() => false));

    const updatedList = isListItemActive.map((_, index) => index === ListItemindex);

    setListItemActive(updatedList);
  };

  const openNewBoardTab = (ListItemindex: number) => {
    updateList(ListItemindex);
    navigate('new_board');
  };

  const openManager = (ListItemindex: number) => {
    updateList(ListItemindex);
    navigate('boards_management');
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

  const dashboardList = [{
    listTitle: dashboardTitles.newBoard,
    testId: 'new-board',
    listAction: (ListItemindex: number) => openNewBoardTab(ListItemindex)
  }, {
    testId:'boards-management',
    listTitle: dashboardTitles.boardsManagement,
    listAction: (ListItemindex: number) => openManager(ListItemindex)
  }];

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
        boardName={ADMIN_PAGE_HEADER_TITLE}
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
                backgroundColor: theme.color1,
                color: theme.color4,
                borderRight: `1px solid ${theme.color5}`
              }
            }}
            variant="permanent"
            anchor="left"
            data-testid="drawer"
          >
            <Divider data-testid="divider" />
            <List sx={{ paddingLeft: 2 }} className={classes['newBoard']}>
              {dashboardList.map((listItem, index) => (
                <ListItem
                  key={listItem.listTitle}
                  data-testid={listItem.testId}
                  onClick={() => listItem.listAction(index)}
                  sx={{
                    padding: 0,
                    backgroundColor: isListItemActive[index] ? theme.color2: 'transparent',
                    borderRadius: 2.5,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary={listItem.listTitle} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Outlet />
        </Stack>
    </>
  );
};

export default Dashboard;
