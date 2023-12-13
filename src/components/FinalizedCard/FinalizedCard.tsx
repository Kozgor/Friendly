/* eslint-disable max-lines */
/* eslint-disable complexity */
import { useState } from 'react';

import {
  Button,
  Card,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Typography
} from '@mui/joy';
import { ArrowDropDown } from '@mui/icons-material';
import { isNull } from 'lodash';

import CardAvatar from '../CardAvatar/CardAvatar';
import CardTagChip from '../CardChip/CardChip';
import { IColumnCard } from '../../interfaces/columnCard';
import { columnAPI } from '../../api/ColumnAPI';
import { icons } from '../../theme/icons/icons';

import classes from './FinalizedCard.module.scss';

const FinalizedCard = (props: IColumnCard) => {
  const {
    _id,
    cardAuthor,
    cardAuthorAvatar,
    cardAuthorId,
    cardActionAuthorId,
    cardComment,
    cardTags,
    cardReactions,
    createdAt,
    isEditable,
    isDisabled
  } = props;
  const [isShownAllText, setIsShownAllText] = useState(cardComment.length <= 30);
  const [displayShowButton] = useState(cardComment.length > 120);
  const [reactionState, setReactionState] = useState(cardReactions);
  const { updateColumnCardReaction } = columnAPI();
  const isShownAllTags = cardTags && cardTags?.length < 3;
  const isEmojiSmile = reactionState && !isNull(reactionState);
  const isEmojiFrown = !reactionState && !isNull(reactionState);

  const showMoreText = () => {
    setIsShownAllText(true);
  };

  const showLessText = () => {
    setIsShownAllText(false);
  };

  const onClickReaction = (isHappyReaction: boolean) => {
    setReactionState(isHappyReaction);
    updateColumnCardReaction(_id, cardActionAuthorId || '', isHappyReaction);
  };

  const deleteCard = () => {
    props.onAction?.('remove', {
      _id: _id,
      createdAt: createdAt,
      cardAuthor: cardAuthor,
      cardAuthorId: cardAuthorId,
      cardAuthorAvatar: cardAuthorAvatar,
      cardComment: cardComment
    });
  };

  const editCard = (event: any) => {
    event.preventDefault();
    if (isEditable) {
      props.onAction?.('edit', {
        _id: _id,
        createdAt: createdAt,
        cardAuthor: cardAuthor,
        cardAuthorId: cardAuthorId,
        cardAuthorAvatar: cardAuthorAvatar,
        cardComment: cardComment,
        cardTags: cardTags
      });
    }
  };

  return (
    <Card
      variant='outlined'
      className={classes.card}
      sx={{
        '--Card-padding': '10px',
        gap: 'unset',
        marginBottom: 4,
        minHeight: isShownAllText ? 140 : 'unset',
        height: isShownAllText ? 'unset' : 140,
        backgroundColor: 'var(--friendly-palette-shades-50)',
        border: 'none',
        padding: '10px 24px 16px',
        boxShadow: '0px 8px 16px #0000001a',
        userSelect: 'none', /* standard syntax */
        'WebkitUserSelect': 'none', /* webkit (safari, chrome) browsers */
        'MozUserSelect': 'none', /* mozilla browsers */
        'KhtmlUserSelect': 'none', /* webkit (konqueror) browsers */
        'MsUserSelect': 'none' /* IE10+ */
      }}
      onDoubleClick={editCard}
    >
      <div className={classes.author}>
        <CardAvatar
          cardAuthor={cardAuthor}
          cardAuthorAvatar={cardAuthorAvatar || ''}
        ></CardAvatar>
      </div>
      <div id='message' className={classes.message}>
        <Typography component='p' sx={{
          display: isShownAllText ? 'block' : '-webkit-box',
          'WebkitLineClamp': cardTags?.length ? '2' : '3',
          lineHeight: 1
        }}>{cardComment}</Typography>
      </div >
      {
        displayShowButton && !isShownAllText && (
          <Button
            data-testid='showMoreButton'
            variant='plain'
            className={classes.showButton}
            onClick={showMoreText}
            sx={{
              color: 'var(--friendly-palette-shades-900)',
              fontSize: 10,
              width: 110,
              padding: 0,
              height: 25,
              minHeight: 'unset'
            }}
            endDecorator={<ArrowDropDown sx={{
              width: '16px',
              height: '16px'
            }} />}
          >
            Show more
          </Button>
        )
      }
      {
        displayShowButton && isShownAllText && (
          <Button
            data-testid='showLessButton'
            variant='plain'
            className={classes.showButton}
            onClick={showLessText}
            sx={{
              color: 'var(--friendly-palette-shades-900)',
              fontSize: 10,
              width: 110,
              padding: 0,
              height: 25,
              minHeight: 'unset',
              '& .MuiSvgIcon-root': {
                transition: '0.2s',
                transform: 'rotate(-180deg)'
              }
            }}
            endDecorator={<ArrowDropDown sx={{
              width: '16px',
              height: '16px'
            }} />}
          >
            Show less
          </Button>
        )
      }
      <div className={classes.footer}>
        <div className={classes.footerTags}>
          {isShownAllTags && cardTags &&
            <div className={classes.tags}>
              {cardTags?.map((tag) => (
                <CardTagChip datda-testid='tag' key={tag} tag={tag} />
              ))}
            </div>
          }
          {!isShownAllTags && cardTags &&
            <div className={classes.tags}>
              {
                <>
                  <CardTagChip key={cardTags[0]} tag={cardTags[0]} />
                  <CardTagChip key={cardTags[1]} tag={cardTags[1]} />
                  <Dropdown>
                    <MenuButton
                      variant='plain'
                      size='sm'
                      sx={{
                        padding: '6px 8px',
                        backgroundColor: 'var(--friendly-palette-neutral-50)',
                        borderRadius: '20px',
                        border: 'solid 1px var(--friendly-palette-neutral-50)',
                        fontSize: '10px',
                        fontWeight: '400',
                        '&:hover': {
                          backgroundColor: 'var(--friendly-palette-neutral-50)'
                        },
                        '&.MuiMenuButton-root': {
                          width: '28px',
                          height: '26px',
                          fontSize: '10px',
                          minHeight: '0px'
                        }
                      }}
                    >
                      {`+${cardTags?.length - 2}`}
                    </MenuButton>
                    <Menu>
                      {cardTags.slice(2).map((tag) => (
                        <MenuItem key={tag}>
                          {tag}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Dropdown>
                </>
              }
            </div>
          }
        </div>
        {isDisabled && <div className={classes.footerReactons}>
          <IconButton
            variant='outlined'
            onClick={() => onClickReaction(true)}
            sx={{
              marginRight: '8px',
              minWidth: '26px',
              minHeight: '26px',
              backgroundColor: isEmojiSmile ? 'var(--friendly-palette-accent-900)' : 'transparent',
              borderColor: isEmojiSmile ? 'var(--friendly-palette-accent-900)' : '#a0abbb',
              '&:hover': {
                backgroundColor: isEmojiSmile ? 'var(--friendly-palette-accent-900)' : 'transparent'
              }
            }}
          >
            {icons.emojiSmile(`${isEmojiSmile ? 'var(--friendly-palette-shades-50)' : '#484a4b'}`, '16px')}
          </IconButton>
          <IconButton
            variant='outlined'
            onClick={() => onClickReaction(false)}
            sx={{
              backgroundColor: isEmojiFrown ? 'var(--friendly-palette-accent-900)' : 'transparent',
              minWidth: '26px',
              minHeight: '26px',
              borderColor: isEmojiFrown ? 'var(--friendly-palette-accent-900)' : '#a0abbb',
              '&:hover': {
                backgroundColor: isEmojiFrown ? 'var(--friendly-palette-accent-900)' : 'transparent'
              }
            }}
          >
            {icons.emojiFrown(`${isEmojiFrown ? 'var(--friendly-palette-shades-50)' : '#484a4b'}`, '16px')}
          </IconButton>
        </div>}
      </div>
    </Card >
  );
};

export default FinalizedCard;
