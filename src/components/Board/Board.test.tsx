import { RenderResult, cleanup, render, screen } from '@testing-library/react';
import Board from './Board';
import { BoardProvider } from '../../context/board/boardContext';
import store from '../../store/store';

import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router';

import { LOCAL_USER_PROFILE, STORE_USER_PROFILE } from '../../mocks/user';

const getUserById = jest.fn(() => {
  STORE_USER_PROFILE;
});
const getLocalUserData = jest.fn(() => {
  LOCAL_USER_PROFILE;
});
const getActiveBoard = jest.fn();
const getFinalizedBoard = jest.fn();
const getFinalColumnData = jest.fn();
const getUserColumnData = jest.fn();

jest.mock('../../utils/localStorageManager', () => ({
  ...jest.requireActual('../../utils/localStorageManager'),
  getLocalUserData
}));

jest.mock('../../api/UserAPI', () => ({
  ...jest.requireActual('../../api/UserAPI'),
  getUserById
}));

jest.mock('../../api/BoardAPI', () => ({
  ...jest.requireActual('../../api/BoardAPI'),
  getActiveBoard,
  getFinalizedBoard
}));

jest.mock('../../api/ColumnAPI', () => ({
  ...jest.requireActual('../../api/ColumnAPI'),
  getFinalColumnData,
  getUserColumnData
}));

describe('Board component', () => {
  process.env.REACT_APP_FRIENDLY_DOMAIN = 'https://test.com/';
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <BoardProvider>
            <Board />
          </BoardProvider>
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await component.unmount();
  });

  test('should mount component properly', async () => {
    await expect(component).toBeTruthy();
  });
});
