import { RenderResult, render, screen } from '@testing-library/react';

import App from './App';

describe('App component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<App />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });

  test('renders text', () => {
    const text = screen.getByText(/Welcome!/i);

    expect(text).toBeInTheDocument();
  });
});
