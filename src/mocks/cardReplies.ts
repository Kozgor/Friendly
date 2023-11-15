import { IColumnCard } from '../interfaces/columnCard';

export const REPLIES: IColumnCard[] = [
    { _id: 'test comment 1',
      createdAt: '2023-09-19T14:28:54.921Z',
      cardComment: 'Dummy message 1',
      cardAuthor: 'Incognito',
      cardAuthorId: '650b15bfc45ee8d80c27c388',
      cardAuthorAvatar: 'avatar.jpeg',
      isDisabled: false,
      cardTags: ['Fun', 'Value'],
      cardReplies: [],
      cardReactions: []
    }, {
      _id: 'test comment 2',
      createdAt: '2023-09-19T14:28:54.921Z',
      cardComment: 'Dummy message 2',
      cardAuthor: 'Mr Smith',
      cardAuthorId: '650b15bfc45ee8d80c27c389',
      cardAuthorAvatar: 'avatar.jpeg',
      isDisabled: false,
      cardTags: ['Colaboration'],
      cardReplies: [],
      cardReactions: []
    }
];

export const COMMENT = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`;
