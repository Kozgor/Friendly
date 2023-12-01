import { useEffect } from 'react';

import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getTokenDuration } from './utils/getTokenDuration';
import router from './router/router';
import { ThemeProvider } from '@mui/material/styles';
import { Experimental_CssVarsProvider as MaterialCssVarsProvider } from '@mui/material';

import 'react-toastify/dist/ReactToastify.css';
import classes from './App.module.scss';
import { joyTheme, materialTheme } from './theme/theme';

function App() {
  const tokenDuration = getTokenDuration();

  useEffect(() => {
    setTimeout(() => {
      router.navigate('/auth');
    }, tokenDuration);
  }, [tokenDuration]);

  return (
    <div className={classes.app}>
      <JoyCssVarsProvider theme={joyTheme}>
        <ThemeProvider theme={materialTheme}>
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
        </ThemeProvider>
      </JoyCssVarsProvider>
    </div>
  );
}

export default App;
