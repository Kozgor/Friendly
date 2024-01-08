import * as DOMPurify from 'dompurify';
import {
  Box,
  Card,
  IconButton,
  Option,
  Select,
  Textarea
} from '@mui/joy';
import { ChangeEvent, FormEvent, useState } from 'react';
import { cardTextareaPlaceholder, tagsPlaceholder } from '../../constants';
import { CardTag } from '../../types/cardTags';
import { INewCommentInput } from '../../interfaces/newCommentInput';
import { icons } from '../../theme/icons/icons';
import { isString } from 'lodash';

import CardAvatar from '../CardAvatar/CardAvatar';
import CardChip from '../CardChip/CardChip';

import classes from './NewCommentInput.module.scss';

const NewCommentInput = (props: INewCommentInput) => {
  const { userName, userAvatar, cardTags, isDisabled, sendNewComment } = props;
  const [cardAuthorState, setCardAutorState] = useState<string>(userName);
  const [cardAuthorAvatarState, setCardAuthorAvatarState] = useState<string>(userAvatar);
  const [cardCommentState, setCardCommentState] = useState<string>('');
  const [cardTagsState, setCardTagsState] = useState<CardTag[]>([]);

  const onHandleSwitchToggle = () => {
    if (cardAuthorState === 'Incognito') {
      setCardAutorState(userName);
      setCardAuthorAvatarState(userAvatar || '');

      return;
    }

    setCardAutorState('Incognito');
    setCardAuthorAvatarState('Incognito');
  };

  const handleSelectChange = (event: React.SyntheticEvent | null, newValue: CardTag[] | null) => {
    setCardTagsState(newValue || []);
  };

  const onSendNewComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cardCommentState.length) {
      sendNewComment(
        cardAuthorState,
        DOMPurify.sanitize(cardCommentState),
        cardTagsState
      );
      setCardCommentState('');
      handleSelectChange(null, []);

      return;
    }
  };

  return (
    <div className={classes.commentInput} aria-description='comment box'>
      <form style={{ width: '100%' }}
        onSubmit={onSendNewComment}
      >
        <Card
          variant='plain'
          className={classes.card}
          sx={{
            width: '100%',
            height: '107px',
            gap: 'unset',
            backgroundColor: 'var(--friendly-palette-shades-50)',
            padding: '11px 7px 13px 14px',
            borderRadius: '8px'
          }}
        >

          <div className={classes.commentInputTop}>
            <div className={classes.commentInputAvatarContainer}>
              <div className={classes.commentInputAvatar}>
                <CardAvatar
                  isBorder={true}
                  borderColor={'var(--friendly-palette-primary-200)'}
                  cardAuthor={cardAuthorState}
                  cardAuthorAvatar={cardAuthorAvatarState}
                  data-testid='newCommentAvatar'
                  onToggle={onHandleSwitchToggle}
                ></CardAvatar>
              </div>
            </div>
            <div className={classes.commentInputTextareaContainer}>
              <div className={classes.commentInputTextarea}>
                <Textarea
                  data-testid='newCardTextarea'
                  minRows={3}
                  maxRows={3}
                  variant='plain'
                  size='sm'
                  required
                  aria-required='true'
                  placeholder={cardTextareaPlaceholder}
                  aria-placeholder={cardTextareaPlaceholder}
                  value={cardCommentState}
                  aria-valuetext={cardCommentState}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setCardCommentState(event.target.value)
                  }
                  sx={{
                    '&.MuiTextarea-root': {
                      backgroundColor: 'var(--friendly-palette-shades-50)',
                      fontFamily: '"Open Sans", sans-serif'
                    },
                    height: '56px'
                  }}
                />
              </div>
            </div>
          </div>
          <div className={classes.commentInputBottom}>
            <div className={classes.commentTagsContainer}>
              <div className={classes.commentTags}>
                <Select
                  value={cardTagsState}
                  multiple
                  aria-multiselectable='true'
                  onChange={handleSelectChange}
                  placeholder={tagsPlaceholder}
                  aria-placeholder={tagsPlaceholder}
                  size='sm'
                  data-testid='newCardSelectComponent'
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
                    width: '100%',
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
                >{cardTags.map(tag =>
                (<Option role="option" key={tag} value={tag} sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'var(--friendly-palette-primary-600)',
                    color: 'var(--friendly-palette-shades-50)'
                  },
                  '&.MuiOption-root': {
                    '&:hover': {
                      backgroundColor: 'var(--friendly-palette-primary-100)',
                      color: 'var(--friendly-palette-neutral-900)'
                    },
                    '&.MuiOption-highlighted': {
                      backgroundColor: 'var(--friendly-palette-primary-100)',
                      color: 'var(--friendly-palette-neutral-900)'
                    }
                  }
                }}>{tag}</Option>)
                )}
                </Select>
              </div>
            </div>
            <div className={classes.commentInputSendContainer}>
              <div className={classes.commentInputSendButton}>
                <IconButton
                  type='submit'
                  variant='solid'
                  color='success'
                  disabled={isDisabled}
                  aria-disabled={isDisabled}
                  data-testid='newCardSendButton'
                  className={classes.sendButtonIconComponent}
                  sx={{
                    '&.Mui-disabled': {
                      opacity: '.5'
                    },
                    '&.MuiIconButton-root': {
                      minWidth: '28px',
                      minHeight: '28px'
                    }
                  }}
                >
                  {icons.cursor('var(--friendly-palette-accent-300')}
                </IconButton>
              </div>
            </div>
          </div>
        </Card>
      </form>
    </div >
  );
};

export default NewCommentInput;
