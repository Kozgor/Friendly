import { IColumnCard } from '../interfaces/columnCard';

export const REPLIES: IColumnCard[] = [
    { cardId: 'test comment 1',
      cardComment: 'Dummy message 1',
      cardAuthor: 'Test User',
      cardTags: ['danger', 'primary'],
      cardReplies: [],
      cardReactions: [],
      onAction: () => {}
    }, {
      cardId: 'test comment 2',
      cardComment: 'Dummy message 2',
      cardAuthor: 'Test User',
      cardTags: ['warning'],
      cardReplies: [],
      cardReactions: [],
      onAction: () => {}
    }
];
