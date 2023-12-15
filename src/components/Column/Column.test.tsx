import { RenderResult, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { BaseProps } from '../../interfaces/baseProps';
import Column from './Column';

import { BoardContext } from '../../context/board/boardContext';

describe('Column component', () => {
  let component: RenderResult;
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

  beforeEach(() => {
    const wrapper = ({ children }: BaseProps) => (
      <BoardContext.Provider
        value={{
          boardId: '',
          boardStatus: 'active',
          boardTime: 5,
          isAddingDisabled: false,
          isTimerStarted: false,
          isTimerVisible: false,
          isTimerFinalized: false,
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

    component = render(
      <Column
        columnId="start"
        columnTitle="Start"
        columnSubtitle="What our team should start doing."
        columnAvatar=""
        columnStyle=""
        columnCards={[]}
      />, { wrapper }
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render props values', () => {
    const title = screen.getByText('Start');

    expect(title).toBeInTheDocument();
  });

  test('should render button for adding new comments', async () => {
    await component.unmount();
    const wrapper = ({ children }: BaseProps) => (
      <BoardContext.Provider
        value={{
          boardId: '',
          boardStatus: 'active',
          boardTime: 5,
          isAddingDisabled: true,
          isTimerStarted: false,
          isTimerVisible: false,
          isFormSubmit: false,
          isTimerFinalized: false,
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

    render(
      <Column
        columnId=""
        columnTitle=""
        columnSubtitle=""
        columnAvatar=""
        columnStyle=""
        columnCards={[]}
      />,
      { wrapper }
    );

    const button = screen.getByTestId('addNewCommentButton');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-label', 'Add new comment');
  });

  test('should render enabled button if "isAddingDisabled" property is false', async () => {
    await component.unmount();
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

    render(
      <Column
        columnId=""
        columnTitle=""
        columnSubtitle=""
        columnAvatar=""
        columnStyle=""
        columnCards={[]}
      />,
      { wrapper }
    );

    const button = screen.getByTestId('addNewCommentButton');

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  test('should create a card', () => {
    const button = screen.getByTestId('addNewCommentButton');

    fireEvent.click(button);

    waitFor(() => {
      const cancelButton = screen.getAllByText('Cancel');

      expect(cancelButton).toBeInTheDocument();
    });
  });
});
