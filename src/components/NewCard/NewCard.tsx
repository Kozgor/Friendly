import { ChangeEvent, useState } from 'react';
import moment from 'moment';

import {
  Autocomplete,
  Button,
  Card,
  Textarea
} from '@mui/joy';
import CardAvatar from '../CardAvatar/CardAvatar';
import { IColumnCard } from '../../interfaces/columnCard';

import { CardTag, possibleCardTags } from '../../types/cardTags';

import classes from './NewCard.module.scss';
import { localStorageManager } from '../../utils/localStorageManager';

const NewCard = (props: IColumnCard) => {
  const {
    _id,
    cardAuthor,
    cardAuthorId,
    cardAuthorAvatar,
    cardComment,
    cardTags,
    isDisabled,
    createdAt
  } = props;
  const [cardCommentState, setCardComment] = useState(cardComment);
  const [cardTagsState, setCardTags] = useState<CardTag[]>(cardTags || []);
  const [cardAuthorState, setCardAuthor] = useState(cardAuthor);
  const [cardAuthorAvatarState, setCardAuthorAvatar] = useState(cardAuthorAvatar || '');
  const { getLocalUserData } = localStorageManager();
  const localUser = getLocalUserData();

  const onHandleSwitchToggle = () => {
    if (cardAuthorState === 'Incognito') {
      setCardAuthor(localUser.fullName);
      setCardAuthorAvatar(localUser.avatar || '');

      return;
    }

    setCardAuthor('Incognito');
    setCardAuthorAvatar('Incognito');
  };

  const onCancelCard = () => {
    props.onAction?.('cancel', {
      _id: props._id,
      createdAt: props.createdAt,
      cardAuthor: props.cardAuthor,
      cardAuthorId: props.cardAuthorId,
      cardAuthorAvatar: props.cardAuthorAvatar,
      cardComment: props.cardComment
    });
  };

  const onSaveCard = () => {
    const onSaveCreatedAt = !createdAt ? moment().toISOString() : createdAt;
    const onSaveCardId = !_id ? '' : _id;

    const newCard: IColumnCard = {
      _id: onSaveCardId,
      createdAt: onSaveCreatedAt,
      cardComment: cardCommentState,
      cardAuthor: cardAuthorState,
      cardAuthorAvatar: cardAuthorAvatarState,
      cardAuthorId: cardAuthorId,
      cardTags: cardTagsState
    };

    props.onAction?.('save', newCard);
  };

  return (
    <Card
      color='neutral'
      orientation='vertical'
      variant='outlined'
      sx={{
        marginBottom: 4
      }}
    >
      <div className={classes['card__header']}>
        <div className={classes['card__header__user-section']}>
          <div className={classes['card__header__user-section--avatar']}>
            <CardAvatar
              cardAuthor={cardAuthorState}
              cardAuthorAvatar={cardAuthorAvatarState}
              onToggle={onHandleSwitchToggle}
            ></CardAvatar>
          </div>
        </div>
        <div className={classes['card__header__message-section']}>
          <div className={classes['card__header__message-section--textarea']}>
            <Textarea
              data-testid='newCardTextarea'
              minRows={3}
              maxRows={4}
              variant='outlined'
              placeholder='Type something…'
              value={cardCommentState}
              disabled={isDisabled}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setCardComment(event.target.value)
              }
              sx={{
                backgroundColor: 'var(--friendly-palette-shades-50)'
              }}
            />
          </div>
        </div>
      </div>
      <div className={classes['card__body']}>
        {cardTagsState && (
          <div className={classes['card__body__tags']}>
            <Autocomplete
              data-testid='tags-default'
              multiple
              placeholder='Tags'
              options={possibleCardTags}
              getOptionLabel={(option) => option}
              value={cardTagsState}
              onChange={(event, newValue) => setCardTags([...newValue])}
              sx={{
                backgroundColor: 'var(--friendly-palette-shades-50)'
              }}
            />
          </div>
        )}
      </div>
      <div className={classes['card__footer']}>
        <div className={classes['card__footer--cancel-button']}>
          <Button
            data-testid='newCardButtonCancel'
            variant='plain'
            color='neutral'
            onClick={onCancelCard}
            disabled={!cardCommentState && isDisabled}
          >
            Cancel
          </Button>
        </div>
        <div className={classes['card__footer--save-button']}>
          <Button
            data-testid='newCardButtonSave'
            variant='solid'
            color='primary'
            onClick={onSaveCard}
            disabled={!cardCommentState || isDisabled}
          >
            Save
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NewCard;
