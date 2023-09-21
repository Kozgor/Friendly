import { RenderResult, render } from '@testing-library/react';
import store from './store/store';

import App from './App';

import { Provider } from 'react-redux';
import { dummyLocalAdminProfile } from './mocks/user';

import * as router from 'react-router';

const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();
const checkAdminRole = jest.fn();
const checkAuth = jest.fn();

jest.mock('./utils/localStorageManager', () => ({
  localStorageManager: () => ({
    saveLocalUserData,
    removeLocalUserData,
    getLocalUserData: () => dummyLocalAdminProfile
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

  beforeAll(() => {
    localStorage.setItem('fullName', 'Admin');
    localStorage.setItem('token', 'testToken');
    localStorage.setItem('role', 'admin');
    localStorage.setItem('expiration', '2033-09-21T13:06:05.312Z');
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  afterAll(() => {
    jest.clearAllMocks();
    localStorage.removeItem('fullName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('expiration');
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });
});
