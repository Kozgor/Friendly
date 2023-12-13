import {
  Box,
  Card,
  Chip,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Option,
  Select,
  Textarea
} from '@mui/joy';
import { ChangeEvent, useState } from 'react';
import { CardTag } from '../../types/cardTags';
import { icons } from '../../theme/icons/icons';

import CardAvatar from '../CardAvatar/CardAvatar';
import CardTagChip from '../CardChip/CardChip';
import classes from './NewCommentInput.module.scss';

const NewCommentInput = (props: { userName: string, userAvatar: string, cardTags: CardTag[], isDisabled: boolean, sendNewComment: (
  cardAuthor: string,
  cardCommentState: string,
  cardTagsState: CardTag[]
) => void }) => {
  const { userName, userAvatar, cardTags, isDisabled, sendNewComment } = props;
  const [cardAuthorState, setCardAutorState] = useState<string>(userName);
  const [cardAuthorAvatarState, setCardAuthorAvatarState] = useState<string>(userAvatar);
  const [cardCommentState, setCardCommentState] = useState<string>('');
  const [cardTagsState, setCardTagsState] = useState<CardTag[]>([]);
  const [isAutocomplete, setIsAutocomplete] = useState<boolean>(true);
  const [isShownAllTags, setIsShownAllTags] = useState<boolean>(true);
  const [isAutofocus, setIsAutofocus] = useState<boolean>(false);
  const textPlaceholder = 'Start typing here...';
  const tagsPlaceholder = 'Tags...';

  const onHandleSwitchToggle = () => {
    if (cardAuthorState === 'Incognito') {
      setCardAutorState(userName);
      setCardAuthorAvatarState(userAvatar || '');

      return;
    }

    setCardAutorState('Incognito');
    setCardAuthorAvatarState('Incognito');
  };

  const onSwitchToAutocomplete = () => {
    setIsAutocomplete(!isAutocomplete);

    isAutocomplete ? setIsAutofocus(true) : setIsAutofocus(false);
  };

  const handleChange = (event: React.SyntheticEvent | null, newValue: CardTag[] | null) => {
    setCardTagsState(newValue || []);
  };

  const onHandleAutocomlete = (newValue: CardTag[]) => {
    setCardTagsState([...newValue]);

    const isShowAllTags = cardTagsState.length < 2;

    setIsShownAllTags(isShowAllTags);
  };

  const onSendNewComment = () => {
    sendNewComment(
      cardAuthorState,
      cardCommentState,
      cardTagsState
    );

    setCardCommentState('');
    handleChange(null, []);
    setIsShownAllTags(true);
  };

  return (
    <div className={classes.commentInput}>
      <Card
        variant='plain'
        className={classes.card}
        sx={{
          width: '100%',
          height: '107px',
          gap: 'unset',
          backgroundColor: 'var(--friendly-palette-shades-50)',
          padding: '11px 7px 13px 14px',
          boxShadow: '0px 8px 16px #0000001a'
        }}
       >
        <div className={classes.commentInputTop}>
          <div className={classes.commentInputAvatarContainer}>
            <div className={classes.commentInputAvatar}>
              <CardAvatar
                cardAuthor={cardAuthorState}
                cardAuthorAvatar={cardAuthorAvatarState}
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
                placeholder={textPlaceholder}
                value={cardCommentState}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setCardCommentState(event.target.value)
                }
                sx={{
                  '&.MuiTextarea-root': {
                    backgroundColor: 'var(--friendly-palette-shades-50)'
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
              {isAutocomplete ? (
              <Select
                value={cardTagsState}
                multiple
                onChange={handleChange}
                placeholder={tagsPlaceholder}
                size='sm'
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                    {selected.map((selectedOption, index) => (
                      <span key={index}>
                        {selectedOption.label}
                      </span>
                    ))}
                  </Box>
                )}
                sx={{
                  width: '100%',
                  fontSize: '12px',
                  lineHeight: '16px',
                  fontWeigth: '400',
                  backgroundColor: 'var(--friendly-palette-shades-50)',
                  boxShadow: 'none',
                  border: 'none',
                  padding: 0,
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
                (<Option key={tag} value={tag}>{tag}</Option>)
              )}
              </Select>
              ) :
              <div className={classes.tagsOutput}>
                {isShownAllTags && cardTagsState &&
                  <div className={classes.tags} onClick={onSwitchToAutocomplete}>
                    {cardTagsState?.map((tag) => (
                      <CardTagChip datda-testid='tag' key={tag} tag={tag}/>
                    ))}
                  </div>
                }
                {!isShownAllTags && cardTagsState &&
                  <div className={classes.tagsOutput}>
                    {<>
                      <span onClick={onSwitchToAutocomplete}>
                        <CardTagChip key={cardTagsState[0]} tag={cardTagsState[0]}/>
                      </span>
                      <span onClick={onSwitchToAutocomplete}>
                        <CardTagChip key={cardTagsState[1]} tag={cardTagsState[1]}/>
                      </span>
                      <Dropdown>
                        <MenuButton
                          variant='plain'
                          size='sm'
                          sx={{
                            padding: '6px 8px',
                            backgroundColor: '#f7f8f9',
                            borderRadius: '20px',
                            border: 'solid 1px #f7f8f9',
                            fontSize: '10px',
                            fontWeight: '400',
                            '&:hover': {
                              backgroundColor: '#f7f8f9'
                            },
                            '&.MuiMenuButton-root': {
                              width: '28px',
                              height: '26px',
                              fontSize: '10px',
                              minHeight: '0px'
                            }
                          }}
                        >
                          {`+${cardTagsState?.length - 2}`}
                        </MenuButton>
                        <Menu>
                          {cardTagsState.slice(2).map((tag) => (
                        <MenuItem key={tag}>
                          {tag}
                        </MenuItem>
                        ))}
                      </Menu>
                      </Dropdown>
                    </>}
                  </div>
                }
              </div>
              }
            </div>
          </div>
          <div className={classes.commentInputSendContainer}>
            <div className={classes.commentInputSendButton}>
              <IconButton
                variant='solid'
                color='success'
                disabled={isDisabled}
                onClick={onSendNewComment}
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
    </div>
  );
};

export default NewCommentInput;
