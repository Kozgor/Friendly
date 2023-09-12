import { RenderResult, render } from '@testing-library/react';
import NewCard from './NewCard';

import { REPLIES } from '../../mocks/cardReplies';

describe('Comment component', () => {
  let component: RenderResult;
  const commentNumber = 0;

  beforeEach(() => {
    component = render(
      <NewCard
        _id={REPLIES[commentNumber]._id}
        cardComment={REPLIES[commentNumber].cardComment}
        cardAuthor={REPLIES[commentNumber].cardAuthor}
        cardTags={REPLIES[commentNumber].cardTags}
        cardReplies={[]}
        cardReactions={[]}
        onAction={jest.fn()}
      />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });
});
