import { RenderResult, render } from '@testing-library/react';

import { Provider } from 'react-redux';

import App from './App';
import store from './store/store';

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

  beforeEach(() => {
    localStorage.setItem('fullName', '');
    localStorage.setItem('token', '');
    localStorage.setItem('role', '');
    localStorage.setItem('expiration', '');
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


  test('renders App component', () => {
    const textElement = component.getByText('Sign Out');

    expect(textElement).toBeInTheDocument();
  });
});
