import { Outlet } from 'react-router-dom';

import AsidePanel from '../Drawer/AsidePanel';
import { BoardProvider } from '../../context/board/boardContext';
import PageHeader from '../PageHeader/PageHeader';
import { localStorageManager } from '../../utils/localStorageManager';
import useAdminLocation from '../../utils/useAdminLocation';

import classes from './MainLayout.module.scss';

const MainLayout = () => {
  const { getLocalUserData } = localStorageManager();
  const user = getLocalUserData();
  const URLAdminPart = useAdminLocation();
  const isAdmin = user.role === 'admin';
  const layoutHeight = isAdmin ? '80vh' : '90vh';

  return (
    <div className={classes.mainLayoutContainer}>
      {(isAdmin && URLAdminPart) && <AsidePanel />}
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
