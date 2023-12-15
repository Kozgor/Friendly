import { INewCommentInput } from '../interfaces/newCommentInput';

export const NEW_COMMENT_ENABLED: INewCommentInput = {
  userName: 'username',
  userAvatar: 'avatar.jpeg',
  cardTags: ['Fun', 'Value'],
  isDisabled: false,
  sendNewComment: jest.fn()
};

export const NEW_COMMENT_DISABLED: INewCommentInput = {
  userName: 'username',
  userAvatar: 'avatar.jpeg',
  cardTags: ['Fun', 'Value'],
  isDisabled: true,
  sendNewComment: jest.fn()
};
