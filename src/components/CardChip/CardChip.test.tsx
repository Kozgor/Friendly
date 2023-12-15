import { RenderResult, render, screen } from '@testing-library/react';
import { possibleCardTags } from '../../types/cardTags';

import CardChip from './CardChip';

describe('CardChip component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <CardChip tag={possibleCardTags[0]}/>
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render specific chip', () => {
    const tag = screen.getByText(possibleCardTags[0]);

    expect(tag.innerHTML).toBe(possibleCardTags[0]);
  });
});
