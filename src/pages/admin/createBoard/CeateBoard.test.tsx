import * as router from 'react-router';
import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import Admin from '../Admin';
import CreateBoard from './CreateBoard';
import DefaultBoard from '../defaultBoard/DefaultBoard';

import { Provider } from 'react-redux';
import store from '../../../store/store';

describe('CreateBoard component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  const routesConfig = [
    {
      path: '/admin',
      element: <Admin />,
      children: [
        { path: '/admin/', element: <CreateBoard /> },
        { path: '/admin/template', element: <DefaultBoard /> }
      ]
    }
  ];

  beforeAll(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  beforeEach(() => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/admin/']
    });
    component = render(<Provider store={store}>
      <RouterProvider router={router} />
    </Provider>);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render heading title', () => {
    const templates = screen.getByTestId('templates');

    expect(templates).toBeInTheDocument();
  });

  test('should navigate to "/template"', () => {
    const defaultBoard = screen.getByTestId('defaultBoard');

    fireEvent.click(defaultBoard);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/admin/template');
  });

  test('should render 3 draft for columns', () => {
    const defaultBoard = screen.getByTestId('defaultBoard');
    const columnsDraftAmount = 3;

    expect(defaultBoard.children.length).toBe(columnsDraftAmount);
  });
});
