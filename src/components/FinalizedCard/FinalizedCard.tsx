import {
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem
} from '@mui/joy';
import MoreVert from '@mui/icons-material/MoreVert';
import { useState } from 'react';

import { IColumnCard } from '../../interfaces/columnCard';

import classes from './FinalizedCard.module.scss';

const FinalizedCard = (props: IColumnCard) => {
  const [isShownAllText, setIsShownAllText] = useState(false);
  const [displayShowButton] = useState(props.cardComment.length > 110);

  const showMoreText = () => {
    setIsShownAllText(true);
  };

  const showLessText = () => {
    setIsShownAllText(false);
  };

  const deleteCard = () => {
    props.onAction?.('remove', {
      _id: props._id,
      cardAuthor: props.cardAuthor,
      cardComment: props.cardComment
    });
  };

  const editCard = () => {
    props.onAction?.('edit', {
      _id: props._id,
      cardAuthor: props.cardAuthor,
      cardComment: props.cardComment,
      cardTags: props.cardTags
    });
  };

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
      className={classes.card}
      sx={{
        '--Card-padding': '10px',
        gap: 'unset',
        marginBottom: 2,
        minHeight: 210
      }}
    >
      <div className={classes.header}>
        <div className={classes.tags}>
          {props.cardTags?.map((tag) => (
            <Chip key={tag} sx={{ marginRight: 1, marginBottom: 1 }}>
              {tag}
            </Chip>
          ))}
        </div>
        <Dropdown>
          <MenuButton
            className={classes.actionsButton}
            title="actions"
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
            sx={{
              border: 'unset'
            }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={editCard}>Edit</MenuItem>
            <MenuItem onClick={deleteCard}>Delete</MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <div id="message" className={classes.message}>
        <Avatar className={classes.author} alt="user">
          {props.cardAuthor === 'Incognito' ? (
            <i className="bi bi-incognito"></i>
          ) : (
            props.cardAuthor
          )}
        </Avatar>
        <p
          style={{
            display: isShownAllText ? 'block' : '-webkit-box'
          }}
        >
          {displayMessage(props.cardComment)}
        </p>
      </div>
      {displayShowButton && !isShownAllText && (
        <Button
          className={classes.showButton}
          variant="plain"
          onClick={showMoreText}
          sx={{
            width: 110,
            paddingTop: 0,
            paddingBottom: 0,
            height: 30,
            minHeight: 'unset',
            top: -27,
            left: 10,
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 'auto'
          }}
        >
          Show more
        </Button>
      )}
      {displayShowButton && isShownAllText && (
        <Button
          className={classes.showButton}
          variant="plain"
          onClick={showLessText}
          sx={{
            width: 110,
            paddingTop: 0,
            paddingBottom: 0,
            height: 30,
            minHeight: 'unset',
            top: -27,
            left: 10,
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 'auto'
          }}
        >
          Show less
        </Button>
      )}
      {/* <div className={classes.footer}>
        <Avatar
          className={classes.author}
          alt="reactions"
          src="https://th.bing.com/th/id/OIP.z-H7lc_aTOJfM5cxxQpynwHaHa?w=212&h=213&c=7&r=0&o=5&dpr=1.3&pid=1.7"
        >
          YB
        </Avatar>
        <Badge
          badgeContent={props.cardReactions ? props.cardReactions.length : 0}
        >
          <Button>Reply</Button>
        </Badge>
      </div> */}
    </Card>
  );
};

export default FinalizedCard;
