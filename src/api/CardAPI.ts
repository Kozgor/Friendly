import axios from 'axios';

import { IColumnCard } from '../interfaces/columnCard';

export const cardAPI = () => {
    const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;

    const createCard = async (boardId: string, columnId: string, card: IColumnCard): Promise<any> => {
        try {
            const receivedCard = await axios
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
            return receivedCard.data;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    };

    const updateCard = async (boardId: string, columnId: string, card: IColumnCard): Promise<any> => {
        try {
            const receivedCard = await axios
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
            return receivedCard.data;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    };

    const removeCards = async (cards: IColumnCard[]): Promise<any> => {
        try {
            const receivedCard = await axios({
                method: 'DELETE',
                url: `${FRIENDLY_DOMAIN}card/remove-card`,
                data: {
                    cards
                }
            });
            return receivedCard.data;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    };

    return {
        createCard,
        updateCard,
        removeCards
    };
};
