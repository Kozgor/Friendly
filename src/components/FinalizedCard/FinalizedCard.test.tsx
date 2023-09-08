import { RenderResult, render } from '@testing-library/react';

import FinalizedCard from './FinalizedCard';

describe('FinalizedCard component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <FinalizedCard
        cardId=""
        cardAuthor=""
        cardComment=""
        onAction={jest.fn()}
        cardReplies={[]}
        cardReactions={[]}
        cardTags={[]}
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
