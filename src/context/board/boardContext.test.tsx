/* eslint-disable prefer-destructuring */
import { fireEvent, render } from '@testing-library/react';

import { BoardContext, BoardProvider } from './boardContext';

describe('BoardProvider', () => {
  let getByTestId: any;

  beforeEach(() => {
    const renderResult = render(
      <BoardProvider>
        <BoardContext.Consumer>
          {(context) => (
            <div>
              <button data-testid="enable-button" onClick={context.enableAdding}>
                Enable Adding
              </button>
              <button data-testid="disable-button" onClick={context.disableAdding}>
                Disable Adding
              </button>
              <span data-testid="is-adding-disabled">{context.isAddingDisabled.toString()}</span>
              <button data-testid="set-board-id-button" onClick={() => context.setBoardId('testId')}>
                Set Board ID
              </button>
              <span data-testid="board-id">{context.boardId}</span>
            </div>
          )}
        </BoardContext.Consumer>
      </BoardProvider>
    );

    getByTestId = renderResult.getByTestId;
  });

  it('should update state when enableAdding and disableAdding functions are called', () => {
    const enableButton = getByTestId('enable-button');
    const disableButton = getByTestId('disable-button');
    const isAddingDisabledElement = getByTestId('is-adding-disabled');

    expect(isAddingDisabledElement.textContent).toBe('true');

    fireEvent.click(enableButton);
    expect(isAddingDisabledElement.textContent).toBe('false');

    fireEvent.click(disableButton);
    expect(isAddingDisabledElement.textContent).toBe('true');
  });

  it('Should set board ID when setBoardId function is called', () => {
    const setBoardIdButton = getByTestId('set-board-id-button');
    const boardIdElement = getByTestId('board-id');

    expect(boardIdElement.textContent).toBe('');

    fireEvent.click(setBoardIdButton);
    expect(boardIdElement.textContent).toBe('testId');
  });
});
