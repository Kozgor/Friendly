import { useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import AdminPage from './pages/admin/Admin';
import BoardPage from './pages/board/Board';
import BoardsManagementPage from './pages/boardsManagement/BoardsManagementPage';
import CreateBoardPage from './pages/createBoard/CreateBoard';
import DefaultBoardPage from './pages/defaultBoard/DefaultBoard';
import ErrorPage from './pages/not-found/Error';
import LoginPage from './pages/login/Login';
import { checkAuthLoader } from './utils/checkAuthLoader';

import { getTokenDuration } from './utils/getTokenDuration';

import 'react-toastify/dist/ReactToastify.css';
import classes from './App.module.scss';

const { checkAdminRole, checkAuth } = checkAuthLoader();
const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardPage />,
    errorElement: <ErrorPage />,
    loader: checkAuth
  }, {
    path:'/auth',
    element: <LoginPage />
  }, {
    path: '/admin',
      element: <AdminPage />,
      children: [
        {
          path: 'new_board',
          element: <CreateBoardPage />,
          loader: checkAdminRole
        }, {
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

function App() {
  const tokenDuration = getTokenDuration();

  useEffect(() => {
    setTimeout(() => {
      router.navigate('/auth');
    }, tokenDuration);
  }, [tokenDuration]);

  return (
      <div className={classes.app}>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer
          role="alert"
          position="top-right"
          autoClose={3000}
          draggable
          closeOnClick
          pauseOnHover={false}
          hideProgressBar={false}
          theme="colored"
        />
      </div>
  );
}

export default App;
