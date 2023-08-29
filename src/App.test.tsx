import { render } from '@testing-library/react';

import App from './App';

test('renders Welcome!', () => {
  const app = render(<App />);

  expect(app).toBeDefined();
});
