import { RenderResult, fireEvent, render, waitFor } from '@testing-library/react';
import BoardStepper from './BoardStepper';

import { ACTIVE_BOARD, BOARD_STATUSES, FINALIZED_BOARD } from '../../mocks/board';
import { act } from 'react-dom/test-utils';

const finalizeBoard = jest.fn();

jest.mock('../../api/BoardAPI', () => ({
  ...jest.requireActual('../../api/BoardAPI'),
  finalizeBoard
}));

describe('BoardStepper Component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <BoardStepper
        board={ACTIVE_BOARD}
      />
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render all possible steps', () => {
    const steps = [BOARD_STATUSES[1], BOARD_STATUSES[2]];
    const activeStep = component.getByTestId(`${steps[0]}-step`);
    const finalStep = component.getByTestId(`${steps[1]}-step`);

    expect(activeStep).toBeInTheDocument();
    expect(finalStep).toBeInTheDocument();
  });

  test('should render final message', () => {
    component = render(<BoardStepper board={FINALIZED_BOARD} />);

    const noStepsMessage = component.getByTestId('no-steps-message');

    expect(noStepsMessage).toBeInTheDocument();
  });

  test('should finalize board on step if board is active', () => {
    const nextButton = component.getByTestId('next-button');

    waitFor(() => {
      act(() => {
        fireEvent.click(nextButton);

        const noStepsMessage = component.getByTestId('no-steps-message');

        expect(noStepsMessage).toBeInTheDocument();
        expect(finalizeBoard).toHaveBeenCalled();
        expect(finalizeBoard).toHaveBeenCalledWith(ACTIVE_BOARD._id);
      });
    });
  });
});
