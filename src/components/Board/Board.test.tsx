const getUserById = jest.fn();
const getActiveBoard = jest.fn();
const getFinalizedBoard = jest.fn();
const getFinalColumnData = jest.fn();
const getUserColumnData = jest.fn();

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

jest.mock('../../api/UserAPI', () => ({
  ...jest.requireActual('../../api/UserAPI'),
  getUserById
}));

import { RenderResult, render } from '@testing-library/react';
import { BoardProvider } from '../../context/board/boardContext';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../../store/store';

import Board from './Board';

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
