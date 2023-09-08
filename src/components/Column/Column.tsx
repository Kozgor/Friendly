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

  const handleAction = (
    actionType: string,
    cardId: string,
    handledCard: IColumnCard
  ) => {
    const finCards = [...finalizedCards];
    setIsNewCard(actionType === 'edit');
    console.log(finCards);

    if (actionType === 'edit') {
      const editCard = finCards.filter((card) => card.cardId === cardId)[0];
      setEditableCard({ ...editCard, isEditable: true });
      const editableIndex = finCards.indexOf(editCard);
      finCards.splice(editableIndex, 1, { ...editCard, isEditable: true });
      setFinalizedCards(finCards);
    }

    if (actionType === 'cancel' || actionType === 'remove') {
      setFinalizedCards((prevCards) =>
        editableCard.cardId
          ? finCards.map((card) => ({ ...card, isEditable: false }))
          : prevCards.filter((card) => !card.isEditable)
      );
      setEditableCard(initialCard);
    }

    if (actionType === 'save') {
      const editableIndex = finCards.indexOf(
        finCards.filter((card) => card.isEditable)[0]
      );

      setFinalizedCards((prevCards) => {
        const filteredCards = prevCards.filter((card) => !card.isEditable);
        finCards.splice(editableIndex, 1, { ...handledCard, isEditable: false });
        return editableCard.cardId ? finCards : [handledCard, ...filteredCards];
      });
      setEditableCard(initialCard);
    }
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
