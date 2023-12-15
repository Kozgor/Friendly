/* eslint-disable max-lines */
/* eslint-disable max-params */
import axios from 'axios';

import { find, isEmpty } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../../context/board/boardContext';
import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';
import { localStorageManager } from '../../utils/localStorageManager';
import { possibleBoardStatuses } from '../../constants';
import { CardTag, possibleCardTags } from '../../types/cardTags';
import { sortByDateStartOld } from '../../utils/sortByDate';

import FinalizedCard from '../FinalizedCard/FinalizedCard';
import NewCard from '../EditCard/EditCard';
import NewCommentInput from '../NewCommentInput/NewCommentInput';
import classes from './Column.module.scss';
import moment from 'moment';

const Column = (props: IColumn) => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;
  const { columnCards, columnId, columnTitle, columnSubtitle } = props;
  const { getLocalUserData } = localStorageManager();
  const localUser = getLocalUserData();
  const initialCard: IColumnCard = {
    _id: '',
    columnId: '',
    createdAt: '',
    cardComment: '',
    cardAuthorId: localUser._id,
    cardAuthor: localUser.fullName || 'Incognito',
    cardAuthorAvatar: localUser.avatar || 'Incognito',
    cardTags: [],
    isEditable: true
  };

  const { boardId, boardStatus, isAddingDisabled } = useContext(BoardContext);
  const [isNewCard, setIsNewCard] = useState(false);
  const [finalizedCards, setFinalizedCards] = useState(() => sortByDateStartOld(columnCards));
  const [editableCard, setEditableCard] = useState<IColumnCard>(initialCard);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isActiveBoard = boardStatus === 'active';
  const isAddButtonDisabled = isButtonDisabled || isAddingDisabled;

  useEffect(() => {
    if (columnCards) {
      setFinalizedCards(sortByDateStartOld(columnCards));
    }
  }, [columnCards]);

  const onSaveHandler = (
    cards: IColumnCard[],
    handledCard: IColumnCard,
    cardIndex: number
  ) => {
    if (handledCard._id) {
      axios
        .put(`${FRIENDLY_DOMAIN}card/update-card`, {
          _id: handledCard._id,
          boardId: boardId,
          columnId: columnId,
          cardAuthorId: handledCard.cardAuthorId,
          cardAuthor: handledCard.cardAuthor,
          cardAuthorAvatar: handledCard.cardAuthorAvatar,
          cardComment: handledCard.cardComment,
          cardTags: handledCard.cardTags
        })
        .then(() => {
          setFinalizedCards(() => {
            cards.splice(cardIndex, 1, {
              ...handledCard,
              isEditable: false
            });
            return cards;
          });
        });
    } else {
      axios
        .post(`${FRIENDLY_DOMAIN}card/create-card`, {
          boardId,
          columnId: columnId,
          cardComment: handledCard.cardComment,
          cardAuthor: handledCard.cardAuthor,
          cardAuthorId: handledCard.cardAuthorId,
          cardAuthorAvatar: handledCard.cardAuthorAvatar,
          cardTags: handledCard.cardTags,
          createdAt: handledCard.createdAt
        })
        .then((res) => {
          setFinalizedCards((prevCards) => {
            const filteredCards = prevCards.filter((card) => !card.isEditable);
            return [...filteredCards, { ...handledCard, _id: res.data._id }];
          });
        });
    }
  };

  const onEditHandler = (
    cards: IColumnCard[],
    handledCard: IColumnCard,
    cardIndex: number
  ) => {
    setFinalizedCards(() => {
      cards.splice(cardIndex, 1, { ...handledCard, isEditable: true });
      return cards;
    });
  };

  const onCancelHandler = (cards: IColumnCard[]) => {
    setFinalizedCards((prevCards) =>
      editableCard._id
        ? cards.map((card) => ({ ...card, isEditable: false }))
        : prevCards.filter((card) => !card.isEditable)
    );
    setIsButtonDisabled(isAddingDisabled);
  };

  const onRemoveHandler = (cards: IColumnCard[], handledCard: IColumnCard) => {
    axios({
      method: 'DELETE',
      url: `${FRIENDLY_DOMAIN}card/remove-card`,
      data: {
        _id: handledCard._id
      }
    }).then(() => {
      setFinalizedCards((prevCards) =>
        prevCards.filter((card) => card._id !== handledCard._id)
      );
    });
  };

  const handleAction = (actionType: string, handledCard: IColumnCard) => {
    const actionsMap: Record<
      string,
      (
        cards: IColumnCard[],
        handledCard: IColumnCard,
        cardIndex: number
      ) => void
    > = {
      save: onSaveHandler,
      edit: onEditHandler,
      cancel: onCancelHandler,
      remove: onRemoveHandler
    };

    const finCards = [...finalizedCards];

    setIsNewCard(actionType === 'edit');

    const editableIndex = finCards.findIndex(
      (card) => card._id === handledCard._id
    );

    Reflect.apply(actionsMap[actionType], this, [
      finCards,
      handledCard,
      editableIndex
    ]);

    setEditableCard(
      actionType === 'edit' ? { ...handledCard, isEditable: true } : initialCard
    );
    setIsButtonDisabled(actionType === 'edit');
  };

  const filterReactionsByUserId = (cardReactions: any): boolean | null => {
    let isHappyUser = null;

    if (isEmpty(cardReactions?.length)) {
      find(cardReactions, (reaction => {
        if (reaction.userId === localUser._id) {
          isHappyUser = reaction.isHappyReaction;
        }
      }));
    }

    return isHappyUser;
  };

  const sendNewComment = (
    cardAuthor: string,
    cardComment: string,
    cardTags: CardTag[]
  ) => {
    const createdAt = moment().toISOString();
    const newCard: IColumnCard = {
      _id: initialCard._id,
      columnId,
      createdAt: createdAt,
      cardComment,
      cardAuthorId: localUser._id,
      cardAuthor,
      cardAuthorAvatar: localUser.avatar || 'Incognito',
      cardTags,
      isEditable: isAddButtonDisabled
    };
    handleAction('save', newCard);
  };

  return (
    <section className={classes.column}>
      <div className={classes['column__header']}>
        <h4>{columnTitle} {boardStatus === possibleBoardStatuses.finalized &&
          <span className={classes['column__header__couner']}>({columnCards.length})</span>}
        </h4>
        <p className={classes['column__header__subtitle']}>{columnSubtitle}</p>
      </div>
      <div id='comments' className={isActiveBoard ? classes['column__comments__min'] : classes['column__comments__max']}>
        {finalizedCards?.map(
          (card) =>
            (card.isEditable && (
              <NewCard
                key={editableCard._id}
                _id={editableCard._id}
                columnId={editableCard.columnId}
                createdAt={editableCard.createdAt}
                cardComment={editableCard.cardComment}
                cardAuthor={editableCard.cardAuthor}
                cardAuthorAvatar={editableCard.cardAuthorAvatar}
                cardAuthorId={editableCard.cardAuthorId}
                cardTags={editableCard.cardTags}
                isDisabled={isAddingDisabled}
                isEditable={boardStatus !== possibleBoardStatuses.finalized && !isAddingDisabled}
                onAction={handleAction}
              />
            )) || (
              <FinalizedCard
                key={card._id}
                _id={card._id}
                columnId={card.columnId}
                createdAt={card.createdAt}
                cardComment={card.cardComment}
                cardAuthor={card.cardAuthor}
                cardAuthorId={card.cardAuthorId}
                cardActionAuthorId={localUser._id}
                cardAuthorAvatar={card.cardAuthorAvatar}
                cardTags={card.cardTags}
                cardReactions={filterReactionsByUserId(card.cardReactions)}
                isDisabled={boardStatus === possibleBoardStatuses.finalized}
                isEditable={boardStatus !== possibleBoardStatuses.finalized && !isAddingDisabled}
                onAction={handleAction}
              />
            )
        )}
      </div>
      {isActiveBoard &&
        <div className={classes.cardCommentContainer}>
          <NewCommentInput
            userName={localUser.fullName}
            userAvatar={localUser.avatar}
            cardTags={possibleCardTags}
            isDisabled={isAddButtonDisabled}
            sendNewComment={sendNewComment}
          />
        </div>
      }
    </section>
  );
};

export default Column;
