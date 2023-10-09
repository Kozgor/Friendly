import { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getTokenDuration } from './utils/getTokenDuration';
import router from './router/router';

import 'react-toastify/dist/ReactToastify.css';
import classes from './App.module.scss';

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
