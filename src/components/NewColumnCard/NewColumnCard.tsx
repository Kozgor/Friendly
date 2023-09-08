
import { ChangeEvent, useState } from 'react';

import { Autocomplete, Avatar, Button, Card, Textarea } from '@mui/joy';

import { IColumnCard } from '../../interfaces/columnCard';

import classes from './NewColumnCard.module.scss';

const ColumnCard = (props: IColumnCard) => {
  const isPropsIncognito = () => props.cardAuthor === 'Incognito';
  const [isIncognito, setIncognito] = useState(isPropsIncognito);
  const [cardComment, setCardCommentMessage] = useState('');

  const onHandleSwitchToggle = () => {
    setIncognito(!isIncognito);
  };

  const onHandleTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCardCommentMessage(event.target.value);
  };

  const onRemoveCard = () => {
    props.onRemoveCard(props.cardId);
  };

  const onSaveCard = () => {
    const newCard: IColumnCard = {
      cardId: 'newCardId',
      cardMessage: cardComment,
      cardAuthor: isIncognito ? 'Incognito' : props.cardAuthor,
      onSaveCard,
      onRemoveCard
    };

    props.onSaveCard(newCard);
  };

  return (
    <Card
      color="neutral"
      orientation="vertical"
      variant="outlined"
    >
      <div className={classes['card__header']}>
        {props.cardTags&& <div className={classes['card__header__tags']}>
          <Autocomplete
            multiple
            placeholder='Tags'
            size='sm'
            variant='outlined'
            options={props.cardTags}
            getOptionLabel={option => option}
            defaultValue={props.cardTags}
          />
        </div>}
      </div>
      <div className={classes['card__body']}>
        <div className={classes['card__body__user-section']}>
          <div className={classes['card__body__user-section--avatar']}>
            <Avatar
              onClick={onHandleSwitchToggle}
              alt={!isIncognito ? props.cardAuthor: 'Incognito'}
              src={!isIncognito ? props.cardAuthor: 'Incognito'}
              sx={{
                cursor: 'pointer'
              }}
              // ToDo: change props.cardAuthor[0] to redux user avatar
            >{isIncognito ? <i className='bi bi-incognito'></i> : props.cardAuthor[0]}</Avatar>
          </div>
        </div>
        <div className={classes['card__body__message-section']}>
          <div className={classes['card__body__message-section--textarea']}>
            <Textarea
              minRows={3}
              maxRows={4}
              variant='outlined'
              placeholder='Type something…'
              onChange={onHandleTextarea}
              value={cardComment}
            />
          </div>
        </div>
      </div>
      <div className={classes['card__footer']}>
      <div className={classes['card__footer--cancel-button']}>
          <Button
            variant='plain'
            color='neutral'
            onClick={onRemoveCard}
          >
            Cancel
          </Button>
        </div>
        <div className={classes['card__footer--save-button']}>
          <Button
            variant='plain'
            color='neutral'
            onClick={onSaveCard}
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ColumnCard;