import * as router from 'react-router';

import { RenderResult, render } from '@testing-library/react';
import { LOCAL_ADMIN_PROFILE } from './mocks/user';
import { Provider } from 'react-redux';

import App from './App';
import store from './store/store';

const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();

jest.mock('./utils/localStorageManager', () => ({
  localStorageManager: () => ({
    saveLocalUserData,
    removeLocalUserData,
    getLocalUserData: () => LOCAL_ADMIN_PROFILE
  })
}));

jest.mock('./utils/checkAuthLoader', () => ({
  checkAuthLoader: () => ({
    checkAdminRole: () => true,
    checkAuth: () => null
  })
}));

describe('App component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });
  });

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

  test('renders App component', () => {
    expect(component).toBeTruthy();
  });
});
