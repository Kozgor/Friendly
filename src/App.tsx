import BoardCatalog from './pages/board-catalog/Board-catalog';
import Login from './pages/login/Login';
import NotFound from './pages/not-found/Not-fount';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import classes from './App.module.scss';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!token? <Login /> : <BoardCatalog />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/board-catalog" element={<BoardCatalog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
