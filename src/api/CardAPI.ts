import axios from 'axios';

import { IColumnCard } from '../interfaces/columnCard';

export const cardAPI = () => {
    const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

    const createCard = (boardId: string, columnId: string, card: IColumnCard): Promise<any> => axios
        .post(`${FRIENDLY_DOMAIN}card/create-card`, {
            boardId,
            columnId: columnId,
            cardComment: card.cardComment,
            cardAuthor: card.cardAuthor,
            cardAuthorId: card.cardAuthorId,
            cardAuthorAvatar: card.cardAuthorAvatar,
            cardTags: card.cardTags,
            createdAt: card.createdAt
        });

    const updateCard = (boardId: string, columnId: string, card: IColumnCard): Promise<any> => axios
        .put(`${FRIENDLY_DOMAIN}card/update-card`, {
            boardId: boardId,
            columnId: columnId,
            _id: card._id,
            cardAuthorId: card.cardAuthorId,
            cardAuthor: card.cardAuthor,
            cardAuthorAvatar: card.cardAuthorAvatar,
            cardComment: card.cardComment,
            cardTags: card.cardTags
        });

    const removeCards = (cards: IColumnCard[]): Promise<any> => axios({
        method: 'DELETE',
        url: `${FRIENDLY_DOMAIN}card/remove-card`,
        data: {
            cards
        }
    });

    return {
        createCard,
        updateCard,
        removeCards
    };
};
