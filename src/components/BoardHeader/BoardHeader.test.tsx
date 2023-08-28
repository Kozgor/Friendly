import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import BoardHeader from './BoardHeader';

describe('BoardHeader component', () => {
  let component: RenderResult;

  const onSignMock = jest.fn();

  beforeEach(() => {
    component = render(<BoardHeader fullName="Jack" isTimerVisible={true} onSignOut={onSignMock} />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });

  test('display username', () => {
    const username = screen.getByText(/Jack/i);

    expect(username).toBeInTheDocument();
  });

  test('sign out the user', () => {
    const signOutButton = screen.getByTestId('signOut');

    fireEvent.click(signOutButton);

    expect(onSignMock).toHaveBeenCalled();
  });

  test('display `Start` button for timer', () => {
    const startButton = screen.getByText(/Start/i);

    expect(startButton).toBeInTheDocument();
  });
});
