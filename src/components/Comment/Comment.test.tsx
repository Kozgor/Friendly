import { RenderResult, render, screen } from '@testing-library/react';
import Comment from './Comment';

describe('Comment component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<Comment />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });

  test('renders comment message', () => {
    const message = screen.getByText(/Some text/i);

    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('comment__message');
  });
});
