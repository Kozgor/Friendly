import { RenderResult, fireEvent, render, screen, waitFor } from '@testing-library/react';
import EditCard from './EditCard';

import { REPLIES } from '../../mocks/cardReplies';

describe('Comment component', () => {
  let component: RenderResult;
  const commentNumber = 1;
  const actionMock = jest.fn();

  beforeEach(() => {
    component = render(
      <EditCard
        _id={REPLIES[commentNumber]._id}
        createdAt={REPLIES[commentNumber].createdAt}
        cardComment={REPLIES[commentNumber].cardComment}
        cardAuthor={REPLIES[commentNumber].cardAuthor}
        cardAuthorId={REPLIES[commentNumber].cardAuthorId}
        cardAuthorAvatar={REPLIES[commentNumber].cardAuthorAvatar}
        cardTags={REPLIES[commentNumber].cardTags}
        isDisabled={REPLIES[commentNumber].isDisabled}
        cardReplies={[]}
        onAction={actionMock}
      />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should mount component properly', () => {
    expect(component).toBeTruthy();
  });

  test('should display select component for tags', () => {
    const select = screen.getByTestId('select-tags-component');

    expect(select).toBeInTheDocument();
  });

  test('should display user avatar in an edit card', () => {
    const avatar = screen.getByTestId('card-avatar');

    expect(avatar).toBeInTheDocument();
  });

  test('should display textarea for comment', () => {
    const textarea = screen.getByTestId('newCardTextarea');

    expect(textarea).toBeInTheDocument();
  });

  test('should display "Cancel" button' , () => {
    const cancelButton = screen.getByTestId('editCardButtonCancel');

    expect(cancelButton).toBeInTheDocument();
  });

  test('should display "Save" button', () => {
    const saveButton = screen.getByTestId('editCardButtonSave');

    expect(saveButton).toBeInTheDocument();
  });

  test('should switch avatar on click', () => {
    const avatar = screen.getByTestId('card-avatar');

    fireEvent.click(avatar);

    waitFor(() => {
      const incognitoIcon = screen.getByTestId('incognitoIcon');

      expect(incognitoIcon).toBeInTheDocument();
    });
  });

  test('should call cancel action when "Cancel" button is clicked', () => {
    const cancelButton = screen.getByTestId('editCardButtonCancel');
    fireEvent.click(cancelButton);

    expect(actionMock).toHaveBeenCalledWith('cancel', {
      _id: REPLIES[commentNumber]._id,
      createdAt: REPLIES[commentNumber].createdAt,
      cardAuthor: REPLIES[commentNumber].cardAuthor,
      cardAuthorId: REPLIES[commentNumber].cardAuthorId,
      cardAuthorAvatar: REPLIES[commentNumber].cardAuthorAvatar,
      cardComment: REPLIES[commentNumber].cardComment
    });
  });

  test('should call save action when "Save" button is clicked', () => {
    const saveButton = screen.getByTestId('editCardButtonSave');
    fireEvent.click(saveButton);

    waitFor(() => {
      expect(actionMock).toHaveBeenCalledWith('save', {
        _id: REPLIES[commentNumber]._id,
        createdAt: REPLIES[commentNumber].createdAt,
        cardComment: REPLIES[commentNumber].cardComment,
        cardAuthor: REPLIES[commentNumber].cardAuthor,
        cardAuthorId: REPLIES[commentNumber].cardAuthorId,
        cardTags: []
      });
    });
  });
});
