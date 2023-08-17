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

  test('renders text', () => {
    const text = screen.getByText(/Some text/i);

    expect(text).toBeInTheDocument();
    expect(text).toHaveClass('comment__message');
  });
});
