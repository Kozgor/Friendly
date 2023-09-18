/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';


import Button from '@mui/joy/Button';

import FinalizedCard from '../FinalizedCard/FinalizedCard';
import NewCard from '../NewCard/NewCard';

import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';

import { localStorageManager } from '../../utils/localUserManager';

import { BoardContext } from '../../context/board/board-context';

import axios from 'axios';

import classes from './Column.module.scss';


const Column = (props: IColumn) => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;
  const { getLocalUserData } = localStorageManager();
  const localUserData= getLocalUserData();
  const initialCard = {
    _id: '',
    cardComment: '',
    cardAuthor: localUserData.avatar || 'Incognito',
    cardTags: [],
    isEditable: true
  };
  const { boardId, isAddingDisabled } = useContext(BoardContext);
  const [isNewCard, setIsNewCard] = useState(false);
  const [finalizedCards, setFinalizedCards] = useState<IColumnCard[]>([]);
  const [editableCard, setEditableCard] = useState<IColumnCard>(initialCard);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isAddButtonDisabled = isButtonDisabled || isAddingDisabled;
  const onCreateCard = () => {
    setIsNewCard(true);
    setFinalizedCards((prevCards) => [editableCard, ...prevCards]);
    setIsButtonDisabled(true);
  };

  const onSaveHandler = (
    cards: IColumnCard[],
    handledCard: IColumnCard,
    cardIndex: number
  ) => {
    if (handledCard._id) {
      axios
        .put(`${FRIENDLY_DOMAIN}card`, {
          _id: handledCard._id,
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
        .post(`${FRIENDLY_DOMAIN}card`, {
          boardId,
          columnId: props.columnId,
          cardComment: handledCard.cardComment,
          cardAuthor: handledCard.cardAuthor,
          cardTags: handledCard.cardTags
        })
        .then((res) => {
          setFinalizedCards((prevCards) => {
            const filteredCards = prevCards.filter((card) => !card.isEditable);
            return [{ ...handledCard, _id: res.data._id }, ...filteredCards];
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

  // ToDo: check if card Id is temp card Id !important
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
      url: `${FRIENDLY_DOMAIN}card`,
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

  return (
    <section className={`${classes.column} col-4`}>
      <div className={classes['column__header']}>
        <h2>{props.columnTitle}</h2>
        <p>{props.columnSubtitle}</p>
      </div>
      <div className={classes['column__adding']}>
        <Button
          data-testid='addNewCommentButton'
          disabled={isAddButtonDisabled}
          role='button'
          aria-label='Add new comment'
          onClick={onCreateCard}
        >
          <i className='bi bi-plus'></i>
          <h5>Add comment</h5>
        </Button>
      </div>
      <div id='comments' className={classes['column__comments']}>
        {finalizedCards?.map(
          (card) =>
            (isNewCard && card.isEditable && (
              <NewCard
                key={editableCard._id}
                _id={editableCard._id}
                cardComment={editableCard.cardComment}
                cardAuthor={editableCard.cardAuthor}
                cardTags={editableCard.cardTags}
                isDisabled={isAddingDisabled}
                onAction={handleAction}
              />
            )) || (
              <FinalizedCard
                key={card.cardComment}
                _id={card._id}
                cardComment={card.cardComment}
                cardAuthor={card.cardAuthor}
                cardTags={card.cardTags}
                isDisabled={isAddingDisabled}
                onAction={handleAction}
              />
            )
        )}
      </div>
    </section>
  );
};

export default Column;
