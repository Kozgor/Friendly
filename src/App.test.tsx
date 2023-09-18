import { RenderResult, render } from '@testing-library/react';
import store from './store/store';

import App from './App';

import { Provider } from 'react-redux';

describe('App component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });
});
