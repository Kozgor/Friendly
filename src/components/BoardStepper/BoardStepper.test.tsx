import * as router from 'react-router';
import { RenderResult, render } from '@testing-library/react';
import BoardStepper from './BoardStepper';

import { ACTIVE_BOARD } from '../../mocks/board';
import Board from '../Board/Board';

import { Provider } from 'react-redux';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import store from '../../store/store';

import BoardsManagement from '../BoardManagement/BoardsManagement';
import { BoardContext } from '../../context/board/boardContext';
import { BaseProps } from '../../interfaces/baseProps';

const finalizeBoard = jest.fn();

jest.mock('../../api/BoardAPI', () => ({
  ...jest.requireActual('../../api/BoardAPI'),
  finalizeBoard
}));

describe('BoardStepper Component', () => {
  let component: RenderResult;
  const navigate = jest.fn();
  const enableAdding = jest.fn();
  const disableAdding = jest.fn();
  const finalizeTimer = jest.fn();
  const setBoardId = jest.fn();
  const setBoardStatus = jest.fn();
  const setFormSubmit = jest.fn();

  const routesConfig = [
    {
      path: '/admin/boards_management',
      element: <BoardsManagement />
    }
  ];
  const wrapper = ({ children }: BaseProps) => (
    <BoardContext.Provider
      value={{
        boardId: ACTIVE_BOARD._id,
        boardStatus: 'active',
        isAddingDisabled: false,
        isTimerFinalized: false,
        isFormSubmit: false,
        enableAdding,
        disableAdding,
        finalizeTimer,
        setFormSubmit,
        setBoardId,
        setBoardStatus
      }}
    >
      {children}
    </BoardContext.Provider>
  );
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

    component = render(
      <BoardStepper
        board={ACTIVE_BOARD}
    />, { wrapper }
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });
});
