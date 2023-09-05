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
    component = render(<RouterProvider router={router} />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('Should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('Should render heading title', () => {
    const templates = screen.getByTestId('templates');

    expect(templates).toBeInTheDocument();
  });

  test('Should navigate to `/template`', () => {
    const defaultBoard = screen.getByTestId('defaultBoard');

    fireEvent.click(defaultBoard);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/admin/template');
  });

  test('Should render 3 draft for columns', () => {
    const defaultBoard = screen.getByTestId('defaultBoard');
    const columnsDraftAmount = 3;

    expect(defaultBoard.children.length).toBe(columnsDraftAmount);
  });
});
