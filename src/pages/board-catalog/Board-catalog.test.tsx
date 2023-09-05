import * as router from 'react-router';
import { RenderResult, fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import axios from 'axios';

import BoardCatalog from './Board-catalog';
import Login from '../login/Login';

describe('Board-catalog component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  const mockBoard = jest.fn(() =>
    Promise.resolve({
      data: {
        columns: [
          {
            id: 'start',
            avatar: '',
            cards: [],
            style: '',
            subtitle: 'Subtitle 1',
            title: 'Start'
          }
        ],
        name: 'Test Board',
        status: 'active',
        theme: 'NEUTRAL',
        timer: 15,
        __v: 0,
        _id: '4123wejflksajpoq'
      }
    })
  );

  const routesConfig = [{ path: '/board-catalog', element: <BoardCatalog /> }, { path: '/auth', element: <Login /> }];

  beforeAll(() => {
    localStorage.setItem('fullName', 'User');
    localStorage.setItem('token', 'testToken');
    localStorage.setItem('role', 'user');
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    // jest.spyOn(axios, 'get').mockImplementation(mockBoard);
  });

  beforeEach(() => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/board-catalog']
    });
    component = render(<RouterProvider router={router} />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('Should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('Should render board', () => {
    const board = screen.getByTestId('board');

    expect(board).toBeInTheDocument();
  });

  test('Should render fullName', () => {
    const fullName = screen.getByText(/Hello, User/);

    expect(fullName).toBeInTheDocument();
  });

  test('Should signOut, clear localStorage and navigate to `auth`', () => {
    const signOutButton = screen.getByTestId('signOut');
    fireEvent.click(signOutButton);

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const fullName = localStorage.getItem('fullName');

    expect(token).toBeUndefined;
    expect(role).toBeUndefined;
    expect(fullName).toBeUndefined;
    expect(navigate).toHaveBeenCalledWith('/auth');
  });
});
