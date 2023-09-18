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

import { dummyLocalUserProfile, dummyStoreUserProfile } from '../../mocks/user';

const addUserToStore = jest.fn();
const removeUserFromStore = jest.fn();

jest.mock('../../utils/storeUserManager', () => ({
    useStoreUser: () => ({
      addUserToStore,
      removeUserFromStore,
      getUserFromStore: () => dummyStoreUserProfile
    })
}));

const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();

jest.mock('../../utils/localUserManager', () => ({
    localStorageManager: () => ({
      saveLocalUserData,
      removeLocalUserData,
      getLocalUserData: () => dummyLocalUserProfile
    })
}));


describe('BoardHeader component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <BoardHeader
            boardName="RETROSPECTIVE"
            isTimerVisible={true}
            time={0}
          />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('Should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('Should be \'Sign out\' button in the document', () => {
    const signOutButton = screen.getByTestId('signOut');

    expect(signOutButton).toBeTruthy();
  });

  test('Should sign out the user', () => {
    const signOutButton = screen.getByTestId('signOut');

    fireEvent.click(signOutButton);

    expect(removeLocalUserData).toHaveBeenCalled();
    expect(removeUserFromStore).toHaveBeenCalled();
  });

  test('Should display `Start Timer` button for timer', () => {
    const startButton = screen.getByText('Start Timer');

    expect(startButton).toBeInTheDocument();
  });
});
