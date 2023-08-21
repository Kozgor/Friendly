import { RenderResult, render, screen } from '@testing-library/react';
import Board from './Board';

describe('Board component', () => {
  let component: RenderResult;

  const onSignMock = jest.fn();

  beforeEach(() => {
    component = render(<Board fullName="Jack" onSignOut={onSignMock} />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });

  test('renders BoardHeader and display username', () => {
    const username = screen.getByText(/Jack/i);

    expect(username).toBeInTheDocument();
  });

  test('renders columns', () => {
    const columnsAmount = 3;
    const board = screen.getByTestId('board');

    expect(board).toBeInTheDocument();
    expect(board).toHaveClass('board');
    expect(board.children.length).toBe(columnsAmount);
  });
});
