import { RenderResult, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import PageNotFound from './Error';

describe('Not-found component', () => {
  let component: RenderResult;

  const routesConfig = [
    { path: '*', element: <PageNotFound />}
  ];

  beforeEach(() => {
    const router = createMemoryRouter(routesConfig, {
        initialEntries: ['/not']
    });
    component = render(<RouterProvider router={router} />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should show message', () => {
    const message = screen.getByText('404 Page not found');

    expect(message).toBeInTheDocument();
  });
});
