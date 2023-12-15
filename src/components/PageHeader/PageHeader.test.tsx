import { INITIAL_LOCAL_BOARD, LOCAL_ADMIN_PROFILE } from '../../mocks/user';

const removeUserFromStore = jest.fn();
const removeLocalUserData = jest.fn();

jest.mock('../../utils/storeUserManager', () => ({
  useStoreUser: () => ({
    removeUserFromStore
  })
}));

jest.mock('../../utils/localStorageManager', () => ({
  localStorageManager: () => ({
    removeLocalUserData,
    getLocalUserData: () => LOCAL_ADMIN_PROFILE,
    getLocalBoardDatails: () => INITIAL_LOCAL_BOARD
  })
}));

import * as router from 'react-router';
import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { BaseProps } from '../../interfaces/baseProps';
import { BoardContext } from '../../context/board/boardContext';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import PageHeader from './PageHeader';
import store from '../../store/store';

describe('PageHeader component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  beforeAll(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  const enableAdding = jest.fn();
  const disableAdding = jest.fn();
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

  const wrapper = ({ children }: BaseProps) => (
    <BoardContext.Provider
      value={{
        boardId: '',
        boardStatus: 'active',
        boardTime: 5,
        isAddingDisabled: false,
        isTimerStarted: false,
        isTimerFinalized: false,
        isTimerVisible: true,
        isFormSubmit: false,
        selectedCards: [],
        enableAdding,
        disableAdding,
        startTimer,
        finalizeTimer,
        setFormSubmit,
        setBoardId,
        setBoardTime,
        setTimerVisibility,
        setBoardStatus,
        selectCard,
        unselectCard,
        resetSelectedCards
      }}
    >
      {children}
    </BoardContext.Provider>
  );

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/board/']}>
          <PageHeader />
        </MemoryRouter>
      </Provider>, { wrapper }
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should be "Sign out" button in the document', () => {
    const signOutButton = screen.getByTestId('signOut');

    expect(signOutButton).toBeTruthy();
  });

  test('should sign out the user', () => {
    const signOutButton = screen.getByTestId('signOut');

    fireEvent.click(signOutButton);

    expect(removeLocalUserData).toHaveBeenCalled();
    expect(removeUserFromStore).toHaveBeenCalled();
  });

  test('should display "Start Timer" button for timer', () => {
    const startButton = screen.getByText('Start Timer');

    expect(startButton).toBeInTheDocument();
  });
});
