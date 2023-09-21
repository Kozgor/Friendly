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

import { Provider } from 'react-redux';
import store from '../../store/store';

import { dummyLocalAdminProfile } from '../../mocks/user';

const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();

jest.mock('../../utils/localStorageManager', () => ({
    localStorageManager: () => ({
      saveLocalUserData,
      removeLocalUserData,
      getLocalUserData: () => dummyLocalAdminProfile
    })
}));

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
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  beforeEach(() => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/admin']
    });
    component = render(<Provider store={store}>
      <RouterProvider router={router} />
    </Provider>);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await component.unmount();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render header with fullName "Admin"', () => {
    const message = screen.getByText('Hello, Admin');

    expect(message).toBeInTheDocument();
  });

  test('should render signOut button', () => {
    const signOutButton = screen.getByTestId('signOut');

    expect(signOutButton).toBeInTheDocument();
  });

  test('should not render timer', () => {
    const timerStartButton = screen.queryByTestId('timerStartButton');

    expect(timerStartButton).toBeNull();
  });

  test('should render boardName as empty string', () => {
    const boardName = screen.queryByTestId('boardName');

    expect(boardName?.innerHTML).toBe('');
  });

  test('should render drawer', () => {
    const drawer = screen.getByTestId('drawer');

    expect(drawer).toBeInTheDocument();
  });

  test('should render divider', () => {
    const divider = screen.getByTestId('divider');

    expect(divider).toBeInTheDocument();
  });

  test('should render newBoardTab', () => {
    const newBoardTab = screen.getByTestId('newBoardTab');

    expect(newBoardTab).toBeInTheDocument();
  });

  test('should render "Create Board" component', () => {
    const templates = screen.getByTestId('templates');

    expect(templates).toBeInTheDocument();
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

  test('should navigate to "/admin" when click on "newBoardTab" button', () => {
    const newBoardTab = screen.getByTestId('newBoardTab');

    fireEvent.click(newBoardTab);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/admin');
  });
});
