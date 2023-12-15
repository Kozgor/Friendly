import moment from 'moment';

import {
  Box,
  Card,
  IconButton,
  Option,
  Select,
  Textarea
} from '@mui/joy';
import { CardTag, possibleCardTags } from '../../types/cardTags';
import { ChangeEvent, useState } from 'react';
import { cardTextareaPlaceholder, tagsPlaceholder } from '../../constants';
import { IColumnCard } from '../../interfaces/columnCard';
import { icons } from '../../theme/icons/icons';
import { isString } from 'lodash';
import { localStorageManager } from '../../utils/localStorageManager';

import CardAvatar from '../CardAvatar/CardAvatar';
import CardChip from '../CardChip/CardChip';

import classes from './EditCard.module.scss';

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
      orientation='vertical'
      variant='outlined'
      sx={{
        marginBottom: 4,
        marginLeft: '8px',
        marginRight: '8px',
        backgroundColor: 'var(--friendly-palette-shades-50)',
        userSelect: 'none', /* standard syntax */
        'WebkitUserSelect': 'none', /* webkit (safari, chrome) browsers */
        'MozUserSelect': 'none', /* mozilla browsers */
        'KhtmlUserSelect': 'none', /* webkit (konqueror) browsers */
        'MsUserSelect': 'none' /* IE10+ */
      }}
    >
      <div className={classes.editCardTop}>
        <div className={classes.editCardAvatarContainer}>
          <div className={classes.editCardAvatar}>
            <CardAvatar
              cardAuthor={cardAuthorState}
              cardAuthorAvatar={cardAuthorAvatarState}
              isBorder={true}
              borderColor={'var(--friendly-palette-primary-200)'}
              onToggle={onHandleSwitchToggle}
            ></CardAvatar>
          </div>
        </div>
        <div className={classes.editCardTextareaContainer}>
          <div className={classes.editCardTextarea}>
            <Textarea
              data-testid='newCardTextarea'
              minRows={3}
              maxRows={4}
              variant='outlined'
              placeholder={cardTextareaPlaceholder}
              value={cardCommentState}
              disabled={isDisabled}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setCardComment(event.target.value)
              }
              sx={{
                backgroundColor: 'var(--friendly-palette-shades-50)',
                '& textarea': {
                  userSelect: 'none', /* standard syntax */
                  'WebkitUserSelect': 'none', /* webkit (safari, chrome) browsers */
                  'MozUserSelect': 'none', /* mozilla browsers */
                  'KhtmlUserSelect': 'none', /* webkit (konqueror) browsers */
                  'MsUserSelect': 'none' /* IE10+ */
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className={classes.editCardBottomContainer}>
        <div className={classes.editCardBottom}>
          {cardTagsState && (
            <div className={classes.editCardTags}>
              <Select
                value={cardTagsState}
                multiple
                onChange={(event, newValue) => setCardTags([...newValue])}
                placeholder={tagsPlaceholder}
                size='sm'
                data-testid='select-tags-component'
                renderValue={selected =>
                  (<Box sx={{ display: 'flex', gap: '0.25rem' }}>
                    {selected.map((selectedOption, index) => {
                      if (isString(selectedOption.label)) {
                        return (<CardChip key={index} tag={selectedOption.label} />);
                      }

                      return null;
                    })}
                  </Box>)
                }
                sx={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeigth: '400',
                  backgroundColor: 'var(--friendly-palette-shades-50)',
                  boxShadow: 'none',
                  border: 'none',
                  padding: 0,
                  fontFamily: '"Open Sans", sans-serif',
                  '&:hover': {
                    backgroundColor: 'var(--friendly-palette-shades-50)'
                  }
                }}
                slotProps={{
                  indicator: {
                    'style': {
                      display: 'none'
                    }
                  }
                }}
              >{possibleCardTags.map(tag =>
                (<Option key={tag} value={tag}>{tag}</Option>)
              )}
              </Select>
            </div>
          )}
          <div className={classes.editCardButtons}>
            <div className={classes.cardFooterCancelButton}>
              <IconButton
                data-testid='editCardButtonCancel'
                variant='outlined'
                color='neutral'
                onClick={onCancelCard}
                disabled={!cardCommentState && isDisabled}
                sx={{
                  '&.MuiIconButton-root': {
                    minWidth: '28px',
                    minHeight: '28px'
                  }
                }}
              >
                {icons.x('var(--friendly-palette-neutral-400)')}
              </IconButton>
            </div>
            <div className={classes.cardFooterSaveButton}>
              <IconButton
                data-testid='editCardButtonSave'
                variant='solid'
                onClick={onSaveCard}
                disabled={!cardCommentState || isDisabled}
                sx={{
                  '&.MuiIconButton-root': {
                    minWidth: '28px',
                    minHeight: '28px'
                  },
                  backgroundColor: 'var(--friendly-palette-secondary-900)',
                  '&:hover': {
                    backgroundColor: 'var(--friendly-palette-secondary-900)'
                  },
                  '&:disabled': {
                    backgroundColor: 'var(--friendly-palette-secondary-900)',
                    opacity: '.5'
                  }
                }}
              >
                {icons.cursor('var(--friendly-palette-accent-300')}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewCard;
