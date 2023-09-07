import { Avatar, Badge, Button, Card, Chip } from '@mui/joy';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { IColumnCard } from '../../interfaces/columnCard';

import classes from './FinalizedComment.module.scss';

const FinalizedComment = (props: IColumnCard) => {
  const [isShownAllText, setIsShownAllText] = useState(false);
  const [isShowActions, setIsShowActions] = useState(false);
  const [displayShowButton, setDisplayShowButton] = useState(
    props.cardMessage.length > 110
  );
  const actionsRef = useRef<HTMLDivElement>(null);

  const showMoreText = () => {
    setIsShownAllText(true);
  };

  const showLessText = () => {
    setIsShownAllText(false);
  };

  const toggleActions = () => {
    setIsShowActions(!isShowActions);
  };

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      const handleClickOutside = (event: Event) => {
        const target = event.target as
          | HTMLDivElement
          | HTMLInputElement
          | HTMLParagraphElement
          | HTMLButtonElement
          | HTMLHeadingElement;
        console.log(target);
        if (
          (ref.current &&
            target.contains(ref.current) &&
            target !== actionsRef.current) ||
          (ref.current && !ref.current.contains(target))
        ) {
          setIsShowActions(false);
          console.log('You clicked outside of me!');
        }
      };
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(actionsRef);

  const actions = (
    <div className={classes.actionsBox}>
      <ul>
        <li>Edit Text</li>
        <li>Add Tag</li>
        <li>Delete</li>
      </ul>
    </div>
  );

  // eslint-disable-next-line max-len
  // const messageMock = 'We would benefit from analyzing our key metrics as a team, every weak. We would benefit from analyzing our key metrics as a team, every weak. We would benefit from analyzing our key metrics as a team, every weak. We would benefit from analyzing our key metrics as a team, every weak.';
  // eslint-disable-next-line max-len
  // const messageMock = 'We would benefit from analyzing our key metrics as a team, every weak. We would benefit from analyzing our key metrics as a team, every weak. We would benefit from analyzing our key metrics as a team, every weak. We would benefit from analyzing our key metrics as a team, every weak. We';

  const displayMessage = (message: string) => {
    console.log(props.cardTags);
    let row = '';
    const words = message.split(' ');
    const rows: string[] = [];
    words.forEach((word, index) => {
      row += `${word} `;
      // console.log(row, index);
      if (
        (rows.length < 2 && row.length > 35) ||
        (rows.length === 2 && row.length > 30) ||
        (rows.length > 2 && row.length > 40) ||
        (index === words.length - 2 && row.length > 30) ||
        index === words.length - 1
      ) {
        rows.push(row);
        row = '';
      }
    });
    // console.log(rows);

    return (
      <>
        {rows.map((row, index) => (
          <p key={index}>{row}</p>
        ))}
      </>
    );
  };

  return (
    <Card
      sx={{
        '--Card-padding': '10px',
        gap: 'unset',
        marginBottom: 2
      }}
    >
      <div className={classes.header}>
        <div className={classes.tags}>
          {props.cardTags?.map((tag) => (
            <Chip key={tag} sx={{ marginRight: 1 }}>
              {tag}
            </Chip>
          ))}
        </div>
        <div
          className={classes.actions}
          onClick={toggleActions}
          ref={actionsRef}
        >
          <i className="bi bi-three-dots-vertical"></i>
        </div>
        {isShowActions && actions}
      </div>
      <div
        id="message"
        className={classes.message}
        style={{
          display: isShownAllText ? 'block' : '-webkit-box'
        }}
      >
        <Avatar className={classes.author} alt="user">
          {props.cardAuthor.slice(0, 2)}
        </Avatar>
        {displayMessage(props.cardMessage)}
        {/* {displayMessage(messageMock)} */}
      </div>
      {displayShowButton && !isShownAllText && (
        <Button
          className={classes.showButton}
          variant="plain"
          onClick={showMoreText}
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            height: 30,
            minHeight: 'unset',
            top: -28,
            left: 10
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
            paddingTop: 0,
            paddingBottom: 0,
            height: 30,
            minHeight: 'unset',
            top: -28,
            left: 10
          }}
        >
          Show less
        </Button>
      )}
      <div className={classes.footer}>
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
      </div>
    </Card>
  );
};

export default FinalizedComment;
