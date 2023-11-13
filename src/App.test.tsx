import { RenderResult, render } from '@testing-library/react';
import store from './store/store';

import App from './App';

import { Provider } from 'react-redux';

import { LOCAL_ADMIN_PROFILE } from './mocks/user';

import * as router from 'react-router';

const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();
const checkAdminRole = jest.fn();
const checkAuth = jest.fn();

jest.mock('./utils/localStorageManager', () => ({
  localStorageManager: () => ({
    saveLocalUserData,
    removeLocalUserData,
    getLocalUserData: () => LOCAL_ADMIN_PROFILE
  })
}));

jest.mock('./utils/checkAuthLoader', () => ({
  checkAuthLoader: () => ({
    checkAdminRole,
    checkAuth
  })
}));

describe('App component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  beforeEach(() => {
    localStorage.setItem('fullName', 'Admin');
    localStorage.setItem('token', 'testToken');
    localStorage.setItem('role', 'admin');
    localStorage.setItem('expiration', '2033-09-21T13:06:05.312Z');
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);

    component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();

    await component.unmount();
  });

  xtest('should mount component properly', () => {
    expect(component).toBeTruthy();
  });
});
