import { CardTag } from '../types/cardTags';

export interface INewCommentInput {
  userName: string;
  userAvatar: string;
  cardTags: CardTag[];
  isDisabled: boolean;
  sendNewComment: (
    cardAuthor: string,
    cardCommentState: string,
    cardTagsState: CardTag[]
  ) => void;
}
