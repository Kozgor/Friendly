import { RenderResult, render } from '@testing-library/react';

import { Provider } from 'react-redux';

import App from './App';
import store from './store/store';

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

  xtest('renders App component', () => {
    expect(component).toBeTruthy();
  });
});
