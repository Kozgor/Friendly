/* eslint-disable max-lines */
/* eslint-disable complexity */
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
import {
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { ArrowDropDown } from '@mui/icons-material';
import { BoardContext } from '../../context/board/boardContext';
import { IColumnCard } from '../../interfaces/columnCard';
import { columnAPI } from '../../api/ColumnAPI';
import { icons } from '../../theme/icons/icons';
import { isNull } from 'lodash';

import CardAvatar from '../CardAvatar/CardAvatar';
import CardChip from '../CardChip/CardChip';
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
    isDisabled,
    columnId
  } = props;

  const cardCommentRef = useRef<HTMLParagraphElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isShownAllText, setIsShownAllText] = useState(false);
  const [displayShowButton, setDisplayShowButton] = useState(false);
  const [reactionState, setReactionState] = useState(cardReactions);
  const { updateColumnCardReaction } = columnAPI();
  const isShownAllTags = cardTags && cardTags?.length < 3;
  const isEmojiSmile = reactionState && !isNull(reactionState);
  const isEmojiFrown = !reactionState && !isNull(reactionState);
  const { selectCard, selectedCards, unselectCard } = useContext(BoardContext);

  useEffect(() => {
    if (cardCommentRef.current) {
      setDisplayShowButton(cardCommentRef.current.clientHeight! !== (cardCommentRef.current.scrollHeight! - 2)!);
    }
  }, []);

  const onClickReaction = (isHappyReaction: boolean) => {
    setReactionState(isHappyReaction);
    updateColumnCardReaction(_id, cardActionAuthorId || '', isHappyReaction);
  };

  const onShowMoreTags: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
  };

  const onShowMoreText = (event: MouseEvent<HTMLButtonElement>, isFullVisibility: boolean) => {
    event.stopPropagation();
    setIsShownAllText(isFullVisibility);
  };

  const toggleSelectCard = () => {
    if (isEditable && cardRef.current) {
      const selectedCard = {
        _id,
        createdAt,
        cardAuthor,
        cardAuthorId,
        cardAuthorAvatar,
        cardComment,
        columnId
      };
      const isCardSelected = selectedCards.find(card => card._id === selectedCard._id);

      cardRef.current.style.backgroundColor = isCardSelected ? 'var(--friendly-palette-shades-50)' : 'var(--friendly-palette-secondary-200)';
      !isCardSelected && selectCard(selectedCard);
      isCardSelected && unselectCard(_id);
    }
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
      ref={cardRef}
      sx={{
        '--Card-padding': '10px',
        gap: 'unset',
        width: 'calc(100% - 16px)',
        marginLeft: '8px',
        marginRight: '8px',
        marginBottom: '30px',
        backgroundColor: 'var(--friendly-palette-shades-50)',
        border: 'none',
        padding: '10px',
        boxShadow: '0px 8px 16px #0000001a',
        minHeight: isShownAllText ? 'unset' : 140,
        maxHeight: 'unset',
        userSelect: 'none', /* standard syntax */
        'WebkitUserSelect': 'none', /* webkit (safari, chrome) browsers */
        'MozUserSelect': 'none', /* mozilla browsers */
        'KhtmlUserSelect': 'none', /* webkit (konqueror) browsers */
        'MsUserSelect': 'none' /* IE10+ */
      }}
      onDoubleClick={editCard}
      onClick={toggleSelectCard}
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
          'WebkitLineClamp': '3',
          lineHeight: 1,
          height: 'auto'
        }} ref={cardCommentRef}>{cardComment}</Typography>
      </div >
      {
        displayShowButton && !isShownAllText && (
          <Button
            data-testid='showMoreButton'
            variant='plain'
            className={classes.showButton}
            onClick={(event: MouseEvent<HTMLButtonElement>) => onShowMoreText(event, true)}
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
            onClick={(event: MouseEvent<HTMLButtonElement>) => onShowMoreText(event, false)}
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
                <CardChip datda-testid='tag' key={tag} tag={tag} />
              ))}
            </div>
          }
          {!isShownAllTags && cardTags &&
            <div className={classes.tags}>
              {
                <>
                  <CardChip key={cardTags[0]} tag={cardTags[0]} />
                  <CardChip key={cardTags[1]} tag={cardTags[1]} />
                  <Dropdown>
                    <MenuButton
                      variant='plain'
                      size='sm'
                      onClick={event => onShowMoreTags(event)}
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
                      <b>{`+${cardTags?.length - 2}`}</b>
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
