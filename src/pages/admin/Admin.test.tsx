import * as router from 'react-router';
import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import Admin from './Admin';
import CreateBoard from './createBoard/CreateBoard';
import DefaultBoard from './defaultBoard/DefaultBoard';

describe('Admin component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  const routesConfig = [
    {
      path: '/admin',
      element: <Admin />,
      children: [
        { path: '/admin/', element: <CreateBoard /> },
        { path: '/admin/template', element: <DefaultBoard /> }
      ]
    }
  ];

  beforeAll(() => {
    localStorage.setItem('fullName', 'User');
    localStorage.setItem('token', 'testToken');
    localStorage.setItem('role', 'user');
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  beforeEach(() => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/admin']
    });
    component = render(<RouterProvider router={router} />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('Should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('Should render header with fullName `Admin`', () => {
    const message = screen.getByText('Hello, Admin');

    expect(message).toBeInTheDocument();
  });

  test('Should render signOut button', () => {
    const signOutButton = screen.getByTestId('signOut');

    expect(signOutButton).toBeInTheDocument();
  });

  test('Should not render timer', () => {
    const timerStartButton = screen.queryByTestId('timerStartButton');

    expect(timerStartButton).toBeNull();
  });

  test('Should render boardName as empty string', () => {
    const boardName = screen.queryByTestId('boardName');

    expect(boardName?.innerHTML).toBe('');
  });

  test('Should render drawer', () => {
    const drawer = screen.getByTestId('drawer');

    expect(drawer).toBeInTheDocument();
  });

  test('Should render divider', () => {
    const divider = screen.getByTestId('divider');

    expect(divider).toBeInTheDocument();
  });

  test('Should render newBoardTab', () => {
    const newBoardTab = screen.getByTestId('newBoardTab');

    expect(newBoardTab).toBeInTheDocument();
  });

  test('Should render `Create Board` component', () => {
    const templates = screen.getByTestId('templates');

    expect(templates).toBeInTheDocument();
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

  test('Should navigate to `/admin` when click on `newBoardTab` button', () => {
    const newBoardTab = screen.getByTestId('newBoardTab');

    fireEvent.click(newBoardTab);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/admin');
  });
});
