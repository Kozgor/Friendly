import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Admin from './pages/admin/Admin';
import BoardCatalog from './pages/board-catalog/Board-catalog';
import CreateBoard from './pages/admin/createBoard/CreateBoard';
import DefaultBoard from './pages/admin/defaultBoard/DefaultBoard';
import Login from './pages/login/Login';
import NotFound from './pages/not-found/Not-fount';

import { ColumnProvider } from './store/column-context';

import 'react-toastify/dist/ReactToastify.css';
import classes from './App.module.scss';

function App() {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  return (
    <ColumnProvider>
      <div className={classes.app}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                !token ? (
                  <Login />
                ) : userRole === 'user' ? (
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
        position="top-right"
        autoClose={3000}
        draggable
        closeOnClick
        pauseOnHover={false}
        hideProgressBar={false}
        theme="colored"
      />
    </ColumnProvider>
  );
}

export default App;
