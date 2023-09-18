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

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should show board name', () => {
    const boardName = screen.getByTestId('boardName');

    expect(boardName).toContainHTML('MyBoard');
  });

  test('should show a message', () => {
    const message = screen.getByTestId('message');

    expect(message).toBeInTheDocument();
  });
});
