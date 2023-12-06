import { Navigate, createBrowserRouter } from 'react-router-dom';

import AdminPage from '../pages/admin/Admin';
import BoardPage from '../pages/board/Board';
import BoardsManagementPage from '../pages/boardsManagement/BoardsManagementPage';
import CreateBoardPage from '../pages/createBoard/CreateBoard';
import DefaultBoardPage from '../pages/defaultBoard/DefaultBoard';
import ErrorPage from '../pages/notFound/Error';
import LoginPage from '../pages/login/Login';
import TeamSummaryPage from '../pages/teamSummary/TeamSummary';
import { checkAuthLoader } from '../utils/checkAuthLoader';

const { checkAdminRole, checkAuth } = checkAuthLoader();

const router = createBrowserRouter([
  {
    path: '',
    element: <Navigate to="/board" />,
    loader: checkAuth
  },
  {
    path: '/boardDetails',
    element: <TeamSummaryPage />,
    errorElement: <ErrorPage />,
    loader: checkAdminRole,
    children: [
      {
        path: '',
        element: <Navigate to='boardDetails/:id' />,
        loader: checkAuth
      },
      {
        path: '/boardDetails/:id',
        element: <TeamSummaryPage />,
        loader: checkAuth
      }
    ]
  },
  {
    path: '/board',
    element: <BoardPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Navigate to='/board/:id' />,
        loader: checkAuth
      },
      {
        path: '/board/:id',
        element: <BoardPage />,
        loader: checkAuth
      }
    ]
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
        path: '',
        element: <Navigate to="new_board" />,
        loader: checkAdminRole
      },
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
        path: 'new_board/default_board',
        element: <DefaultBoardPage />,
        loader: checkAdminRole
      }
    ],
    loader: checkAdminRole
  }
]);

export default router;
