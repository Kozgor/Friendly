import { IColumnCard } from '../interfaces/columnCard';

export const REPLIES: IColumnCard[] = [
    { _id: 'test comment 1',
      cardComment: 'Dummy message 1',
      cardAuthor: 'Incognito',
      isDisabled: false,
      cardTags: ['danger', 'primary'],
      cardReplies: [],
      cardReactions: []
    }, {
      _id: 'test comment 2',
      cardComment: 'Dummy message 2',
      cardAuthor: 'Mr Smith',
      isDisabled: false,
      cardTags: ['warning'],
      cardReplies: [],
      cardReactions: []
    }
];

export const COMMENT = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;
