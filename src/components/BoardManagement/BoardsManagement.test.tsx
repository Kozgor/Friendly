import * as router from 'react-router';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../../store/store';

import Admin from '../../pages/admin/Admin';
import BoardsManagementPage from '../../pages/boardsManagement/BoardsManagementPage';
import CreateBoardPage from '../../pages/createBoard/CreateBoard';
import DefaultBoardPage from '../../pages/defaultBoard/DefaultBoard';

const getBoardById = jest.fn();
const finalizeBoard = jest.fn();

jest.mock('../../api/BoardAPI', () => ({
  ...jest.requireActual('../../api/BoardAPI'),
  getBoardById,
  finalizeBoard
}));

describe('BoardsManagement component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  const routesConfig = [
    {
      path: '/admin',
      element: <Admin />,
      children: [
        { path: '/admin/new_board', element: <CreateBoardPage /> },
        { path: '/admin/default_board', element: <DefaultBoardPage /> },
        { path: '/admin/boards_management', element: <BoardsManagementPage /> }
      ]
    }
  ];

  beforeAll(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  beforeEach(() => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/admin/boards_management']
    });
    component = render(<Provider store={store}>
      <RouterProvider router={router} />
    </Provider>);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render heading title', () => {
    const templates = screen.getByTestId('board-management-title');

    expect(templates).toBeInTheDocument();
  });

  test('should render board name', () => {
    const templates = screen.getByTestId('board-name');

    expect(templates).toBeInTheDocument();
  });

  test('should render board status', () => {
    const templates = screen.getByTestId('board-status');

    expect(templates).toBeInTheDocument();
  });

  test('should render divider component', () => {
    const divider = screen.getByTestId('divider');

    expect(divider).toBeInTheDocument();
  });

  test('should render "No active board" when isFinalizeButton is false', () => {
    const templates = screen.getByTestId('board-name');

    expect(templates).toHaveTextContent('No active board');
  });

  test('should render "Finalized" when isFinalizeButton is false', () => {
    const templates = screen.getByTestId('board-status');

    expect(templates).toHaveTextContent('Finalized');
  });

  test('should trigger finalize board function when the button is clicked', () => {
    const finalizeButton = screen.getByTestId('finalize-button');

    waitFor(() => {
      fireEvent.click(finalizeButton);
      expect(finalizeBoard).toHaveBeenCalled();
      expect(finalizeBoard).toHaveBeenCalledTimes(1);
    });
  });
});
