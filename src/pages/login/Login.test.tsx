import { RenderResult, fireEvent, render, screen, waitFor } from '@testing-library/react';

import Login from './Login';
import { MemoryRouter } from 'react-router-dom';

describe('Board component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('Should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('Should render \'Welcome to Friendly\' and login form', () => {
    const greeting = screen.getByText(/Welcome to Friendly/);
    const form = screen.getByTestId('loginForm');

    expect(greeting).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  test('Should render \'Login\' value for login button', () => {
    const login = screen.getByText(/Login/);
    const submitBtn = screen.getByTestId('submitBtn');

    expect(login).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('Should render email input field', () => {
    const emailField = screen.getByTestId('loginInputEmail');

    expect(emailField).toBeInTheDocument();
  });

  test('Should render password input field', () => {
    const passwordField = screen.getByTestId('loginInputPassword');

    expect(passwordField).toBeInTheDocument();
  });

//   ToDo: Update test suite with input values
//   test('Should render \'Circular progress\' after click on login button', async () => {
//     const login = screen.getByText(/Login/);
//     const submitBtn = screen.getByTestId('submitBtn');

//     expect(login).toBeInTheDocument();
//     expect(submitBtn).toBeInTheDocument();

//     fireEvent.click(submitBtn);

//     await waitFor(() => {
//       const circularProgress = screen.getByTestId('submitProgress');

//       expect(circularProgress).toBeInTheDocument();
//     });
//   });
});
