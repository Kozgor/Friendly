import { useContext, useState } from 'react';
import { ColumnContext } from '../../store/column-context';

import Button from '@mui/joy/Button';

import ColumnCard from '../NewColumnCard/NewColumnCard';
import FinalizedCard from '../FinalizedCard/FinalizedCard';
import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';

import classes from './Column.module.scss';

const Column = (props: IColumn) => {
  const initialCard = {
    cardId: '',
    cardComment: '',
    cardAuthor: 'Redux Prisoner',
    cardTags: [],
    cardReactions: [],
    cardReplies: [],
    isEditable: true,
    onAction: () => {}
  };
  const { isAddingDisabled } = useContext(ColumnContext);
  const [isNewCard, setIsNewCard] = useState(false);
  const [finalizedCards, setFinalizedCards] = useState<IColumnCard[]>([]);
  const [editableCard, setEditableCard] = useState<IColumnCard>(initialCard);

  const onCreateCard = () => {
    setIsNewCard(true);
    setFinalizedCards((prevCards) => [editableCard, ...prevCards]);
  };

  const onSaveHandler = (
    cards: IColumnCard[],
    handledCard: IColumnCard,
    cardIndex: number
  ) => {
    setFinalizedCards((prevCards) => {
      const filteredCards = prevCards.filter((card) => !card.isEditable);
      cards.splice(cardIndex, 1, {
        ...handledCard,
        isEditable: false
      });
      return editableCard.cardId ? cards : [handledCard, ...filteredCards];
    });
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
      editableCard.cardId
        ? cards.map((card) => ({ ...card, isEditable: false }))
        : prevCards.filter((card) => !card.isEditable)
    );
  };

  const onRemoveHandler = (cards: IColumnCard[], handledCard: IColumnCard) => {
    setFinalizedCards((prevCards) =>
      prevCards.filter((card) => card.cardId !== handledCard.cardId)
    );
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
      (card) => card.cardId === handledCard.cardId
    );

    Reflect.apply(actionsMap[actionType], this, [
      finCards,
      handledCard,
      editableIndex
    ]);

    setEditableCard(
      actionType === 'edit' ? { ...handledCard, isEditable: true } : initialCard
    );
  };

  return (
    <section className={`${classes.column} col-4`}>
      <div className={classes['column__header']}>
        <h2>{props.title}</h2>
        <p>{props.subtitle}</p>
      </div>
      <div className={classes['column__adding']}>
        <Button
          disabled={isAddingDisabled}
          role="button"
          aria-label="Add new comment"
          onClick={onCreateCard}
        >
          <i className="bi bi-plus"></i>
          <h5>Add comment</h5>
        </Button>
      </div>
      <div id="comments" className={classes['column__comments']}>
        {}
        {finalizedCards?.map(
          (card) =>
            (isNewCard && card.isEditable && (
              <ColumnCard
                key={`${Date.now()}`}
                cardId={editableCard.cardId || `${Date.now()}`}
                cardComment={editableCard.cardComment}
                cardAuthor={editableCard.cardAuthor}
                cardTags={['primary', 'danger']}
                onAction={handleAction}
              />
            )) || (
              <FinalizedCard
                key={card.cardId}
                cardId={card.cardId}
                cardComment={card.cardComment}
                cardAuthor={card.cardAuthor}
                cardTags={card.cardTags}
                onAction={handleAction}
              />
            )
        )}
      </div>
    </section>
  );
};

export default Column;
