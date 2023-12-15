import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { BaseProps } from '../../interfaces/baseProps';
import { BoardContext } from '../../context/board/boardContext';

import Timer from './Timer';

describe('Timer component', () => {
  let component: RenderResult;
  let startButton: HTMLElement;
  const enableAdding = jest.fn();
  const disableAdding = jest.fn();
  const startTimer = jest.fn();
  const finalizeTimer = jest.fn();
  const setBoardId = jest.fn();
  const setBoardTime = jest.fn();
  const setTimerVisibility = jest.fn();
  const setBoardStatus = jest.fn();
  const setFormSubmit = jest.fn();
  const selectCard = jest.fn();
  const unselectCard = jest.fn();
  const resetSelectedCards = jest.fn();

  const wrapper = ({ children }: BaseProps) => (
    <BoardContext.Provider
      value={{
        boardId: '',
        boardStatus: 'active',
        boardTime: 5,
        isAddingDisabled: false,
        isTimerStarted: false,
        isTimerFinalized: false,
        isTimerVisible: false,
        isFormSubmit: false,
        selectedCards: [],
        enableAdding,
        disableAdding,
        startTimer,
        finalizeTimer,
        setFormSubmit,
        setBoardId,
        setBoardTime,
        setTimerVisibility,
        setBoardStatus,
        selectCard,
        unselectCard,
        resetSelectedCards
      }}
    >
      {children}
    </BoardContext.Provider>
  );

  beforeEach(() => {
    component = render(<Timer />, { wrapper });
    startButton = screen.getByText(/Start/i);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('renders "Start" button', () => {
    expect(startButton).toBeInTheDocument();
  });

  describe('"Start" button is clicked', () => {
    let timer: HTMLElement;

    beforeEach(() => {
      fireEvent.click(startButton);
      timer = screen.getByTestId('timer');
    });

    test('renders timer', () => {
      expect(startButton).not.toBeInTheDocument();
      expect(timer).toBeInTheDocument();
      expect(timer).toHaveClass('timer');
      expect(timer).toHaveAttribute('aria-description', 'timer section');
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

    test('"Continue" button should be shown when "Reset" button was clicked', async () => {
      const resetButton = screen.getByTestId('reset');

      fireEvent.click(resetButton);

      await waitFor(
        () => {
          expect(screen.getByTestId('continue')).toBeInTheDocument();
        },
        { timeout: 100 }
      );
    });

    test('should show a time', async () => {
      const pauseButton = screen.getByTestId('pause');

      fireEvent.click(pauseButton);

      await waitFor(
        () => {
          expect(screen.getByText('00:05:00')).toBeInTheDocument();
          expect(screen.getByTestId('continue')).toBeInTheDocument();
        },
        { timeout: 100 }
      );
    });

    test('should disable adding buttons when "Pause" button was clicked', async () => {
      const pauseButton = screen.getByTestId('pause');

      fireEvent.click(pauseButton);

      await waitFor(
        () => {
          expect(disableAdding).toHaveBeenCalled();
        },
        { timeout: 100 }
      );
    });

    test('disable adding buttons when "Reset" button was clicked', async () => {
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
