/* eslint-disable complexity */
import { useState } from 'react';

import {
  Button,
  Card,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem
} from '@mui/joy';

import CardAvatar from '../CardAvatar/CardAvatar';
import CardTagChip from '../CardChip/CardChip';
import { IColumnCard } from '../../interfaces/columnCard';

import classes from './FinalizedCard.module.scss';

const FinalizedCard = (props: IColumnCard) => {
  const {
    cardAuthor,
    cardAuthorAvatar,
    cardComment,
    cardTags
  } = props;
  const [isShownAllText, setIsShownAllText] = useState(false);
  const [displayShowButton] = useState(cardComment.length > 110);
  const isShownAllTags = cardTags && cardTags?.length < 3;

  const showMoreText = () => {
    setIsShownAllText(true);
  };

  const showLessText = () => {
    setIsShownAllText(false);
  };

  // const deleteCard = () => {
  //   props.onAction?.('remove', {
  //     _id: _id,
  //     createdAt: createdAt,
  //     cardAuthor: cardAuthor,
  //     cardAuthorId: cardAuthorId,
  //     cardAuthorAvatar: cardAuthorAvatar,
  //     cardComment: cardComment
  //   });
  // };

  // const editCard = () => {
  //   props.onAction?.('edit', {
  //     _id: _id,
  //     createdAt: createdAt,
  //     cardAuthor: cardAuthor,
  //     cardAuthorId: cardAuthorId,
  //     cardAuthorAvatar: cardAuthorAvatar,
  //     cardComment: cardComment,
  //     cardTags: cardTags
  //   });
  // };

  const displayMessage = (message: string) => {
    let row = '';
    const words = message.split(' ');
    const rows: string[] = [];

    words.forEach((word, index) => {
      row += `${word} `;

      if (
        (rows.length === 2 && row.length > 25) ||
        (rows.length !== 2 && row.length > 36) ||
        index === words.length - 1
      ) {
        rows.push(row);
        row = '';
      }
    });

    return (
      <>
        {rows.map((row, index) => (
          <span key={index}>{row}</span>
        ))}
      </>
    );
  };

  return (
    <Card
      variant='outlined'
      className={classes.card}
      sx={{
        '--Card-padding': '10px',
        gap: 'unset',
        marginBottom: 2,
        minHeight: 210,
        backgroundColor: 'white',
        border: 'none',
        padding: '10px 24px 16px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className={classes.header}>
        {/* <Dropdown>
          <MenuButton
            data-testid='cardMenuButton'
            className={classes.actionsButton}
            title='actions'
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
            sx={{
              border: 'unset'
            }}
          >
            <MoreVert />
          </MenuButton>
        <Menu>
          <MenuItem
            data-testid='editCardButton'
            disabled={isDisabled}
            onClick={editCard}
          >Edit</MenuItem>
          <MenuItem
            data-testid='deleteCardButton'
            disabled={isDisabled}
            onClick={deleteCard}
          >Delete</MenuItem>
        </Menu>
        </Dropdown> */}
        <div className={classes.author}>
          <CardAvatar
            cardAuthor={cardAuthor}
            cardAuthorAvatar={cardAuthorAvatar || ''}
          ></CardAvatar>
        </div>
      </div>
      <div id='message' className={classes.message}>
        <p
          style={{
            display: isShownAllText ? 'block' : '-webkit-box'
          }}
        >
          {displayMessage(cardComment)}
        </p>
      </div>
      {displayShowButton && !isShownAllText && (
        <Button
          data-testid='showMoreButton'
          variant='plain'
          onClick={showMoreText}
          sx={{
            width: 110,
            paddingTop: 0,
            paddingBottom: 0,
            height: 30,
            minHeight: 'unset'
          }}
          className={classes.showButton}
        >
          Show more
        </Button>
      )}
      {displayShowButton && isShownAllText && (
        <Button
          data-testid='showLessButton'
          variant='plain'
          onClick={showLessText}
          sx={{
            width: 110,
            paddingTop: 0,
            paddingBottom: 0,
            height: 30,
            minHeight: 'unset'
          }}
          className={classes.showButton}
        >
          Show less
        </Button>
      )}
      {isShownAllTags && cardTags &&
        <div className={classes.tags}>
          {cardTags?.map((tag) => (
            <CardTagChip datda-testid='tag' key={tag} tag={tag}/>
          ))}
        </div>
      }
      {!isShownAllTags && cardTags &&
        <div className={classes.tags}>
          {
            <>
              <CardTagChip key={cardTags[0]} tag={cardTags[0]}/>
              <CardTagChip key={cardTags[1]} tag={cardTags[1]}/>
              <Dropdown>
                <MenuButton
                  variant='plain'
                  size='sm'
                  sx={{
                    padding: '6px 8px',
                    backgroundColor: 'rgba(247, 248, 249, 1)',
                    borderRadius: '20px',
                    border: 'solid 1px rgba(247, 248, 249, 1)',
                    fontSize: '10px',
                    fontWeight: '400',
                    '&:hover': {
                      backgroundColor: 'rgba(247, 248, 249, 1)'
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
    </Card>
  );
};

export default FinalizedCard;
