import { RenderResult, render } from '@testing-library/react';
import ColumnCard from './NewColumnCard';

import { COMMENTS } from '../../mocks/cardComments';

describe('Comment component', () => {
  let component: RenderResult;
  const commentNumber = 0;

  beforeEach(() => {
    component = render(<ColumnCard
      cardId={COMMENTS[commentNumber].cardId}
      cardMessage={COMMENTS[commentNumber].cardMessage}
      cardAuthor={COMMENTS[commentNumber].cardAuthor}
      cardTags={COMMENTS[commentNumber].cardTags}
      cardComments={[]}
      cardReactions={[]}
      onSaveCard={jest.fn()}
      onRemoveCard={jest.fn()}
    />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });
});
