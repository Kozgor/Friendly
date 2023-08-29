import classes from './App.module.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import BoardCatalog from './pages/board-catalog/Board-catalog';
import NotFound from './pages/not-found/Not-fount';

function App() {
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/board-catalog" element={<BoardCatalog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
