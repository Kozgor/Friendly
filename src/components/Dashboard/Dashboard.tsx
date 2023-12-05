/* eslint-disable max-lines */
import {
  ChangeEvent,
  useContext,
  useEffect,
  useState
} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Drawer,
  ListItemContent
} from '@mui/joy';

import BoardHeader from '../BoardHeader/BoardHeader';
import useLastPartLocation from '../../utils/useLastPartLocation';

import { ADMIN_PAGE_HEADER_TITLE, adminTabList } from '../../constants';
import { BoardContext } from '../../context/board/boardContext';
import { IBoardSettings } from '../../interfaces/boardSettings';
import { IColumn } from '../../interfaces/column';
import { ThemeContext } from '../../context/theme/themeContext';
import { boardAPI } from '../../api/BoardAPI';
import { icons } from '../../theme/icons/icons';
import { initColumnValue } from '../../mocks/column';

import classes from './Dashboard.module.scss';

const Dashboard = () => {
  const { boardId, setBoardId } = useContext(BoardContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [column, setColumn] = useState<IColumn>(initColumnValue);
  const [adminTabListState, setAdminTabListState] = useState(adminTabList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { getActiveBoard } = boardAPI();
  const URLPart = useLastPartLocation();
  const iconList = [
    icons.backpack,
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

  const adminListItemActiveUpdate = (URLPart: string) => {
    setAdminTabListState(prevTabList => prevTabList.map(tab => {
      if (tab.path === URLPart) {
        return { ...tab, active: true };
      } else {
        return { ...tab, active: false };
      }
    }));
  };

  useEffect(() => {
    fetchData();
    adminListItemActiveUpdate(URLPart);
  }, [URLPart]);

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
    adminListItemActiveUpdate(URLPart);
  };

  const openManager = () => {
    navigate('boards_management');
    adminListItemActiveUpdate(URLPart);
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
    testId: 'new-board',
    listTitle: adminTabList[0].title,
    listAction: openNewBoardTab
  }, {
    testId: 'boards-management',
    listTitle: adminTabList[1].title,
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
              color: theme.color3,
              borderRight: `1px solid ${theme.color5}`
            }
          }}
          anchor="left"
          data-testid="drawer"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <List sx={{ paddingLeft: 2 }} className={classes['newBoard']}>
            {dashboardList.map((listItem, index) => (
              <ListItem
                key={listItem.listTitle}
                data-testid={listItem.testId}
                onClick={listItem.listAction}
                sx={{
                  padding: 0,
                  backgroundColor: adminTabListState[index].active ? theme.color2 : 'transparent',
                  borderRadius: 2.5,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}
              >
                <ListItemButton>
                  <span className={classes.listItemIcon}>
                    {iconList[index]}
                  </span>
                  <ListItemContent>{listItem.listTitle}</ListItemContent>
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
