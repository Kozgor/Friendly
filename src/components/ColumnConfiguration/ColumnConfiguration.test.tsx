import { RenderResult, fireEvent, render, screen } from '@testing-library/react';

import ColumnConfiguration from './ColumnConfiguration';
import { IColumn } from '../../interfaces/column';

describe('ColumnConfiguration component', () => {
  let component: RenderResult;
  let columns: IColumn[] = [
    {
      id: 'start',
      avatar: '',
      cards: [],
      style: '',
      subtitle: '',
      title: 'Start'
    }
  ];

  const columnsHandlerMock = (updatedColumns: IColumn[]) => {
    columns = updatedColumns;
  };

  beforeEach(() => {
    component = render(
      <ColumnConfiguration
        columnId="start"
        columns={columns}
        onUpdateColumns={columnsHandlerMock}
      />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });

  test('render title', () => {
    const title = screen.getByTestId('title');

    expect(title).toBeInTheDocument();
    expect(title).toContainHTML('Start');
  });

  test('render subtitle', () => {
    const subtitle = screen.getByTestId('subtitle');

    expect(subtitle).toBeInTheDocument();
  });

  test('textarea change subtitle value', () => {
    const subtitle = screen.getByTestId('subtitle');
    const subtitleInput = subtitle.querySelector('textarea') as HTMLTextAreaElement;

    fireEvent.change(subtitleInput, { target: {value: 'Subtitle' } });

    expect(columns.find(col => col.id === 'start')?.subtitle).toBe('Subtitle');
  });
});
