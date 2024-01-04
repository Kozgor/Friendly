/* eslint-disable max-lines */
import * as router from 'react-router';
import {
    RenderResult,
    fireEvent,
    render,
    screen,
    waitFor
  } from '@testing-library/react';
import InteractivePanel from './InteractivePanel';
import { MemoryRouter } from 'react-router-dom';
import { PropsChildren } from '../../interfaces/interactivePanelChildren';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';

import store from '../../store/store';

const navigate = jest.fn();
const pathBackward = '/backward';
const pathForward = '/forward';
const labelLeft = 'labelLeft';
const labelLeftSummary = 'testing truncate for label text | Summary';
const labelRight = 'labelLeft';
const centerElement: ReactNode = <div data-testId='center-element'></div>;

const leftsideInteractivePanelConfig: PropsChildren[] = [
  {
    path: pathBackward,
    label: labelLeft,
    position: 'left'
  }
];

const leftsideInteractivePanelConfigNoLabel: PropsChildren[] = [
  {
    path: pathBackward,
    position: 'left'
  }
];

const rightsideInteractivePanelConfig: PropsChildren[] = [
  {
    path: pathForward,
    label: labelRight,
    position: 'right'
  }
];

const rightsideInteractivePanelConfigNoLabel: PropsChildren[] = [
  {
    path: pathForward,
    position: 'right'
  }
];

const centralInteractivePanelConfig: PropsChildren[] = [
  {
    element: centerElement,
    position: 'center'
  }
];

const boardSummaryInteractivePanelConfig: PropsChildren[] = [
  {
    path: pathBackward,
    label: labelLeftSummary,
    position: 'left'
  }
];

describe('Title panel:', () => {
  let component: RenderResult;

  beforeAll(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/board/']}>
          <InteractivePanel childrenConfig={leftsideInteractivePanelConfig}/>
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render label left', () => {
    const labelLeft = screen.queryByTestId('panel-left-label');

    expect(labelLeft).toBeInTheDocument();
  });

  test('should render empty string if no label in props for label left', () => {
    component.unmount();

    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/board/']}>
          <InteractivePanel childrenConfig={leftsideInteractivePanelConfigNoLabel}/>
        </MemoryRouter>
      </Provider>
    );
    const labelLeft = screen.queryByTestId('panel-left-label');

    expect(labelLeft).toBeInTheDocument();
    expect(labelLeft?.innerHTML).toBe('');
  });

  test('should render backward element', () => {
    const elementLeft = screen.queryByTestId('panel-left-element');

    expect(elementLeft).toBeInTheDocument();
  });

  test('should navigate backward after click on backward element', () => {
    const elementLeft = screen.queryByTestId('panel-left-element');

    expect(navigate).not.toHaveBeenCalled();
    if (elementLeft) {
      fireEvent?.click(elementLeft);

      expect(elementLeft).toBeInTheDocument();
      expect(navigate).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(pathBackward);
    }
  });

  test('should render label right', () => {
    component.unmount();

    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/board/']}>
          <InteractivePanel childrenConfig={rightsideInteractivePanelConfig}/>
        </MemoryRouter>
      </Provider>
    );

    const labelRight = screen.queryByTestId('panel-right-label');

    expect(component).toBeTruthy();
    expect(labelRight).toBeInTheDocument();
  });

  test('should render empty string if no label in props for label right', () => {
    component.unmount();

    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/board/']}>
          <InteractivePanel childrenConfig={rightsideInteractivePanelConfigNoLabel}/>
        </MemoryRouter>
      </Provider>
    );

    const labelRight = screen.queryByTestId('panel-right-label');

    expect(labelRight).toBeInTheDocument();
    expect(labelRight?.innerHTML).toBe('');
  });

  test('should render forward element', () => {
    component.unmount();

    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/board/']}>
          <InteractivePanel childrenConfig={rightsideInteractivePanelConfig}/>
        </MemoryRouter>
      </Provider>
    );

    const elementRight = screen.queryByTestId('panel-right-element');

    expect(component).toBeTruthy();
    expect(elementRight).toBeInTheDocument();
  });

  test('should navigate forward after click on forward element', () => {
    component.unmount();

    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/board/']}>
          <InteractivePanel childrenConfig={rightsideInteractivePanelConfig}/>
        </MemoryRouter>
      </Provider>
    );

    const elementRight = screen.queryByTestId('panel-right-element');

    expect(navigate).not.toHaveBeenCalled();

    if (elementRight) {
      fireEvent?.click(elementRight);

      expect(elementRight).toBeInTheDocument();
      expect(navigate).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(pathForward);
    }
  });

  test('should render element in center', () => {
    component.unmount();

    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/board/']}>
          <InteractivePanel childrenConfig={centralInteractivePanelConfig}/>
        </MemoryRouter>
      </Provider>
    );

    const centralElement = screen.queryByTestId('panel-center-element');

    expect(component).toBeTruthy();
    expect(centralElement).toBeInTheDocument();
  });

  test('should add a tooltip for label in board summary configuration', () => {
    component.unmount();

    component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/board/']}>
          <InteractivePanel childrenConfig={boardSummaryInteractivePanelConfig}/>
        </MemoryRouter>
      </Provider>
    );

    const truncatedLabel = screen.queryByTestId('panel-left-label-truncated');

    expect(component).toBeTruthy();
    expect(truncatedLabel).toBeInTheDocument();

    if (truncatedLabel) {
      waitFor(() => {
        fireEvent.mouseEnter(truncatedLabel);

        const labelTooltip = screen.queryByTestId('panel-left-label-tooltip');

        expect(labelTooltip).toBeInTheDocument();
      });
    }
  });
});
