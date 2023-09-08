import { RenderResult, render } from '@testing-library/react';

import ColumnCard from './NewColumnCard';
import { REPLIES } from '../../mocks/cardReplies';

describe('Comment component', () => {
  let component: RenderResult;
  const commentNumber = 0;

  beforeEach(() => {
    component = render(<ColumnCard
      cardId={REPLIES[commentNumber].cardId}
      cardComment={REPLIES[commentNumber].cardComment}
      cardAuthor={REPLIES[commentNumber].cardAuthor}
      cardTags={REPLIES[commentNumber].cardTags}
      cardReplies={[]}
      cardReactions={[]}
      onAction={jest.fn()}
    />);
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });
});
