import { IColumnCard } from '../interfaces/columnCard';

export const COMMENTS: IColumnCard[] = [
    { cardId: 'test comment 1',
      cardMessage: 'Dummy message 1',
      cardAuthor: 'Test User',
      cardTags: ['danger', 'primary'],
      cardComments: [],
      cardReactions: [],
      onSaveCard: () => {},
      onRemoveCard: () => {}
    }, {
      cardId: 'test comment 2',
      cardMessage: 'Dummy message 2',
      cardAuthor: 'Test User',
      cardTags: ['warning'],
      cardComments: [],
      cardReactions: [],
      onSaveCard: () => {},
      onRemoveCard: () => {}
    }
];
