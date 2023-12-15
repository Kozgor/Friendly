import { find, isEmpty } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import Button from '@mui/joy/Button';

import { BoardContext } from '../../context/board/boardContext';
import FinalizedCard from '../FinalizedCard/FinalizedCard';
import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';
import NewCard from '../NewCard/NewCard';
import { cardAPI } from '../../api/CardAPI';
import { localStorageManager } from '../../utils/localStorageManager';
import { possibleBoardStatuses } from '../../constants';
import { sortByDateStartOld } from '../../utils/sortByDate';

import classes from './Column.module.scss';

const Column = (props: IColumn) => {
  const { columnCards, columnId, columnTitle, columnSubtitle } = props;
  const { getLocalUserData } = localStorageManager();
  const localUser = getLocalUserData();
  const initialCard = {
    _id: '',
    columnId: columnId,
    createdAt: '',
    cardComment: '',
    cardAuthorId: localUser._id,
    cardAuthor: localUser.fullName || 'Incognito',
    cardAuthorAvatar: localUser.avatar || 'Incognito',
    cardTags: [],
    isEditable: true
  };
  const { createCard, updateCard } = cardAPI();

  const { boardId, boardStatus, isAddingDisabled, isTimerFinalized } = useContext(BoardContext);
  const [isNewCard, setIsNewCard] = useState(false);
  const [finalizedCards, setFinalizedCards] = useState(() => sortByDateStartOld(columnCards));
  const [editableCard, setEditableCard] = useState<IColumnCard>(initialCard);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isAddButtonDisabled = isButtonDisabled || isAddingDisabled;

  useEffect(() => {
    if (columnCards) {
      setFinalizedCards(sortByDateStartOld(columnCards));
    }
  }, [columnCards]);

  const onCreateCard = () => {
    setIsNewCard(true);
    setFinalizedCards((prevCards) => [editableCard, ...prevCards]);
    setIsButtonDisabled(true);
  };

  const onSaveHandler = (
    cards: IColumnCard[],
    handledCard: IColumnCard,
    cardIndex: number
  ) => {
    if (handledCard._id) {
      updateCard(boardId, columnId, handledCard)
        .then(() => {
          setFinalizedCards(() => {
            cards.splice(cardIndex, 1, {
              ...handledCard,
              isEditable: false
            });
            return cards;
          });
        });
    } else {
      createCard(boardId, columnId, handledCard)
        .then((res) => {
          setFinalizedCards((prevCards) => {
            const filteredCards = prevCards.filter((card) => !card.isEditable);
            return [...filteredCards, { ...handledCard, _id: res.data._id }];
          });
        });
    }
  };

  const onEditHandler = (
    cards: IColumnCard[],
    handledCard: IColumnCard,
    cardIndex: number
  ) => {
    setFinalizedCards(() => {
      cards.splice(cardIndex, 1, { ...handledCard, isEditable: true });
      return cards;
    });
  };

  const onCancelHandler = (cards: IColumnCard[]) => {
    setFinalizedCards((prevCards) =>
      editableCard._id
        ? cards.map((card) => ({ ...card, isEditable: false }))
        : prevCards.filter((card) => !card.isEditable)
    );
    setIsButtonDisabled(isAddingDisabled);
  };

  const handleAction = (actionType: string, handledCard: IColumnCard) => {
    const actionsMap: Record<
      string,
      (
        cards: IColumnCard[],
        handledCard: IColumnCard,
        cardIndex: number
      ) => void
    > = {
      save: onSaveHandler,
      edit: onEditHandler,
      cancel: onCancelHandler
    };

    const finCards = [...finalizedCards];

    setIsNewCard(actionType === 'edit');

    const editableIndex = finCards.findIndex(
      (card) => card._id === handledCard._id
    );

    Reflect.apply(actionsMap[actionType], this, [
      finCards,
      handledCard,
      editableIndex
    ]);

    setEditableCard(
      actionType === 'edit' ? { ...handledCard, isEditable: true } : initialCard
    );
    setIsButtonDisabled(actionType === 'edit');
  };

  const filterReactionsByUserId = (cardReactions: any): boolean | null => {
    let isHappyUser = null;

    if (isEmpty(cardReactions?.length)) {
      find(cardReactions, (reaction => {
        if (reaction.userId === localUser._id) {
          isHappyUser = reaction.isHappyReaction;
        }
      }));
    }

    return isHappyUser;
  };

  return (
    <section className={classes.column}>
      <div className={classes['column__header']}>
        <h2>{columnTitle} {boardStatus === possibleBoardStatuses.finalized &&
          <span className={classes['column__header__couner']}>({columnCards.length})</span>}
        </h2>
        <p className={classes['column__header__subtitle']}>{columnSubtitle}</p>
      </div>
      {(boardStatus === 'active' && !isTimerFinalized) &&
        <div className={classes['column__adding']}>
          <Button
            data-testid='addNewCommentButton'
            disabled={isAddButtonDisabled}
            role='button'
            aria-label='Add new comment'
            onClick={onCreateCard}
          >
            <i className='bi bi-plus'></i>
            <h5>Add comment</h5>
          </Button>
        </div>
      }
      <div id='comments' className={classes['column__comments']}>
        {finalizedCards?.map(
          (card) =>
            (isNewCard && card.isEditable && (
              <NewCard
                key={editableCard._id}
                _id={editableCard._id}
                columnId={editableCard.columnId}
                createdAt={editableCard.createdAt}
                cardComment={editableCard.cardComment}
                cardAuthor={editableCard.cardAuthor}
                cardAuthorAvatar={editableCard.cardAuthorAvatar}
                cardAuthorId={editableCard.cardAuthorId}
                cardTags={editableCard.cardTags}
                isDisabled={isAddingDisabled}
                isEditable={boardStatus !== possibleBoardStatuses.finalized && !isAddingDisabled}
                onAction={handleAction}
              />
            )) || (
              <FinalizedCard
                key={card._id}
                _id={card._id}
                columnId={card.columnId}
                createdAt={card.createdAt}
                cardComment={card.cardComment}
                cardAuthor={card.cardAuthor}
                cardAuthorId={card.cardAuthorId}
                cardActionAuthorId={localUser._id}
                cardAuthorAvatar={card.cardAuthorAvatar}
                cardTags={card.cardTags}
                cardReactions={filterReactionsByUserId(card.cardReactions)}
                isDisabled={boardStatus === possibleBoardStatuses.finalized}
                isEditable={boardStatus !== possibleBoardStatuses.finalized && !isAddingDisabled}
                onAction={handleAction}
              />
            )
        )}
      </div>
    </section>
  );
};

export default Column;
