import * as router from 'react-router';
import { INITIAL_LOCAL_BOARD, LOCAL_ADMIN_PROFILE } from '../../mocks/user';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CreateBoard from '../CreateBoard/CreateBoard';
import DefaultBoard from '../DefaultBoard/DefaultBoard';
import MainLayout from './MainLayout';
import store from '../../store/store';

const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();

jest.mock('../../utils/localStorageManager', () => ({
    localStorageManager: () => ({
      saveLocalUserData,
      removeLocalUserData,
      getLocalUserData: () => LOCAL_ADMIN_PROFILE,
      getLocalBoardDatails: () => INITIAL_LOCAL_BOARD
    })
}));


describe('Dashboard component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  const routesConfig = [
    {
      path: '/admin',
      element: <MainLayout />,
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

  test('should update the URL and triggers the action after click on "Default Board"', () => {
    const newBoardItem = screen.getByTestId('defaultBoard');

    fireEvent.click(newBoardItem);

    waitFor(() => {
      expect(window.location.pathname).toBe('/admin/new_board/default_board');
    });
  });
});


