import { RenderResult, render, screen } from '@testing-library/react';

import Column from './Column';

describe('Column component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Column
        columnAvatar=""
        columnCards={[]}
        columnStyle=""
        columnId="start"
        columnSubtitle="What our team should start doing."
        columnTitle="Start"
        isAddingDisabled={true}
      />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });

  test('renders props values', () => {
    const title = screen.getByText('Start');

    expect(title).toBeInTheDocument();
  });

  test('renders button for adding new comments', () => {
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('renders Comment component and its values', () => {
    const text = screen.getByText('Some text');

    expect(text).toBeInTheDocument();
  });

  test('render enabled button if isAddingDisabled property is false', async () => {
    await component.unmount();

    render(
      <Column
        columnAvatar=""
        columnCards={[]}
        columnStyle=""
        columnId=""
        columnSubtitle=""
        columnTitle=""
        isAddingDisabled={false}
      />
    );

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});
