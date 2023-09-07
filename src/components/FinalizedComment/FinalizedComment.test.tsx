import { RenderResult, render } from '@testing-library/react';

import FinalizedComment from './FinalizedComment';

describe('FinalizedComment component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <FinalizedComment
        cardId=""
        cardAuthor=""
        cardMessage=""
        onRemoveCard={jest.fn()}
        onSaveCard={jest.fn()}
        cardComments={[]}
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
