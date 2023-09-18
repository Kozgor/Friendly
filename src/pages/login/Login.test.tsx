import { RenderResult, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './Login';

import axios from 'axios';

import { dummyLocalUserProfile } from '../../mocks/user';
import store from '../../store/store';

const mockUserLogin = jest.fn(() =>
  Promise.resolve({
    data: {
      dummyLocalUserProfile
    }
  })
);

const mockLoginError = jest.fn(() =>
  Promise.reject({
    data: {
      message :'Wrong login or password'
    }
  })
);

describe('Login component', () => {
  let component: RenderResult;

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
    component.unmount();
    jest.clearAllMocks();
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

  test('should change value in `Password` field', () => {
    const emailInputDiv = screen.getByTestId('loginInputPassword');
    const emailInputElement = emailInputDiv.querySelector('input') as HTMLInputElement;

    fireEvent.change(emailInputElement, { target: { value: 'qwerty123' } });

    expect(emailInputElement.value).toBe('qwerty123');
  });

  test('should login user', () => {
    const emailInputDiv = screen.getByTestId('loginInputEmail');
    const emailInputElement = emailInputDiv.querySelector('input') as HTMLInputElement;
    const passwordInputDiv = screen.getByTestId('loginInputPassword');
    const passwordInputElement = passwordInputDiv.querySelector('input') as HTMLInputElement;
    const post = jest.spyOn(axios, 'post').mockImplementation(mockUserLogin);
    const submitBtn = screen.getByTestId('submitBtn');
    const expectedCallCount = 1;

    fireEvent.change(emailInputElement, { target: { value: 'user@mail.com' } });
    fireEvent.change(passwordInputElement, { target: { value: 'qwerty123' } });
    fireEvent.click(submitBtn);

    expect(post).toHaveBeenCalled();
    expect(post).toHaveBeenCalledTimes(expectedCallCount);
  });

  test('should show error toast message', () => {
    const submitBtn = screen.getByTestId('submitBtn');
    const emailInputDiv = screen.getByTestId('loginInputEmail');
    const passwordInputDiv = screen.getByTestId('loginInputPassword');
    const emailInputElement = emailInputDiv.querySelector('input') as HTMLInputElement;
    const passwordInputElement = passwordInputDiv.querySelector('input') as HTMLInputElement;
    const post = jest.spyOn(axios, 'post').mockImplementation(mockLoginError);
    const expectedCallCount = 1;

    fireEvent.change(emailInputElement, { target: { value: 'user@mail.com' } });
    fireEvent.change(passwordInputElement, { target: { value: 'qwerty123' } });
    fireEvent.click(submitBtn);

    expect(post).toHaveBeenCalled();
    expect(post).toHaveBeenCalledTimes(expectedCallCount);
  });
});
