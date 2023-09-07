import { useContext, useState } from 'react';
import { ColumnContext } from '../../store/column-context';

import Button from '@mui/joy/Button';

import ColumnCard from '../NewColumnCard/NewColumnCard';
import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';

import classes from './Column.module.scss';
import FinalizedComment from '../FinalizedComment/FinalizedComment';

const Column = (props: IColumn) => {
  const { isAddingDisabled } = useContext(ColumnContext);
  const [isNewCard, setIsNewCard] = useState(false);
  const [finalizedCards, setFinalizedCards] = useState<IColumnCard[]>([]);

  const onCreateCard = () => {
    setIsNewCard(true);
  };

  const handleSaveCard = (newCard: IColumnCard) => {
    setIsNewCard(false);
    setFinalizedCards(prevCards => [newCard, ...prevCards]);
    console.log(newCard);
  };

  const handleCancelCard = (cardId: string) => {
    setIsNewCard(false);
    setFinalizedCards(prevCards =>
      prevCards.filter(card => card.cardId !== cardId)
    );
  };

  return (
    <section className={classes.column}>
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
          <h4>Add comment</h4>
        </Button>
      </div>
      <div className={classes['column__comments']}>
        {isNewCard &&
          <ColumnCard
            cardId='dummyId'
            cardMessage=''
            cardAuthor='Redux Prisoner'
            cardTags={['primary', 'danger']}
            onSaveCard={handleSaveCard}
            onRemoveCard={handleCancelCard}
          />
        }
        {/* ToDo: render finalizedCards with Finalized component */}
        {finalizedCards?.map(card => (
            <FinalizedComment
              key={Date.now()}
              cardId={card.cardId}
              cardMessage={card.cardMessage}
              cardAuthor={card.cardAuthor}
              cardTags={card.cardTags}
              onSaveCard={handleSaveCard}
              onRemoveCard={handleCancelCard}
            />
        ))}
      </div>
    </section>
  );
};

export default Column;
