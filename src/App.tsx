import { useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Admin from './pages/admin/Admin';
import BoardCatalog from './pages/board-catalog/Board-catalog';
import CreateBoard from './pages/admin/createBoard/CreateBoard';
import DefaultBoard from './pages/admin/defaultBoard/DefaultBoard';
import Login from './pages/login/Login';
import NotFound from './pages/not-found/Not-fount';

import { checkAuthLoader } from './utils/checkAuthLoader';

import { getTokenDuration } from './utils/getTokenDuration';

import 'react-toastify/dist/ReactToastify.css';
import classes from './App.module.scss';

const { checkAdminRole, checkAuth } = checkAuthLoader();
const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardCatalog />,
    errorElement: <NotFound />,
    loader: checkAuth
  }, {
    path:'/auth',
    element: <Login />
  }, {
    path: '/admin',
      element: <Admin />,
      children: [
        {
          path: '',
          element: <CreateBoard />,
          loader: checkAdminRole
        }, {
          path: 'default_board',
          element: <DefaultBoard />,
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
