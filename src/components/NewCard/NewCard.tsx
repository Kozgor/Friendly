import { ChangeEvent, useState } from 'react';

import { Autocomplete, Avatar, Button, Card, Textarea } from '@mui/joy';
import { IColumnCard } from '../../interfaces/columnCard';

import { CardTag } from '../../types/cardTags';

import classes from './NewCard.module.scss';

const NewCard = (props: IColumnCard) => {
  const { cardId, cardAuthor, cardComment, cardTags } = props;
  const [cardCommentState, setCardComment] = useState(cardComment);
  const [cardTagsState, setCardTags] = useState<CardTag[]>(cardTags || []);
  const [cardAuthorState, setCardAuthor] = useState(cardAuthor);

  const onHandleSwitchToggle = () => {
    cardAuthorState === 'Incognito' ?
    setCardAuthor(cardAuthor) : setCardAuthor('Incognito');
  };

  const onCancelCard = () => {
    props.onAction('cancel', {
      cardId: props.cardId,
      cardAuthor: props.cardAuthor,
      cardComment: props.cardComment,
      onAction: props.onAction
    });
  };

  // ToDo: Add reactions and comments via cardReactionsState, cardCommentsState
  const onSaveCard = () => {
    const newCard: IColumnCard = {
      cardId: props.cardId,
      cardComment: cardCommentState,
      cardAuthor: cardAuthorState,
      cardTags: props.cardTags,
      onAction: () => {}
    };

    props.onAction('save', newCard);
  };

  return (
    <Card color="neutral" orientation="vertical" variant="outlined">
      <div className={classes['card__header']}>
        {cardTagsState && (
          <div className={classes['card__header__tags']}>
            <Autocomplete
              multiple
              placeholder="Tags"
              size="sm"
              variant="outlined"
              options={cardTags || []}
              value={cardTagsState}
              onChange={(event, newValue) =>
                setCardTags([...newValue])
              }
            />
          </div>
        )}
      </div>
      <div className={classes['card__body']}>
        <div className={classes['card__body__user-section']}>
          <div className={classes['card__body__user-section--avatar']}>
            <Avatar
              onClick={onHandleSwitchToggle}
              alt={cardAuthorState}
              src={cardAuthorState}
              sx={{
                cursor: 'pointer'
              }}
            >
              {/* ToDo: To improve with author avatar */}
              {cardAuthorState === 'Incognito' ? <i className="bi bi-incognito"></i> : cardAuthor[0]}
            </Avatar>
          </div>
        </div>
        <div className={classes['card__body__message-section']}>
          <div className={classes['card__body__message-section--textarea']}>
            <Textarea
              minRows={3}
              maxRows={4}
              variant="outlined"
              placeholder="Type something…"
              value={cardCommentState}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setCardComment(event.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className={classes['card__footer']}>
        <div className={classes['card__footer--cancel-button']}>
          <Button variant="plain" color="neutral" onClick={onCancelCard}>
            Cancel
          </Button>
        </div>
        <div className={classes['card__footer--save-button']}>
          <Button variant="plain" color="neutral" onClick={onSaveCard}>
            Save
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NewCard;
