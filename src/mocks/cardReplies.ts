import { IColumnCard } from '../interfaces/columnCard';

export const REPLIES: IColumnCard[] = [
    { _id: 'test comment 1',
      cardComment: 'Dummy message 1',
      cardAuthor: 'Test User',
      cardTags: ['danger', 'primary'],
      cardReplies: [],
      cardReactions: []
    }, {
      _id: 'test comment 2',
      cardComment: 'Dummy message 2',
      cardAuthor: 'Test User',
      cardTags: ['warning'],
      cardReplies: [],
      cardReactions: []
    }
];
