import * as router from 'react-router';

import {
  RenderResult,
  render,
  screen
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ACTIVE_BOARD } from '../../mocks/board';
import { Provider } from 'react-redux';
import store from '../../store/store';

import Admin from '../../pages/admin/Admin';
import BoardsManagementPage from '../../pages/boardsManagement/BoardsManagementPage';
import CreateBoardPage from '../../pages/createBoard/CreateBoard';
import DefaultBoardPage from '../../pages/defaultBoard/DefaultBoard';

import { BoardContext } from '../../context/board/boardContext';

import { BaseProps } from '../../interfaces/baseProps';

const enableAdding = jest.fn();
const disableAdding = jest.fn();
const finalizeTimer = jest.fn();
const setBoardId = jest.fn();
const setBoardTime = jest.fn();
const setTimerVisibility = jest.fn();
const setBoardStatus = jest.fn();
const setFormSubmit = jest.fn();

const getAllBoards = jest.fn(() => [ACTIVE_BOARD]);
const wrapper = ({ children }: BaseProps) => (
  <BoardContext.Provider
    value={{
      boardId: 'testId',
      boardStatus: 'active',
      boardTime: 5,
      isAddingDisabled: false,
      isTimerFinalized: false,
      isTimerVisible: false,
      isFormSubmit: false,
      enableAdding,
      disableAdding,
      finalizeTimer,
      setTimerVisibility,
      setFormSubmit,
      setBoardId,
      setBoardTime,
      setBoardStatus
    }}
  >
    {children}
  </BoardContext.Provider>
);
jest.mock('../../api/BoardAPI', () => ({
  ...jest.requireActual('../../api/BoardAPI'),
  getAllBoards
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
    </Provider>, { wrapper });
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render heading title', () => {
    const title = screen.getByTestId('board-management-title');

    expect(title).toBeInTheDocument();
  });

  test('should render loading progress', () => {
    const spinner = screen.getByTestId('circular-progress');

    expect(spinner).toBeInTheDocument();
  });
});
