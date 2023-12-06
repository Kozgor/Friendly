import { LOCAL_ADMIN_PROFILE, STORE_ADMIN_PROFILE } from '../../mocks/user';
const addUserToStore = jest.fn();
const removeUserFromStore = jest.fn();
const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();

jest.mock('../../utils/storeUserManager', () => ({
  useStoreUser: () => ({
    addUserToStore,
    removeUserFromStore,
    getUserFromStore: () => STORE_ADMIN_PROFILE
  })
}));

jest.mock('../../utils/localStorageManager', () => ({
  localStorageManager: () => ({
    saveLocalUserData,
    removeLocalUserData,
    getLocalUserData: () => LOCAL_ADMIN_PROFILE
  })
}));
import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import BoardHeader from './BoardHeader';
import { Provider } from 'react-redux';
import store from '../../store/store';

import { MemoryRouter } from 'react-router-dom';

import * as router from 'react-router';
import { BaseProps } from '../../interfaces/baseProps';
import { BoardContext } from '../../context/board/boardContext';


describe('BoardHeader component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  beforeAll(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  const enableAdding = jest.fn();
  const disableAdding = jest.fn();
  const finalizeTimer = jest.fn();
  const setBoardId = jest.fn();
  const setBoardTime = jest.fn();
  const setTimerVisibility = jest.fn();
  const setBoardStatus = jest.fn();
  const setFormSubmit = jest.fn();

  const wrapper = ({ children }: BaseProps) => (
    <BoardContext.Provider
      value={{
        boardId: '',
        boardStatus: 'active',
        boardTime: 5,
        isAddingDisabled: false,
        isTimerFinalized: false,
        isTimerVisible: true,
        isFormSubmit: false,
        enableAdding,
        disableAdding,
        finalizeTimer,
        setFormSubmit,
        setBoardId,
        setBoardTime,
        setTimerVisibility,
        setBoardStatus
      }}
    >
      {children}
    </BoardContext.Provider>
  );

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/board/']}>
          <BoardHeader
            isAdmin={true}
            backwardLabel={'backwardLabel'}
            forwardLabel={'forwardLabel'}
            backward={'backward'}
            forward={'forward'}
          />
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
