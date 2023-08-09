import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Welcome!', () => {
  render(<App />);
  const password = screen.getByText(/Password/i);

  expect(password).toBeInTheDocument();
});
