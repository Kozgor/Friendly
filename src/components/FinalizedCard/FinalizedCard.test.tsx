import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';

import FinalizedCard from './FinalizedCard';
import { REPLIES } from '../../mocks/cardReplies';

describe('FinalizedCard component', () => {
  let component: RenderResult;
  const onActionMock = jest.fn();
  const commentMock = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
  eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;

  beforeEach(() => {
    component = render(
      <FinalizedCard
        _id={REPLIES[0]._id}
        cardAuthor={REPLIES[0].cardAuthor}
        cardComment={commentMock}
        onAction={onActionMock}
        cardReplies={REPLIES[0].cardReplies}
        cardReactions={REPLIES[0].cardReactions}
        cardTags={REPLIES[0].cardTags}
      />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('component mounts properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render all tags', () => {
    const tags = screen.getAllByTestId('tag');

    expect(tags.length).toBe(REPLIES[0].cardTags?.length);
  });

  test('`Show more` button should be replaced with `Show less` button', () => {
    const showMoreButton = screen.getByTestId('showMoreButton');

    fireEvent.click(showMoreButton);

    const showLess = screen.queryByTestId('showLessButton');

    expect(showLess).toBeInTheDocument();
  });

  test('should run onAction when user clicks on `Edit` button', () => {
    const cardMenuButton = screen.getByTestId('cardMenuButton');

    fireEvent.click(cardMenuButton);

    const editCardButton = screen.getByTestId('editCardButton');

    fireEvent.click(editCardButton);

    expect(onActionMock).toHaveBeenCalledWith('edit', {
      _id: REPLIES[0]._id,
      cardAuthor: REPLIES[0].cardAuthor,
      cardComment: commentMock,
      cardTags: REPLIES[0].cardTags
    });
  });

  test('should run onAction when user clicks on `Delete` button', () => {
    const cardMenuButton = screen.getByTestId('cardMenuButton');

    fireEvent.click(cardMenuButton);

    const editCardButton = screen.getByTestId('deleteCardButton');

    fireEvent.click(editCardButton);

    expect(onActionMock).toHaveBeenCalledWith('remove', {
      _id: REPLIES[0]._id,
      cardAuthor: REPLIES[0].cardAuthor,
      cardComment: commentMock
    });
  });

  test('should display user avatar in card', () => {
    const avatar = screen.getByTestId('cardAvatar');

    expect(avatar).toBeInTheDocument();
  });
});
