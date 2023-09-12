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

  beforeEach(() => {
    component = render(
      <FinalizedCard
        _id={REPLIES[0]._id}
        cardAuthor={REPLIES[0].cardAuthor}
        // eslint-disable-next-line max-len
        cardComment="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
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

  test('renders all tags', () => {
    const tags = screen.getAllByTestId('tag');

    expect(tags.length).toBe(REPLIES[0].cardTags?.length);
  });

  test('showMore button should be replaced with showLess button', () => {
    const showMoreButton = screen.getByTestId('showMoreButton');

    fireEvent.click(showMoreButton);

    const showLess = screen.queryByTestId('showLessButton');

    expect(showLess).toBeInTheDocument();
  });

  test('should run onAction function with edit action when user click on edit button', () => {
    const cardMenuButton = screen.getByTestId('cardMenuButton');

    fireEvent.click(cardMenuButton);

    const editCardButton = screen.getByTestId('editCardButton');

    fireEvent.click(editCardButton);

    expect(onActionMock).toHaveBeenCalledWith('edit', {
      _id: REPLIES[0]._id,
      cardAuthor: REPLIES[0].cardAuthor,
      cardComment:
        // eslint-disable-next-line max-len
       'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      cardTags: REPLIES[0].cardTags
    });
  });

  test('should run onAction function with delete action when user click on delete button', () => {
    const cardMenuButton = screen.getByTestId('cardMenuButton');

    fireEvent.click(cardMenuButton);

    const editCardButton = screen.getByTestId('deleteCardButton');

    fireEvent.click(editCardButton);

    expect(onActionMock).toHaveBeenCalledWith('remove', {
      _id: REPLIES[0]._id,
      cardAuthor: REPLIES[0].cardAuthor,
      cardComment:
        // eslint-disable-next-line max-len
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    });
  });

  test('should display user avatar in card', () => {
    const avatar = screen.getByText(REPLIES[0].cardAuthor);

    expect(avatar).toBeInTheDocument();
  });
});
