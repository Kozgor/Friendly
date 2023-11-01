/* eslint-disable max-lines */
import {
  ChangeEvent,
  useContext,
  useEffect,
  useState
} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import {
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
import FriendlyIcon from '../FriendlyIcon/FriendlyIcon';
import useLastPartLocation from '../../utils/useLastPartLocation';

import { ADMIN_PAGE_HEADER_TITLE, adminTabMap, dashboardTitles } from '../../constants';
import { BoardContext } from '../../context/board/boardContext';
import { IBoardSettings } from '../../interfaces/boardSettings';
import { IColumn } from '../../interfaces/column';
import { ThemeContext } from '../../context/theme/themeContext';
import { boardAPI } from '../../api/BoardAPI';
import { icons } from '../../theme/icons/iconst';
import { initColumnValue } from '../../mocks/column';

import classes from './Dashboard.module.scss';

const Dashboard = () => {
  const { boardId, setBoardId } = useContext(BoardContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [column, setColumn] = useState<IColumn>(initColumnValue);
  const [listActiveItem, setListActiveItem] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getActiveBoard } = boardAPI();
  const lastPart = useLastPartLocation();
  const iconList = [
    icons.suitCase,
    icons.signSpot
  ];

  const fetchData = async () => {
    if (!boardId) {
      try {
        const activeBoard: IBoardSettings | undefined = await getActiveBoard();

        (activeBoard && activeBoard._id) ? setBoardId(activeBoard._id) : setBoardId('');
      } catch (error) {
        return Promise.resolve(initColumnValue);
      }
    }
  };

  const checkLocation = () => {
    const words = lastPart.split('_');
    const titleCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    return titleCaseWords.join(' ');
  };

  useEffect(() => {
    const activetab = checkLocation();

    Object.values(adminTabMap).forEach(tab => tab !== activetab ? setListActiveItem(adminTabMap.newBoard)
      : setListActiveItem(activetab));

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

  const openNewBoardTab = () => {
    navigate('new_board');
    setListActiveItem(adminTabMap.newBoard);
  };

  const openManager = () => {
    navigate('boards_management');
    setListActiveItem(adminTabMap.boardsManagement);
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
    listAction: openNewBoardTab
  }, {
    testId:'boards-management',
    listTitle: dashboardTitles.boardsManagement,
    listAction: openManager
  }];

  const clearInputs = () => {
    setColumn(initColumnValue);
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
            <List sx={{ paddingLeft: 2 }} className={classes['newBoard']}>
              {dashboardList.map((listItem, index) => (
                <ListItem
                  key={listItem.listTitle}
                  data-testid={listItem.testId}
                  onClick={listItem.listAction}
                  sx={{
                    padding: 0,
                    backgroundColor: listActiveItem === listItem.listTitle ? theme.color2: 'transparent',
                    borderRadius: 2.5,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
                  }}
                >
                  <ListItemButton>
                    <span className={classes.listItemIcon}>
                      <FriendlyIcon element={iconList[index]}></FriendlyIcon>
                    </span>
                    <ListItemText primary={listItem.listTitle}>
                    </ListItemText>
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
