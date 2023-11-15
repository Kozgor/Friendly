import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';

import FinalizedCard from './FinalizedCard';

import { COMMENT, REPLIES } from '../../mocks/cardReplies';

describe('FinalizedCard component', () => {
  let component: RenderResult;
  const commentNumber = 1;
  const onActionMock = jest.fn();

  beforeEach(() => {
    component = render(
      <FinalizedCard
        _id={REPLIES[commentNumber]._id}
        createdAt={REPLIES[commentNumber].createdAt}
        cardAuthor={REPLIES[commentNumber].cardAuthor}
        cardAuthorAvatar={REPLIES[commentNumber].cardAuthorAvatar}
        cardAuthorId={REPLIES[commentNumber].cardAuthorId}
        cardComment={COMMENT}
        onAction={onActionMock}
        cardReplies={REPLIES[commentNumber].cardReplies}
        cardReactions={REPLIES[commentNumber].cardReactions}
        cardTags={REPLIES[commentNumber].cardTags}
      />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should render tags', () => {
    const tags = screen.getAllByTestId('card-tag-chip');

    expect(tags.length).toBe(REPLIES[commentNumber].cardTags?.length);
  });

  test('"Show more" button should be replaced with "Show less" button', () => {
    const showMoreButton = screen.getByTestId('showMoreButton');

    fireEvent.click(showMoreButton);

    const showLess = screen.queryByTestId('showLessButton');

    expect(showLess).toBeInTheDocument();
  });

  xtest('should run onAction when user clicks on "Edit" button', () => {
    const cardMenuButton = screen.getByTestId('cardMenuButton');

    fireEvent.click(cardMenuButton);

    const editCardButton = screen.getByTestId('editCardButton');

    fireEvent.click(editCardButton);

    expect(onActionMock).toHaveBeenCalledWith('edit', {
      _id: REPLIES[commentNumber]._id,
      createdAt: REPLIES[commentNumber].createdAt,
      cardAuthor: REPLIES[commentNumber].cardAuthor,
      cardAuthorId: REPLIES[commentNumber].cardAuthorId,
      cardAuthorAvatar: REPLIES[commentNumber].cardAuthorAvatar,
      cardComment: COMMENT,
      cardTags: REPLIES[commentNumber].cardTags
    });
  });

  xtest('should run onAction when user clicks on "Delete" button', () => {
    const cardMenuButton = screen.getByTestId('cardMenuButton');

    fireEvent.click(cardMenuButton);

    const deleteCardButton = screen.getByTestId('deleteCardButton');

    fireEvent.click(deleteCardButton);

    expect(onActionMock).toHaveBeenCalledWith('remove', {
      _id: REPLIES[commentNumber]._id,
      createdAt: REPLIES[commentNumber].createdAt,
      cardAuthor: REPLIES[commentNumber].cardAuthor,
      cardAuthorId: REPLIES[commentNumber].cardAuthorId,
      cardAuthorAvatar: REPLIES[commentNumber].cardAuthorAvatar,
      cardComment: COMMENT
    });
  });

  test('should display user avatar in card', () => {
    const avatar = screen.getByTestId('card-avatar');

    expect(avatar).toBeInTheDocument();
  });
});
