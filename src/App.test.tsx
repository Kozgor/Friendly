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

  test('renders greeting and `Sign Up` form', () => {
    const greeting = screen.getByText(/Welcome!/i);
    const form = screen.getByTestId('signUpForm');

    expect(greeting).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });
});
