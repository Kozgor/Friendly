import { useContext, useState } from 'react';
import { ColumnContext } from '../../store/column-context';

import Button from '@mui/joy/Button';

import ColumnCard from '../NewColumnCard/NewColumnCard';
import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';

import { CardTag, cardTags } from '../../types/cardTags';

import { v4 as uuidv4 } from 'uuid';

import classes from './Column.module.scss';

const Column = (props: IColumn) => {
  const { isAddingDisabled } = useContext(ColumnContext);
  const [isNewCard, setIsNewCard] = useState(false);
  const [finalizedCards, setFinalizedCards] = useState<IColumnCard[]>([]);
  const defaultCardTags: CardTag[] = [...cardTags];
  const defaultMessage = '';
  const defaultCardAuthor = localStorage.getItem('fullName') || 'Incognito';
  const cardId = uuidv4();

  const onCreateCard = () => {
    setIsNewCard(true);
  };

  const handleSaveCard = (newCard: IColumnCard) => {
    setIsNewCard(false);
    setFinalizedCards((prevCards) => [...prevCards, newCard]);
  };

  const handleCancelCard = (cardId: string) => {
    setIsNewCard(false);
    setFinalizedCards((prevCards) =>
      prevCards.filter((card) => card.cardId !== cardId)
    );
  };

  return (
    <section className={classes.column}>
      <div className={classes['column__header']}>
        <h2>{props.columnTitle}</h2>
        <p>{props.columnSubtitle}</p>
      </div>
      <div className={classes['column__adding']}>
        <Button
          disabled={isAddingDisabled}
          role="button"
          aria-label="Add new comment"
          onClick={onCreateCard}
        >
          <i className="bi bi-plus"></i>
          <h4>Add comment</h4>
        </Button>
      </div>
      <div className={classes['column__comments']}>
        {isNewCard && (
          <ColumnCard
            cardId={cardId}
            cardMessage={defaultMessage}
            cardAuthor={defaultCardAuthor}
            cardTags={defaultCardTags}
            saveCard={handleSaveCard}
            removeCard={handleCancelCard}
          />
        )}
        {/* ToDo: render finalizedCards with Finalized component */}
        {finalizedCards?.map((card) => (
          <ColumnCard
            key={card.cardId}
            cardId={card.cardId}
            cardMessage={card.cardMessage}
            cardAuthor={card.cardAuthor}
            cardTags={card.cardTags}
            saveCard={handleSaveCard}
            removeCard={handleCancelCard}
          />
        ))}
      </div>
    </section>
  );
};

export default Column;
