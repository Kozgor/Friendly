import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { PARTICIPANTS_LIST } from '../../mocks/participants';
import Participants from './Participants';

const SELECT_ALL_CHECKBOXES = 'select-all-checkboxes';

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

  it('should render "Select all" checkbox', () => {
    const select = screen.getByTestId('select');

    expect(select).toBeInTheDocument();

    waitFor(() => {
      fireEvent.click(select);
      const selectAllCheckbox = screen.getByTestId(SELECT_ALL_CHECKBOXES);

      expect(selectAllCheckbox).toBeInTheDocument();
    });
  });

  it('should check all checkboxes when "Select All" is clicked', () => {
    const select = screen.getByTestId('select');

    expect(select).toBeInTheDocument();

    waitFor(() => {
      fireEvent.click(select);

      const selectAllCheckbox = screen.getByTestId(SELECT_ALL_CHECKBOXES);

      fireEvent.click(selectAllCheckbox);

      PARTICIPANTS_LIST.forEach((participant) => {
        const checkbox = screen.getByTestId(`select-checkbox-${participant}`);

        expect(checkbox).toBeChecked();
        expect(collectParticipants).toHaveBeenCalledWith(PARTICIPANTS_LIST);
      });
    });
  });

  it('should check single checkbox on click', () => {
    const select = screen.getByTestId('select');

    expect(select).toBeInTheDocument();

    waitFor(() => {
      fireEvent.click(select);

      const selectCheckbox = screen.getByTestId(`select-checkbox-${PARTICIPANTS_LIST[0]}`);

      fireEvent.click(selectCheckbox);

      expect(selectCheckbox).toBeChecked();
      expect(collectParticipants).toHaveBeenCalledWith(PARTICIPANTS_LIST[0]);
    });
  });
});
