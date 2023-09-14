import { RenderResult, fireEvent, render, screen, waitFor } from '@testing-library/react';
import NewCard from './NewCard';

import { REPLIES } from '../../mocks/cardReplies';

describe('Comment component', () => {
  let component: RenderResult;
  const commentNumber = 1;

  beforeEach(() => {
    component = render(
      <NewCard
        _id={REPLIES[commentNumber]._id}
        cardComment={REPLIES[commentNumber].cardComment}
        cardAuthor={REPLIES[commentNumber].cardAuthor}
        cardTags={REPLIES[commentNumber].cardTags}
        isDisabled={REPLIES[commentNumber].isDisabled}
        cardReplies={[]}
        cardReactions={[]}
        onAction={jest.fn()}
      />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should properly mount a component', () => {
    expect(component).toBeTruthy();
  });

  test('should display autocomplete for tags', () => {
    const autocomplete = screen.getByTestId('newCardAutocomplete');

    expect(autocomplete).toBeInTheDocument();
  });

  test('should display user avatar in a new card', () => {
    const avatar = screen.getByTestId('newCardAvatar');

    expect(avatar).toBeInTheDocument();
  });

  test('should display textarea for comment', () => {
    const textarea = screen.getByTestId('newCardTextarea');

    expect(textarea).toBeInTheDocument();
  });

  test('should display `Cancel` button' , () => {
    const cancelButton = screen.getByTestId('newCardButtonCancel');

    expect(cancelButton).toBeInTheDocument();
  });

  test('should display `Save` button', () => {
    const saveButton = screen.getByTestId('newCardButtonSave');

    expect(saveButton).toBeInTheDocument();
  });

  test('should switch avatar on click', () => {
    const avatar = screen.getByTestId('newCardAvatar');

    fireEvent.click(avatar);

    waitFor(() => {
      const incognitoIcon = screen.getByTestId('incognitoIcon');

      expect(incognitoIcon).toBeInTheDocument();
    });
  });
});
