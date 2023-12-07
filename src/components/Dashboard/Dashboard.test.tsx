import * as router from 'react-router';
import {
  RenderResult,
  render
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { LOCAL_ADMIN_PROFILE } from '../../mocks/user';
import { Provider } from 'react-redux';

import CreateBoard from '../CreateBoard/CreateBoard';
import Dashboard from './Dashboard';
import DefaultBoard from '../DefaultBoard/DefaultBoard';
import store from '../../store/store';

const saveLocalUserData = jest.fn();
const removeLocalUserData = jest.fn();

jest.mock('../../utils/localStorageManager', () => ({
    localStorageManager: () => ({
      saveLocalUserData,
      removeLocalUserData,
      getLocalUserData: () => LOCAL_ADMIN_PROFILE
    })
}));

describe('Dashboard component', () => {
  let component: RenderResult;
  const navigate = jest.fn();

  const routesConfig = [
    {
      path: '/admin',
      element: <Dashboard />,
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
      initialEntries: ['/admin']
    });
    component = render(<Provider store={store}>
      <RouterProvider router={router} />
    </Provider>);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await component.unmount();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });
});
