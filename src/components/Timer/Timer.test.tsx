import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { BaseProps } from '../../interfaces/baseProps';
import { BoardContext } from '../../context/board/board-context';

import Timer from './Timer';

describe('Timer component', () => {
  let component: RenderResult;
  let startButton: HTMLElement;
  const enableAdding = jest.fn();
  const disableAdding = jest.fn();

  const wrapper = ({ children }: BaseProps) => (
    <BoardContext.Provider
      value={{
        isAddingDisabled: true,
        enableAdding,
        disableAdding
      }}
    >
      {children}
    </BoardContext.Provider>
  );

  beforeEach(() => {
    component = render(<Timer time={3000} />, { wrapper });
    startButton = screen.getByText(/Start/i);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });

  test('renders `Start` button', () => {
    expect(startButton).toBeInTheDocument();
  });

  describe('`Start` button is clicked', () => {
    let timer: HTMLElement;

    beforeEach(() => {
      fireEvent.click(startButton);
      timer = screen.getByTestId('timer');
    });

    test('renders timer', () => {
      expect(startButton).not.toBeInTheDocument();
      expect(timer).toBeInTheDocument();
      expect(enableAdding).toHaveBeenCalled();
    });

    test('`pause` button should be shown when timer is appeared', () => {
      const pauseButton = screen.getByTestId('pause');

      expect(timer).toBeInTheDocument();
      expect(pauseButton).toBeInTheDocument();
    });

    test('`continue` button should be shown when `pause` button was clicked', async () => {
      const pauseButton = screen.getByTestId('pause');

      fireEvent.click(pauseButton);

      await waitFor(
        () => {
          expect(pauseButton).not.toBeInTheDocument();
          expect(screen.getByTestId('continue')).toBeInTheDocument();
        },
        { timeout: 100 }
      );
    });

    test('`continue` button should be shown when `reset` button was clicked', async () => {
      const resetButton = screen.getByTestId('reset');

      fireEvent.click(resetButton);

      await waitFor(
        () => {
          expect(screen.getByTestId('continue')).toBeInTheDocument();
        },
        { timeout: 100 }
      );
    });

    test('time should be shown', async () => {
      const pauseButton = screen.getByTestId('pause');

      fireEvent.click(pauseButton);

      await waitFor(
        () => {
          expect(screen.getByText('00:00:03')).toBeInTheDocument();
          expect(screen.getByTestId('continue')).toBeInTheDocument();
        },
        { timeout: 100 }
      );
    });

    test('`Submit` button should appear', async () => {
      await waitFor(
        () => {
          expect(screen.queryByTestId('submit')).toBeInTheDocument();
        },
        { timeout: 3100 }
      );
    });

    test('disable adding buttons when `pause` button was clicked', async () => {
      const pauseButton = screen.getByTestId('pause');

      fireEvent.click(pauseButton);

      await waitFor(
        () => {
          expect(disableAdding).toHaveBeenCalled();
        },
        { timeout: 100 }
      );
    });

    test('disable adding buttons when `reset` button was clicked', async () => {
      const resetButton = screen.getByTestId('reset');

      fireEvent.click(resetButton);

      await waitFor(
        () => {
          expect(disableAdding).toHaveBeenCalled();
        },
        { timeout: 100 }
      );
    });
  });
});
