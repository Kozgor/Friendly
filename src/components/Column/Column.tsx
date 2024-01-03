/* eslint-disable max-lines */
/* eslint-disable max-params */
import { CardTag, possibleCardTags } from '../../types/cardTags';
import { find, isEmpty } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';

import { CREATE_CARD_ERROR_MESSAGE, CREATION_ERROR, UPDATE_CARD_ERROR_MESSAGE, UPDATING_ERROR, possibleBoardStatuses } from '../../constants';
import { ICardReactions, IColumnCard } from '../../interfaces/columnCard';
import { BoardContext } from '../../context/board/boardContext';
import EditCard from '../EditCard/EditCard';
import FinalizedCard from '../FinalizedCard/FinalizedCard';
import { IColumn } from '../../interfaces/column';
import NewCommentInput from '../NewCommentInput/NewCommentInput';
import Toastr from '../Toastr/Toastr';
import { cardAPI } from '../../api/CardAPI';
import { localStorageManager } from '../../utils/localStorageManager';
import { sortByDateStartNew } from '../../utils/sortByDate';

import classes from './Column.module.scss';

const Column = (props: IColumn) => {
  const { columnCards, columnId, columnTitle, columnSubtitle } = props;
  const { getLocalUserData } = localStorageManager();
  const localUser = getLocalUserData();
  const initialCard: IColumnCard = {
    _id: '',
    columnId: columnId,
    createdAt: '',
    cardComment: '',
    cardAuthorId: localUser._id,
    cardAuthor: localUser.fullName || 'Incognito',
    cardAuthorAvatar: localUser.avatar || 'Incognito',
    cardTags: [],
    isEditable: true
  };
  const { createCard, updateCard } = cardAPI();

  const { boardId, boardStatus, isAddingDisabled } = useContext(BoardContext);
  const [finalizedCards, setFinalizedCards] = useState(() => sortByDateStartNew(columnCards));
  const [editableCard, setEditableCard] = useState<IColumnCard>(initialCard);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isActiveBoard = boardStatus === 'active';
  const isAddButtonDisabled = isButtonDisabled || isAddingDisabled;

  useEffect(() => {
    if (columnCards) {
      setFinalizedCards(sortByDateStartNew(columnCards));
    }
  }, [columnCards]);

  const onSaveHandler = (cards: IColumnCard[], handledCard: IColumnCard) => {
    if (handledCard._id) {
      updateCard(boardId, columnId, handledCard)
        .then(() => {
          setFinalizedCards((prevCards) =>
            prevCards.map((card) =>
              card._id === handledCard._id ? { ...handledCard, isEditable: false } : card
            )
          );
        }).catch(err => {
          console.log(err);
          toast.error(
            <Toastr
              itemName={UPDATING_ERROR}
              message={UPDATE_CARD_ERROR_MESSAGE}
            />
          );
        });
    } else {
      createCard(boardId, columnId, handledCard)
        .then((res) => {
          setFinalizedCards((prevCards) => [{ ...handledCard, _id: res._id }, ...prevCards]);
        }).catch(err => {
          console.log(err);
          toast.error(
            <Toastr
              itemName={CREATION_ERROR}
              message={CREATE_CARD_ERROR_MESSAGE}
            />
          );
        });
    }
  };

  const onEditHandler = (
    cards: IColumnCard[],
    handledCard: IColumnCard
  ) => {
    setFinalizedCards((prevCards: IColumnCard[]) => {
      const updatedCards = prevCards.map(
        card => card._id === handledCard._id ? { ...card, isEditable: true } : { ...card, isEditable: false }
      );

      return updatedCards;
    });
  };

  const onCancelHandler = (cards: IColumnCard[]) => {
    setFinalizedCards((prevCards) =>
      editableCard._id
        ? cards.map(card => ({ ...card, isEditable: false }))
        : prevCards.filter((card) => !card.isEditable)
    );
    setIsButtonDisabled(isAddingDisabled);
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
      cancel: onCancelHandler
    };

    const finCards = [...finalizedCards];

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

  const filterReactionsByUserId = (cardReactions: ICardReactions[]): ICardReactions | null => {
    if (isEmpty(cardReactions?.length)) {
      return find(cardReactions, (reaction => reaction.userId === localUser._id)) || null;
    }

    return null;
  };

  const sendNewComment = (
    cardAuthor: string,
    cardComment: string,
    cardTags: CardTag[]
  ) => {
    const createdAt = moment().toISOString();
    const newCard: IColumnCard = {
      _id: '',
      columnId,
      createdAt,
      cardComment,
      cardAuthorId: localUser._id,
      cardAuthor,
      cardAuthorAvatar: localUser.avatar || 'Incognito',
      cardTags,
      isEditable: isAddButtonDisabled
    };

    createCard(boardId, columnId, newCard)
      .then((res) => {
        const updatedCard = { ...newCard, _id: res._id };

        setFinalizedCards((prevCards) => [updatedCard, ...prevCards]);
      }).catch(err => {
        console.log(err);
        toast.error(
          <Toastr
            itemName={CREATION_ERROR}
            message={CREATE_CARD_ERROR_MESSAGE}
          />
        );
      });
  };


  return (
    <section className={classes.column}>
      <div className={classes['column__header']}>
        <div className={classes['column__header__title']}>
          <h4>{columnTitle} {boardStatus === possibleBoardStatuses.finalized &&
            <span className={classes['column__header__couner']}>({columnCards.length})</span>}
          </h4>
        </div>
        <div className={classes['column__header__subtitle']}>
          <p>{columnSubtitle}</p>
        </div>
      </div>
      <div id='comments' className={isActiveBoard ? classes['column__comments__min'] : classes['column__comments__max']}>
        {finalizedCards?.map(
          (card) =>
            (card.isEditable && (
              <EditCard
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
