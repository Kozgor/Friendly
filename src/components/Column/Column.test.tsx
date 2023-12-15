import { RenderResult, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { BaseProps } from '../../interfaces/baseProps';
import Column from './Column';

import { BoardContext } from '../../context/board/boardContext';

describe('Column component', () => {
  let component: RenderResult;
  const enableAdding = jest.fn();
  const disableAdding = jest.fn();
  const finalizeTimer = jest.fn();
  const setBoardId = jest.fn();
  const setBoardTime = jest.fn();
  const setTimerVisibility = jest.fn();
  const setBoardStatus = jest.fn();
  const setFormSubmit = jest.fn();

  beforeEach(() => {
    const wrapper = ({ children }: BaseProps) => (
      <BoardContext.Provider
        value={{
          boardId: '',
          boardStatus: 'active',
          boardTime: 5,
          isAddingDisabled: false,
          isTimerVisible: false,
          isTimerFinalized: false,
          isFormSubmit: false,
          enableAdding,
          disableAdding,
          finalizeTimer,
          setFormSubmit,
          setBoardId,
          setBoardTime,
          setTimerVisibility,
          setBoardStatus
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
});
