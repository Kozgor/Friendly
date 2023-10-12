import axios from 'axios';

import { useContext, useEffect, useState } from 'react';
import Button from '@mui/joy/Button';

import FinalizedCard from '../FinalizedCard/FinalizedCard';
import NewCard from '../NewCard/NewCard';

import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';

import { localStorageManager } from '../../utils/localStorageManager';

import { BoardContext } from '../../context/board/boardContext';
import { sortByDate } from '../../utils/sortByDate';

import classes from './Column.module.scss';

const Column = (props: IColumn) => {
  const FRIENDLY_DOMAIN = process.env.REACT_APP_FRIENDLY_DOMAIN;
  const { getLocalUserData } = localStorageManager();
  const localUserData= getLocalUserData();
  const initialCard = {
    _id: '',
    createdAt: '',
    cardComment: '',
    cardAuthorId: localUserData._id,
    cardAuthor: localUserData.fullName || 'Incognito',
    cardAuthorAvatar: localUserData.avatar || 'Incognito',
    cardTags: [],
    isEditable: true
  };

  const { boardId, boardStatus, isAddingDisabled, isTimerFinalized } = useContext(BoardContext);
  const [isNewCard, setIsNewCard] = useState(false);
  const [finalizedCards, setFinalizedCards] = useState(() => sortByDate(props.columnCards));
  const [editableCard, setEditableCard] = useState<IColumnCard>(initialCard);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isAddButtonDisabled = isButtonDisabled || isAddingDisabled;

  useEffect(() => {
    setFinalizedCards(sortByDate(props.columnCards));
  }, [props.columnCards]);

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
      {(boardStatus === 'active' && !isTimerFinalized) &&
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
      }
      <div id='comments' className={classes['column__comments']}>
        {finalizedCards?.map(
          (card) =>
            (isNewCard && card.isEditable && (
              <NewCard
                key={editableCard._id}
                _id={editableCard._id}
                createdAt={editableCard.createdAt}
                cardComment={editableCard.cardComment}
                cardAuthor={editableCard.cardAuthor}
                cardAuthorAvatar={editableCard.cardAuthorAvatar}
                cardAuthorId={editableCard.cardAuthorId}
                cardTags={editableCard.cardTags}
                isDisabled={isAddingDisabled}
                onAction={handleAction}
              />
            )) || (
              <FinalizedCard
                key={card._id}
                _id={card._id}
                createdAt={card.createdAt}
                cardComment={card.cardComment}
                cardAuthor={card.cardAuthor}
                cardAuthorId={card.cardAuthorId}
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
