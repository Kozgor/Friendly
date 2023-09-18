import { render } from '@testing-library/react';

import { Provider } from 'react-redux';

import App from './App';
import store from './store/store';

test('renders App component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const textElement = getByText('Welcome to Friendly');

  expect(textElement).toBeInTheDocument();
});
