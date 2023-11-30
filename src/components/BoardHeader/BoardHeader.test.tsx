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

import { LOCAL_USER_PROFILE, STORE_USER_PROFILE } from '../../mocks/user';

const addUserToStore = jest.fn();
const removeUserFromStore = jest.fn();

jest.mock('../../utils/storeUserManager', () => ({
    useStoreUser: () => ({
      addUserToStore,
      removeUserFromStore,
      getUserFromStore: () => STORE_USER_PROFILE
    })
}));

const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();

jest.mock('../../utils/localStorageManager', () => ({
    localStorageManager: () => ({
      saveLocalUserData,
      removeLocalUserData,
      getLocalUserData: () => LOCAL_USER_PROFILE
    })
}));

describe('BoardHeader component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <BoardHeader
            isAdmin={true}
            firstTitle={'firstTitle'}
            secondTitle={'secondTitle'}
            backward={'backward'}
            forward={'forward'}
          />
        </MemoryRouter>
      </Provider>
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
