import { createBrowserRouter } from 'react-router-dom';

import AdminPage from '../pages/admin/Admin';
import BoardPage from '../pages/board/Board';
import BoardsManagementPage from '../pages/boardsManagement/BoardsManagementPage';
import CreateBoardPage from '../pages/createBoard/CreateBoard';
import DefaultBoardPage from '../pages/defaultBoard/DefaultBoard';
import ErrorPage from '../pages/notFound/Error';
import LoginPage from '../pages/login/Login';
import { checkAuthLoader } from '../utils/checkAuthLoader';

const { checkAdminRole, checkAuth } = checkAuthLoader();

const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardPage />,
    errorElement: <ErrorPage />,
    loader: checkAuth
  },
  {
    path: '/auth',
    element: <LoginPage />
  },
  {
    path: '/admin',
    element: <AdminPage />,
    children: [
      {
        path: 'new_board',
        element: <CreateBoardPage />,
        loader: checkAdminRole
      },
      {
        path: 'boards_management',
        element: <BoardsManagementPage />,
        loader: checkAdminRole
      },
      {
        path: 'default_board',
        element: <DefaultBoardPage />,
        loader: checkAdminRole
      }
    ],
    loader: checkAdminRole
  }
]);

export default router;
