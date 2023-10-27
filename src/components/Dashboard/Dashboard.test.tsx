import * as router from 'react-router';
import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ADMIN_PAGE_HEADER_TITLE } from '../../constants';
import { LOCAL_ADMIN_PROFILE } from '../../mocks/user';
import { Provider } from 'react-redux';

import CreateBoard from '../CreateBoard/CreateBoard';
import Dashboard from './Dashboard';
import DefaultBoard from '../DefaultBoard/DefaultBoard';
import store from '../../store/store';

const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();

jest.mock('../../utils/localStorageManager', () => ({
    localStorageManager: () => ({
      saveLocalUserData,
      removeLocalUserData,
      getLocalUserData: () => LOCAL_ADMIN_PROFILE
    })
}));

let newBoardTab: HTMLElement;
let boardsManagementTab: HTMLElement;

describe('Dashboard component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  const routesConfig = [
    {
      path: '/admin',
      element: <Dashboard />,
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

    newBoardTab = screen.getByTestId('new-board');
    boardsManagementTab = screen.getByTestId('boards-management');
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

  test('should render boardName as "friendly"', () => {
    const boardName = screen.queryByTestId('boardName');

    expect(boardName?.innerHTML).toBe(ADMIN_PAGE_HEADER_TITLE);
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
    expect(newBoardTab).toBeInTheDocument();
  });

  test('should render "Boards Management" tab', () => {
    expect(boardsManagementTab).toBeInTheDocument();
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
    fireEvent.click(newBoardTab);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('new_board');
  });

  test('should navigate to "boards_management" when click on "Boards Management" tab button', () => {
    fireEvent.click(boardsManagementTab);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('boards_management');
  });
});
