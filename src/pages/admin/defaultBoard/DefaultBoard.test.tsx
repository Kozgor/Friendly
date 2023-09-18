import * as router from 'react-router';
import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import Admin from '../Admin';
import CreateBoard from '../createBoard/CreateBoard';
import DefaultBoard from './DefaultBoard';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import { BaseProps } from '../../../interfaces/baseProps';
import Toastr from '../../../components/Toastr/Toastr';

import { Provider } from 'react-redux';

import store from '../../../store/store';

describe('Admin component', () => {
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
    const wrapper = ({ children }: BaseProps) => (
      <>
        <ToastContainer />
        {children}
      </>
    );
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/admin/template']
    });
    component = render(
      <Provider store={store}>
        <RouterProvider router={router} /></Provider>, { wrapper }
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  describe('breadcrumbs:', () => {
    let breadcrumbs: HTMLElement;

    beforeEach(() => {
      breadcrumbs = screen.getByTestId('breadcrumbs');
    });

    test('Should be rendered', () => {
      expect(breadcrumbs).toBeInTheDocument();
      expect(breadcrumbs).toHaveAttribute('aria-label', 'breadcrumbs');
    });

    test('should contain "backLink"', () => {
      const backLink = screen.getByTestId('backLink');

      expect(backLink).toBeInTheDocument();
    });

    test('should contain "Default Board" title', () => {
      const defaultTitle = screen.getByTestId('defaultTitle');

      expect(defaultTitle).toBeInTheDocument();
    });

    test('backLink should navigate to "/admin"', () => {
      const backLink = screen.getByTestId('backLink');

      fireEvent.click(backLink);

      expect(navigate).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith('/admin', {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: undefined
      });
    });
  });

  describe('"Publish" button', () => {
    let publishButton: HTMLButtonElement;

    const mockPublishError = jest.fn(() =>
      Promise.reject({
        message: 'Something went wrong!'
      })
    );

    const mockPublishSuccess = jest.fn(() =>
      Promise.resolve({
        data: {
          message: 'Success!'
        }
      })
    );

    beforeEach(() => {
      publishButton = screen.getByTestId('publishButton');
    });

    test('should be rendered', () => {
      expect(publishButton).toBeInTheDocument();
    });

    // TODO: investigate problem with toast.error
    // test('toaster should show error', async () => {
    //   const post = jest
    //     .spyOn(axios, 'post')
    //     .mockImplementation(mockPublishError);
    //   const toastSpy = jest.spyOn(toast, 'error');

    //   await fireEvent.click(publishButton);

    //   expect(post).toHaveBeenCalled();
    //   expect(toastSpy).toHaveBeenCalled();
    //   expect(toastSpy).toHaveBeenCalledWith('Something went wrong!');
    // });

    test('should navigate to "/admin" after publishing', async () => {
      jest.spyOn(axios, 'post').mockImplementation(mockPublishSuccess);

      await fireEvent.click(publishButton);

      expect(navigate).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith('/admin');
    });

    test('toaster should show success message', async () => {
      const post = jest
        .spyOn(axios, 'post')
        .mockImplementation(mockPublishSuccess);
      const toastSpy = jest.spyOn(toast, 'success');

      await fireEvent.click(publishButton);

      expect(post).toHaveBeenCalled();
      expect(toastSpy).toHaveBeenCalled();
      expect(toastSpy).toHaveBeenCalledWith(
        <Toastr
          itemName="RETROSPECTIVE"
          message="board was successfully published. Now your team can play with it"
        />
      );
    });

    test('should render all board settings', () => {
        const boardSettings = screen.getAllByTestId('boardSetting');
        const settingsAmount = 3;

        expect(boardSettings.length).toBe(settingsAmount);
    });

    test('should render all default columns for board', () => {
        const columnsAmount = 3;
        const columns = screen.getByTestId('boardColumns');

        expect(columns.children.length).toBe(columnsAmount);
    });
  });
});
