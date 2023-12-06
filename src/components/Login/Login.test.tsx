import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { STORE_USER_PROFILE } from '../../mocks/user';
import { act } from 'react-dom/test-utils';

import Login from './Login';
import store from '../../store/store';

const login = jest.fn();
const addUserToStore = jest.fn();
const saveLocalUserData = jest.fn();

const USER_LOGIN_RESOLVE = jest.fn(() =>
  Promise.resolve({
    data: {
      STORE_USER_PROFILE
    },
    status: 200
  })
);

const USER_LOGIN_ERROR = jest.fn(() =>
  Promise.reject({
    data: {
      message :'Wrong login or password'
    },
    status: 401
  })
);

describe('Login component', () => {
  process.env.REACT_APP_FRIENDLY_DOMAIN = 'https://test.com/';
  let component: RenderResult;

  beforeAll(() => {
    jest.mock('../../utils/localStorageManager', () => ({
      ...jest.requireActual('../../utils/localStorageManager'),
      saveLocalUserData
    }));

    jest.mock('../../utils/storeUserManager', () => ({
      ...jest.requireActual('../../utils/storeUserManager'),
      addUserToStore
    }));

    jest.mock('../../api/AuthAPI', () => ({
      ...jest.requireActual('../../api/AuthAPI'),
      login
    }));
  });

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render "Welcome to Friendly" and login form', () => {
    const greeting = screen.getByText('Welcome to Friendly');
    const form = screen.getByTestId('loginForm');

    expect(greeting).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  test('should render "Login" value for login button', () => {
    const login = screen.getByText(/Login/);
    const submitBtn = screen.getByTestId('submitBtn');

    expect(login).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('should render email input field', () => {
    const emailField = screen.getByTestId('loginInputEmail');

    expect(emailField).toBeInTheDocument();
  });

  test('should render password input field', () => {
    const passwordField = screen.getByTestId('loginInputPassword');

    expect(passwordField).toBeInTheDocument();
  });

  test('should change value in "Email" field', () => {
    const emailInputDiv = screen.getByTestId('loginInputEmail');
    const inputElement = emailInputDiv.querySelector('input') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'test@mail.com' } });

    expect(inputElement.value).toBe('test@mail.com');
  });

  test('should change value in "Password" field', () => {
    const passwordInputDiv = screen.getByTestId('loginInputPassword');
    const emailInputElement = passwordInputDiv.querySelector('input') as HTMLInputElement;

    fireEvent.change(emailInputElement, { target: { value: 'qwerty123' } });

    expect(emailInputElement.value).toBe('qwerty123');
  });

  test('should show error on login with empty field after click on "Login" button', () => {
    const submitBtn = screen.getByTestId('submitBtn');

    waitFor(() => {
      act(() => {
        fireEvent.click(submitBtn);
        const errorMessage = screen.getByText('Empty login or password');

        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  it('should get error on login fail', async () => {
    login.mockImplementationOnce(USER_LOGIN_ERROR);

    await act(async () => {
      try {
        await login();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  it('should successfully login a user', async () => {
    login.mockImplementationOnce(USER_LOGIN_RESOLVE);

    await act(async () => {
      const result = await login();

      expect(result.data).toEqual({ STORE_USER_PROFILE });
    });
  });

  test('should show progress spinner', () => {
    login.mockImplementationOnce(USER_LOGIN_RESOLVE);
    const passwordInputDiv = screen.getByTestId('loginInputPassword');
    const emailInputElement = passwordInputDiv.querySelector('input') as HTMLInputElement;
    const emailInputDiv = screen.getByTestId('loginInputEmail');
    const inputElement = emailInputDiv.querySelector('input') as HTMLInputElement;
    const submitBtn = screen.getByTestId('submitBtn');

    waitFor(() => {
      fireEvent.change(inputElement, { target: { value: STORE_USER_PROFILE.email } });
      fireEvent.change(emailInputElement, { target: { value: 'qwerty123' } });

      fireEvent.click(submitBtn);

      const progressSpinner = screen.getByTestId('submitProgress');

      expect(progressSpinner).toBeInTheDocument();
    });
  });
});
