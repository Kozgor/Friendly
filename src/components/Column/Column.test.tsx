import { RenderResult, render, screen } from '@testing-library/react';

import { BaseProps } from '../../interfaces/baseProps';
import Column from './Column';
import { BoardContext } from '../../context/board/board-context';

describe('Column component', () => {
  let component: RenderResult;
  const enableAdding = jest.fn();
  const disableAdding = jest.fn();

  beforeEach(() => {
    component = render(
      <Column
        id="start"
        title="Start"
        subtitle="What our team should start doing."
        avatar=""
        style=""
        cards={[]}
      />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });

  test('renders props values', () => {
    const title = screen.getByText('Start');

    expect(title).toBeInTheDocument();
  });

  xtest('renders button for adding new comments', () => {
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  xtest('renders Comment component and its values', () => {
    const text = screen.getByText('Some text');

    expect(text).toBeInTheDocument();
  });

  xtest('render enabled button if isAddingDisabled property is false', async () => {
    await component.unmount();
    const wrapper = ({ children }: BaseProps) => (
      <BoardContext.Provider
        value={{
          isAddingDisabled: false,
          enableAdding,
          disableAdding
        }}
      >
        {children}
      </BoardContext.Provider>
    );

    render(
      <Column id="" title="" subtitle="" avatar="" style="" cards={[]} />,
      { wrapper }
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
