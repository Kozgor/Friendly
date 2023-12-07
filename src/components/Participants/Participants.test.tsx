import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { PARTICIPANTS_LIST } from '../../mocks/participants';
import Participants from './Participants';

describe('FinalizedCard component', () => {
  let component: RenderResult;
  const collectParticipants = jest.fn();

  beforeEach(() => {
    component = render(
      <Participants
        participants={PARTICIPANTS_LIST}
        collectParticipants={collectParticipants}
      />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  it('should render component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Select component', () => {
    const select = screen.getByTestId('select');

    expect(select).toBeInTheDocument();
  });

  it('should select option on click', () => {
    const select = screen.getByTestId('select');

    expect(select).toBeInTheDocument();

    waitFor(() => {
      fireEvent.click(select);

      const selectOption = screen.getByTestId(`select-option-${PARTICIPANTS_LIST[0]}`);

      fireEvent.click(selectOption);

      expect(selectOption).toBeChecked();
      expect(collectParticipants).toHaveBeenCalledWith(PARTICIPANTS_LIST[0]);
    });
  });
});
