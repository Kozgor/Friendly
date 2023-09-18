import { RenderResult, render, screen } from '@testing-library/react';
import Board from './Board';
import { BoardProvider } from '../../context/board/board-context';
import store from '../../store/store';

import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router';

describe('Board component', () => {
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
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render default amount of columns', () => {
    const columnsAmount = 0;
    const board = screen.getByTestId('board');

    expect(board).toBeInTheDocument();
    expect(board).toHaveClass('board');
    expect(board.children.length).toBe(columnsAmount);
  });
});
