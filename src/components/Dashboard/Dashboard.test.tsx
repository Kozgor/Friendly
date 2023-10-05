import * as router from 'react-router';
import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import Admin from './Dashboard';
import CreateBoard from '../CreateBoard/CreateBoard';
import DefaultBoard from '../DefaultBoard/DefaultBoard';

import { Provider } from 'react-redux';
import store from '../../store/store';

import { LOCAL_ADMIN_PROFILE } from '../../mocks/user';

const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();

jest.mock('../../utils/localStorageManager', () => ({
    localStorageManager: () => ({
      saveLocalUserData,
      removeLocalUserData,
      getLocalUserData: () => LOCAL_ADMIN_PROFILE
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

  test('should render boardName as "Admin page"', () => {
    const boardName = screen.queryByTestId('boardName');

    expect(boardName?.innerHTML).toBe('Admin page');
  });

  test('should render drawer', () => {
    const drawer = screen.getByTestId('drawer');

    expect(drawer).toBeInTheDocument();
  });

  test('should render divider', () => {
    const divider = screen.getByTestId('divider');

    expect(divider).toBeInTheDocument();
  });

  test('should render "New Board" tad', () => {
    const newBoardTab = screen.getByText('New Board');

    expect(newBoardTab).toBeInTheDocument();
  });

  test('should render "Boards Management" tab', () => {
    const newBoardTab = screen.getByText('Boards Management');

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

  test('should navigate to "new_board" when click on "New Board" tab button', () => {
    const newBoardTab = screen.getByText('New Board');

    fireEvent.click(newBoardTab);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('new_board');
  });
  test('should navigate to "boards_management" when click on "Boards Management" tab button', () => {
    const newBoardTab = screen.getByText('Boards Management');

    fireEvent.click(newBoardTab);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('boards_management');
  });
});
