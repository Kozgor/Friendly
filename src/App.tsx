/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useStoreUser } from './utils/userManager';

import Admin from './pages/admin/Admin';
import BoardCatalog from './pages/board-catalog/Board-catalog';
import CreateBoard from './pages/admin/createBoard/CreateBoard';
import DefaultBoard from './pages/admin/defaultBoard/DefaultBoard';
import Login from './pages/login/Login';
import NotFound from './pages/not-found/Not-fount';


import 'react-toastify/dist/ReactToastify.css';
import classes from './App.module.scss';

function App() {
  const { getUserFromStore } = useStoreUser();
  const user = getUserFromStore();
  const { token, role } = user;

  return (
    <>
      <div className={classes.app}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                !token ? (
                  <Login />
                ) : role === 'user' ? (
                  <BoardCatalog />
                ) : (
                  <Admin />
                )
              }
            />
            <Route path="/auth" element={<Login />} />
            <Route path="/board-catalog" element={<BoardCatalog />} />
            <Route path="/admin" element={<Admin />}>
              <Route path="/admin/" element={<CreateBoard />} />
              <Route path="/admin/template" element={<DefaultBoard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
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
    </>
  );
}

export default App;
