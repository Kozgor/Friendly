import { BOARD_SUMMARY, EMPTY_BOARD_SUMMARY } from '../../mocks/board';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import BoardSummary from './BoardSummary';
import store from '../../store/store';

const exportDataAsCsv = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../../api/BoardSummaryAPI', () => ({
  boardSummaryAPI: jest.fn(() => ({
    getBoardSummary: jest.fn(() => Promise.resolve(BOARD_SUMMARY))
  }))
}));

jest.mock('ag-grid-react', () => ({
  AgGridReact: jest.fn(({ ref }) => {
    if (ref) {
      ref.current = {
        api: {
          exportDataAsCsv
        }
      };
    }

    return null;
  })
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Board summary component', () => {
  process.env.REACT_APP_FRIENDLY_DOMAIN = 'https://test.com/';
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <BoardSummary />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should mount Ag-Grid', () => {
    const agGrid = screen.getByTestId('board-summary-grid');

    expect(agGrid).toBeTruthy();
  });


  test('should enable download CSV button ', () => {
    const downloadCSVButton = screen.getByText('Download CSV Report');

    waitFor( () => {
      fireEvent.click(downloadCSVButton);

      expect(exportDataAsCsv).toHaveBeenCalled();
      expect(exportDataAsCsv).toHaveBeenCalledTimes(1);
    });
  });

  test('should disable download CSV button ', async () => {
    component.unmount();

    jest.mock('../../api/BoardSummaryAPI', () => ({
      boardSummaryAPI: jest.fn(() => ({
        getBoardSummary: jest.fn(() => Promise.resolve(EMPTY_BOARD_SUMMARY))
      }))
    }));

    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <BoardSummary />
        </MemoryRouter>
      </Provider>
    );

    const downloadCSVButton = screen.getByText('Download CSV Report');

    waitFor(() => {
      fireEvent.click(downloadCSVButton);

      expect(exportDataAsCsv).not.toHaveBeenCalled();
    });
  });
});
