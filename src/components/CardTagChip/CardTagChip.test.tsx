import { RenderResult, render, screen } from '@testing-library/react';
import CardTagChip from './CardTagChip';

import { possibleCardTags } from '../../types/cardTags';

describe('Comment component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <CardTagChip tag={possibleCardTags[0]}/>
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render specific tag', () => {
    const tag = screen.getByText(possibleCardTags[0]);

    expect(tag.innerHTML).toBe(possibleCardTags[0]);
  });
});
