import { NEW_COMMENT_DISABLED, NEW_COMMENT_ENABLED } from '../../mocks/createCard';
import { RenderResult, fireEvent, render, screen, waitFor } from '@testing-library/react';
import NewCommentInput from './NewCommentInput';
import userEvent from '@testing-library/user-event';

describe('New comment component', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <NewCommentInput
        userName={NEW_COMMENT_ENABLED.userName}
        userAvatar={NEW_COMMENT_ENABLED.userAvatar}
        cardTags={NEW_COMMENT_ENABLED.cardTags}
        isDisabled={NEW_COMMENT_ENABLED.isDisabled}
        sendNewComment={NEW_COMMENT_ENABLED.sendNewComment}
      />
    );
  });

  afterEach(async () => {
    await component.unmount();
  });

  test('should render send button for adding new comments', () => {
    const sendButton = screen.getByTestId('newCardSendButton');

    expect(sendButton).toBeInTheDocument();
    expect(sendButton).not.toBeDisabled();
  });

  test('should disable send button if "isDisabled" property is true', async () => {
    await component.unmount();

    component = render(
      <NewCommentInput
        userName={NEW_COMMENT_DISABLED.userName}
        userAvatar={NEW_COMMENT_DISABLED.userAvatar}
        cardTags={NEW_COMMENT_DISABLED.cardTags}
        isDisabled={NEW_COMMENT_DISABLED.isDisabled}
        sendNewComment={NEW_COMMENT_DISABLED.sendNewComment}
      />
    );
    const button = screen.getByTestId('newCardSendButton');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('should switch user avatar into "Incognito"', () => {
    const avatar = screen.getByTestId('card-avatar');

    waitFor(() => {
      fireEvent.click(avatar);

      const incognitoAvatar = screen.getByTestId('incognito-avatar');

      expect(incognitoAvatar).toBeInTheDocument();
    });
  });

  test('should switch user avatar from "Incognito" to "userAvatar"', async () => {
    await component.unmount();

    component = render(
      <NewCommentInput
        userName={NEW_COMMENT_ENABLED.userName}
        userAvatar={'Incognito'}
        cardTags={NEW_COMMENT_ENABLED.cardTags}
        isDisabled={NEW_COMMENT_ENABLED.isDisabled}
        sendNewComment={NEW_COMMENT_ENABLED.sendNewComment}
      />
    );

    const incognitoAvatar = screen.getByTestId('incognito-avatar');

    expect(incognitoAvatar).toBeInTheDocument();

    waitFor(() => {
      fireEvent.click(incognitoAvatar);

      const userAvatar = screen.getByTestId('card-avatar');

      expect(userAvatar).toBeInTheDocument();
    });
  });

  test('should create a card', () => {
    const button = screen.getByTestId('newCardSendButton');
    const textarea = screen.getByTestId('newCardTextarea');

    waitFor(() => {
      userEvent.type(textarea, 'Some test message.');
      fireEvent.click(button);

      expect(NEW_COMMENT_DISABLED.sendNewComment).toHaveBeenCalled();
      expect(NEW_COMMENT_DISABLED.sendNewComment).toHaveBeenCalledOnce();
    });
  });

  test('should not create a card if no message', () => {
    const button = screen.getByTestId('newCardSendButton');

    waitFor(() => {
      fireEvent.click(button);

      expect(NEW_COMMENT_DISABLED.sendNewComment).not.toHaveBeenCalled();
    });
  });
});
