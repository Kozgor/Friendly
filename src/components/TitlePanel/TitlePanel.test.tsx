import {
  RenderResult,
  render,
  screen
} from '@testing-library/react';
import TitlePanel from './TitlePanel';

describe('Title panel:', () => {
  let component: RenderResult;
  const testTitle = 'Board name';

  beforeEach(() => {
    component = render(
        <TitlePanel
          title={testTitle}
        />
      );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render title', () => {
    const titleContainer = screen.queryByTestId('title-container');

    expect(titleContainer).toBeInTheDocument();
  });

  test('should render title from props', () => {
    const title = screen.queryByText(testTitle);

    expect(title).toBeInTheDocument();
  });
});
