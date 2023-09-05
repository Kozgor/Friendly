import { RenderResult, render, screen } from '@testing-library/react';

import Toastr from './Toastr';

describe('Toastr component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Toastr itemName="MyBoard" message=" board was successfully published!" />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });

  test('component get itemName prop', () => {
    const boardName = screen.getByTestId('boardName');

    expect(boardName).toContainHTML('MyBoard');
  });

  test('component show message', () => {
    const message = screen.getByTestId('message');

    expect(message).toBeInTheDocument();
  });
});
