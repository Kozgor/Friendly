import { RenderResult, render, screen } from '@testing-library/react';
import FriendlyIcon from './FriendlyIcon';
import { icons } from '../../theme/icons/iconst';

describe('FriendlyIcon component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<FriendlyIcon element={icons.incognito} />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should have the correct icon', () => {
    const friendlyIconElement = screen.getByTestId('incognito-icon');

    expect(friendlyIconElement).toBeInTheDocument();
  });
});
