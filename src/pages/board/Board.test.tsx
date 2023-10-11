import * as router from 'react-router';
import { RenderResult, fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Board from '../../components/Board/Board';
import Login from '../../components/Login/Login';

import store from '../../store/store';


describe('Board component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  const mockBoard = jest.fn(() =>
    Promise.resolve({
      data: {
        columns: [
          {
            columnId: 'start',
            columnAvatar: '',
            // columnCards: [],
            columnStyle: '',
            columnSubtitle: 'Subtitle 1',
            columnTitle: 'Start'
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

  const routesConfig = [{ path: '/board', element: <Board /> }, { path: '/auth', element: <Login /> }];

  beforeAll(() => {
    localStorage.setItem('fullName', 'User');
    localStorage.setItem('token', 'testToken');
    localStorage.setItem('role', 'user');
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    // jest.spyOn(axios, 'get').mockImplementation(mockBoard);
  });

  beforeEach(() => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/board']
    });
    component = render(<Provider store={store}>
      <RouterProvider router={router} />
    </Provider>);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render board', () => {
    const board = screen.getByTestId('board');

    expect(board).toBeInTheDocument();
  });

  test('should signOut, clear localStorage and navigate to "auth"', () => {
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
