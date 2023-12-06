/* eslint-disable max-lines */
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { adminTabList, navigationBarTitles } from '../../constants';
import { useContext, useEffect, useState } from 'react';
import { BoardProvider } from '../../context/board/boardContext';
import { ThemeContext } from '../../context/theme/themeContext';
import { icons } from '../../theme/icons/icons';
import { localStorageManager } from '../../utils/localStorageManager';

import PageHeader from '../PageHeader/PageHeader';
import useAdminLocation from '../../utils/useAdminLocation';

import classes from './MainLayout.module.scss';

const MainLayout = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { getLocalUserData, getLocalBoardDatails } = localStorageManager();
  const user = getLocalUserData();
  const URLAdminPart = useAdminLocation();
  const URLPart = useLocation();
  const isAdmin = user.role === 'admin';
  const layoutHeight = isAdmin ? '80vh': '90vh';
  const [adminTabListState, setAdminTabListState] = useState(adminTabList);
  const iconList = [
    icons.backpack(adminTabListState[0].active ? '#fff' : '#8ab4bc'),
    icons.signSpot(adminTabListState[1].active ? '#fff' : '#8ab4bc')
  ];

  const adminListItemActiveUpdate = (URLPart: string) => {
    setAdminTabListState(prevTabList => prevTabList.map(tab => ({...tab, active: tab.path === URLPart })));
  };

  useEffect(() => {
    adminListItemActiveUpdate(URLAdminPart);
  }, [URLPart]);

  const openNewBoardTab = () => {
    navigate('/admin/new_board');
    adminListItemActiveUpdate(URLAdminPart);
  };

  const openManager = () => {
    navigate('/admin/boards_management');
    adminListItemActiveUpdate(URLAdminPart);
  };

  const dashboardList = [{
    testId: 'new-board',
    listTitle: adminTabList[0].title,
    listAction: openNewBoardTab }, {
    testId:'boards-management',
    listTitle: adminTabList[1].title,
    listAction: openManager
  }];

  return (
    <div className={classes.mainLayoutContainer}>
      {(isAdmin && URLAdminPart) && <nav className={classes.mainLayoutNavigationBar}>
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
          variant="permanent"
          anchor="left"
          data-testid="drawer"
        >
          <div className={classes.drawerHeader}>
            <span className={classes.drawerHeaderIcon}>{icons.listUl}</span>
            <span className={classes.drawerHeaderText}>{navigationBarTitles.drawerHeader}</span>
          </div>
          <div className={classes.drawerSubHeader}>
            <span className={classes.drawerSubHeaderIcon}>{icons.tree}</span>
            <span className={classes.drawerSubHeaderText}>{navigationBarTitles.drawerSubheader}</span>
          </div>
          <List className={classes.navigationList}>
            <ListItem className={classes.navigationTitle}>
              {navigationBarTitles.navigatinListHeader}
            </ListItem>
            {dashboardList.map((listItem, index) => (
              <ListItem
                key={listItem.listTitle}
                className={classes.listItem}
                data-testid={listItem.testId}
                onClick={listItem.listAction}
                sx={{
                  backgroundColor: adminTabListState[index].active ? theme.color2: 'transparent',
                  color: adminTabListState[index].active ? '#fff': '#8ab4bc'
                }}
              >
                <ListItemButton
                  className={classes.listItemButton}
                >
                  <span className={classes.listItemIcon}>
                    {iconList[index]}
                  </span>
                  <ListItemText primary={listItem.listTitle}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </nav>}
      <div className={classes.mainLayoutContent}>
        <BoardProvider>
          <PageHeader></PageHeader>
          <main style={{ height: layoutHeight }}>
            <Outlet></Outlet>
          </main>
        </BoardProvider>
      </div>
    </div>
  );
};

export default MainLayout;
