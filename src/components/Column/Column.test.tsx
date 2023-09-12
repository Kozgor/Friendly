import { RenderResult, render, screen } from '@testing-library/react';

import { BaseProps } from '../../interfaces/baseProps';
import Column from './Column';
import { ColumnContext } from '../../store/column-context';

describe('Column component', () => {
  let component: RenderResult;
  const enableAdding = jest.fn();
  const disableAdding = jest.fn();
  const setBoardId = jest.fn();

  beforeEach(() => {
    component = render(
      <Column
        columnId="start"
        columnTitle="Start"
        columnSubtitle="What our team should start doing."
        columnAvatar=""
        columnStyle=""
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

  test('renders button for adding new comments', () => {
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-label', 'Add new comment');
  });

  test('render enabled button if isAddingDisabled property is false', async () => {
    await component.unmount();
    const wrapper = ({ children }: BaseProps) => (
      <ColumnContext.Provider
        value={{
          boardId: '',
          isAddingDisabled: false,
          enableAdding,
          disableAdding,
          setBoardId
        }}
      >
        {children}
      </ColumnContext.Provider>
    );

    render(
      <Column
        columnId=""
        columnTitle=""
        columnSubtitle=""
        columnAvatar=""
        columnStyle=""
      />,
      { wrapper }
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
