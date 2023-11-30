import { Navigate, createBrowserRouter } from 'react-router-dom';

import AdminPage from '../pages/admin/Admin';
import BoardPage from '../pages/board/Board';
import BoardsManagementPage from '../pages/boardsManagement/BoardsManagementPage';
import CreateBoardPage from '../pages/createBoard/CreateBoard';
import DefaultBoardPage from '../pages/defaultBoard/DefaultBoard';
import ErrorPage from '../pages/notFound/Error';
import LoginPage from '../pages/login/Login';
import MainLayout from '../components/MainLayout/MainLayout';
import TeamSummaryPage from '../pages/teamSummary/TeamSummary';
import { checkAuthLoader } from '../utils/checkAuthLoader';
import pathConstants from './pathConstants';

const { checkAdminRole, checkAuth } = checkAuthLoader();

const router = createBrowserRouter([
    {
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: '',
            element: <Navigate to={pathConstants.HOME} />,
            loader: checkAuth
          },
          {
            path: pathConstants.TEAM_SUMMARY,
            element: <TeamSummaryPage />,
            errorElement: <ErrorPage />,
            loader: checkAdminRole,
            children: [
              {
                path: '',
                element: <Navigate to={pathConstants.TEAM_SUMMARY_ID} />,
                loader: checkAuth
              },
              {
                path: pathConstants.TEAM_SUMMARY_ID,
                element: <TeamSummaryPage />,
                loader: checkAuth
              }
            ]
          },
          {
            path: pathConstants.BOARD,
            element: <BoardPage />,
            errorElement: <ErrorPage />,
            children: [
              {
                path: '',
                element: <Navigate to={pathConstants.BOARD_ID} />,
                loader: checkAuth
              },
              {
                path: pathConstants.BOARD_ID,
                element: <BoardPage />,
                loader: checkAuth
              }
            ]
          },
          {
            path: pathConstants.ADMIN,
            element: <AdminPage />,
            children: [
              {
                path: '',
                element: <Navigate to={pathConstants.NEW_BOARD} />,
                loader: checkAdminRole
              },
              {
                path: pathConstants.NEW_BOARD,
                element: <CreateBoardPage />,
                loader: checkAdminRole
              },
              {
                path: pathConstants.BOARDS_MANAGEMENT,
                element: <BoardsManagementPage />,
                loader: checkAdminRole
              },
              {
                path: pathConstants.NEW_BOARD_DEFAULT,
                element: <DefaultBoardPage />,
                loader: checkAdminRole
              }
            ],
            loader: checkAdminRole
          }
      ]
    },
    {
      path: pathConstants.AUTH,
      element: <LoginPage />
    }
]);

export default router;
