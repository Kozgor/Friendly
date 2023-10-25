import React from 'react';

import App from './App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

import { Provider } from 'react-redux';
import { ThemeProvider } from './context/theme/themeContext';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
