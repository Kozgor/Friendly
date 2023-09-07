import { useContext, useState } from 'react';
import { ColumnContext } from '../../store/column-context';

import Button from '@mui/joy/Button';

import ColumnCard from '../NewColumnCard/NewColumnCard';
import FinalizedComment from '../FinalizedComment/FinalizedComment';
import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';

import classes from './Column.module.scss';

const Column = (props: IColumn) => {
  const initialCard = {
    cardId: '',
    cardMessage: '',
    cardAuthor: '',
    cardTags: [],
    cardReactions: [],
    cardComments: [],
    onSaveCard: () => {},
    onRemoveCard: () => {}
  };
  const { isAddingDisabled } = useContext(ColumnContext);
  const [isNewCard, setIsNewCard] = useState(false);
  const [finalizedCards, setFinalizedCards] = useState<IColumnCard[]>([]);
  const [editableCard, setEditableCard] = useState<IColumnCard>(initialCard);

  const onCreateCard = () => {
    setIsNewCard(true);
  };

  const handleSaveCard = (newCard: IColumnCard) => {
    setIsNewCard(false);
    setFinalizedCards((prevCards) => [newCard, ...prevCards]);
    setEditableCard(initialCard);
  };

  const handleCancelCard = (cardId: string) => {
    setIsNewCard(false);
    if (editableCard.cardId) {
      setFinalizedCards((prevCards) => [editableCard, ...prevCards]);
      setEditableCard(initialCard);
      return;
    }
    setFinalizedCards((prevCards) =>
      prevCards.filter((card) => card.cardId !== cardId)
    );
  };

  const handleEditCard = (cardId: string) => {
    setIsNewCard(true);
    setEditableCard(finalizedCards.filter((card) => card.cardId === cardId)[0]);
    setFinalizedCards((prevCards) =>
      prevCards.filter((card) => card.cardId !== cardId)
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
      <div className={classes['column__comments']}>
        {isNewCard && (
          <ColumnCard
            cardId={editableCard.cardId || `${Date.now()}`}
            cardMessage={editableCard.cardMessage || ''}
            cardAuthor={editableCard.cardAuthor || 'Redux Prisoner'}
            cardTags={['primary', 'danger']}
            onSaveCard={handleSaveCard}
            onRemoveCard={handleCancelCard}
          />
        )}
        {finalizedCards?.map((card) => (
          <FinalizedComment
            key={card.cardId}
            cardId={card.cardId}
            cardMessage={card.cardMessage}
            cardAuthor={card.cardAuthor}
            cardTags={card.cardTags}
            onSaveCard={handleSaveCard}
            onEditCard={handleEditCard}
            onRemoveCard={handleCancelCard}
          />
        ))}
      </div>
    </section>
  );
};

export default Column;
