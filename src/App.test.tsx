import { RenderResult, render } from '@testing-library/react';

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
});
