const finalizeBoard = jest.fn();

jest.mock('../../api/BoardAPI', () => ({
  ...jest.requireActual('../../api/BoardAPI'),
  finalizeBoard
}));

import * as router from 'react-router';
import { RenderResult, render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { ACTIVE_BOARD } from '../../mocks/board';
import { BaseProps } from '../../interfaces/baseProps';
import { BoardContext } from '../../context/board/boardContext';
import { Provider } from 'react-redux';

import BoardStepper from './BoardStepper';
import BoardsManagement from '../BoardManagement/BoardsManagement';
import store from '../../store/store';

describe('BoardStepper Component', () => {
  let component: RenderResult;
  const navigate = jest.fn();
  const enableAdding = jest.fn();
  const disableCommentCreation = jest.fn();
  const startTimer = jest.fn();
  const finalizeTimer = jest.fn();
  const setBoardId = jest.fn();
  const setBoardTime = jest.fn();
  const setTimerVisibility = jest.fn();
  const setBoardStatus = jest.fn();
  const setFormSubmit = jest.fn();
  const selectCard = jest.fn();
  const unselectCard = jest.fn();
  const resetSelectedCards = jest.fn();

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
        boardTime: 5,
        isAddingDisabled: false,
        isTimerStarted: false,
        isTimerFinalized: false,
        isTimerVisible: false,
        isFormSubmit: false,
        selectedCards: [],
        enableAdding,
        disableCommentCreation,
        startTimer,
        finalizeTimer,
        setTimerVisibility,
        setFormSubmit,
        setBoardId,
        setBoardTime,
        setBoardStatus,
        selectCard,
        unselectCard,
        resetSelectedCards
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
