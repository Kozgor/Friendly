/* eslint-disable complexity */
import { Button, CircularProgress, Modal, ModalDialog, Typography } from '@mui/joy';
import {
  useContext,
  useEffect,
  useState
} from 'react';
import { CloseRounded } from '@mui/icons-material';
import { isNull } from 'lodash';
import { useNavigate } from 'react-router';

import { ICurrentBoardDetails, IUserProfile } from '../../interfaces/user';
import { NO_BOARDS_MESSAGE, panelTitles, possibleBoardStatuses } from '../../constants';
import { BoardContext } from '../../context/board/boardContext';
import Column from '../Column/Column';
import { IBoardSettings } from '../../interfaces/boardSettings';
import { IColumn } from '../../interfaces/column';
import { IColumnCard } from '../../interfaces/columnCard';
import { INITIAL_BOARD } from '../../mocks/board';
import InteractivePanel from '../InteractivePanel/InteractivePanel';
import NoContent from '../NoContent/NoContent';
import { PropsChildren } from '../../interfaces/interactivePanelChildren';
import Timer from '../Timer/Timer';
import { boardAPI } from '../../api/BoardAPI';
import { cardAPI } from '../../api/CardAPI';
import { columnAPI } from '../../api/ColumnAPI';
import { icons } from '../../theme/icons/icons';
import { localStorageManager } from '../../utils/localStorageManager';
import { pathConstants } from '../../router/pathConstants';
import useBoardIdLocation from '../../utils/useBoardIdLocation';
import { userAPI } from '../../api/UserAPI';

import classes from './Board.module.scss';

const Board = () => {
  const [boardSettings, setBoardSettings] = useState<IBoardSettings>(INITIAL_BOARD);
  const [isLoading, setIsLoading] = useState(false);
  const [isBoardVisible, setIsBoardVisible] = useState(true);
  const {
    isTimerVisible,
    isTimerStarted,
    isAddingDisabled,
    disableCommentCreation,
    setFormSubmit,
    boardStatus,
    isFormSubmit,
    setBoardStatus,
    setBoardId,
    setBoardTime,
    setTimerVisibility,
    selectedCards,
    resetSelectedCards
  } = useContext(BoardContext);
  const navigate = useNavigate();
  const { getLocalUserData, saveLocalBoardDetails } = localStorageManager();
  const { getFinalColumnCards, getUserColumnCards } = columnAPI();
  const { getBoardById } = boardAPI();
  const { getUserById, submitComments } = userAPI();
  const { removeCards } = cardAPI();
  const localUser = getLocalUserData();
  const isAdmin = localUser.role === 'admin';
  const isBoard = (isBoardVisible && !isFormSubmit && !isLoading);
  const isNoBoard = (!isLoading && !isBoardVisible || isFormSubmit);
  const URLBoardId= useBoardIdLocation();
  const layoutHeight = isAdmin ? '84vh' : '92vh';
  const [isBoardSubmitButton, setIsBoardSubmitButton] = useState(true);
  const isPageWithBoard = location.pathname.startsWith('/board/');
  const isShowTimer = isTimerVisible && isBoardSubmitButton && isPageWithBoard;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const completeBoard = () => {
    submitComments(localUser._id);
    disableCommentCreation();
    setFormSubmit();
    setIsBoardSubmitButton(false);
    setTimerVisibility(false);
    setIsModalOpen(false);
  };

  const deleteCards = () => {
    if (!isAddingDisabled) {
      removeCards(selectedCards).then(() => {
        const newBoardSettings = { ...boardSettings };

        newBoardSettings.columns.forEach(column => {
          selectedCards.forEach(selectedCard => {
            column.columnCards = column.columnCards.filter(card => card._id !== selectedCard._id);
          });
        });

        setBoardSettings(newBoardSettings);
        resetSelectedCards();
      });
    }
  };

  const completeBoardModal = (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} >
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{
          width: '415px',
          textAlign: 'center',
          padding: '28px 19px',

          position: 'relative'
        }}
      >
        <CloseRounded sx={{
          position: 'absolute',
          top: '16px',
          right: '19px',
          cursor: 'pointer'
        }} onClick={() => setIsModalOpen(false)} />
        <Typography id="basic-modal-dialog-title" level="h3">
          Ready to complete?
        </Typography>
        <Typography id="basic-modal-dialog-description" component='p' sx={{
          color: 'var(--friendly-palette-neutral-400)',
          fontSize: 14,
          lineHeight: '19.07px',
          marginBottom: '10px'
        }}>
          {`There is some time left to play with your ideas and thoughts.
          After the board is completed you will not be able to add new or edit appended comments.`}
        </Typography>
        <div className={classes.modalButtons}>
          <Button color='secondary' variant='solid' role='button' aria-label='Complete My Board button' onClick={completeBoard} sx={{
            width: '175px',
            backgroundColor: 'var(--friendly-palette-secondary-900)',
            color: 'var(--friendly-palette-shades-50)'
          }}>Complete My Board</Button>
        </div>
      </ModalDialog>
    </Modal>
  );

  const fetchUserColumnCards = async (boardId: string, userId: string) => {
    try {
      const columnsData = await getUserColumnCards(boardId, userId);

      return columnsData;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFinalColumnCards = async (boardId: string) => {
    try {
      const columnsData = await getFinalColumnCards(boardId);

      return columnsData;
    } catch (error) {
      console.log(error);
    }
  };

  const setupBoard = async (id: string, status?: string) => {
    try {
      const board: IBoardSettings | undefined = await getBoardById(URLBoardId);

      if ((board && board?.status === status) || (board && localUser.role === 'admin')) {
        let columnsCards: IColumnCard[] | undefined;
        const currentBoard: ICurrentBoardDetails = {
          currentBoardId: board._id,
          currentBoardName: board.name
        };

        saveLocalBoardDetails(currentBoard);

        if (board.status === possibleBoardStatuses.active) {
          if (status === possibleBoardStatuses.finalized && localUser.role === 'admin' && URLBoardId === board._id) {
            setIsBoardVisible(false);
            setTimerVisibility(false);

            return;
          }
          columnsCards = await fetchUserColumnCards(URLBoardId, localUser._id);
          setTimerVisibility(true);
        } else {
          columnsCards = await fetchFinalColumnCards(URLBoardId);
          setTimerVisibility(false);
        }

        board.columns.forEach((column: IColumn) => {
          const { columnId } = column;

          if (columnsCards && columnsCards[columnId]) {
            column.columnCards = columnsCards[columnId];
          }
        });

        setBoardId(URLBoardId);
        setBoardSettings(board);
        setBoardStatus(board.status);
        setBoardTime(board.timer);
        setIsBoardVisible(true);
      } else {
        setIsBoardVisible(false);
        setTimerVisibility(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);

    try {
      const userProfile: IUserProfile | undefined = await getUserById(localUser._id);

      if (!URLBoardId && userProfile && userProfile.boards) {
        navigate(`/board/${userProfile.boards.finalized || userProfile.boards.active}`);

        return;
      }

      if (userProfile && userProfile.boards) {
        if (!isNull(userProfile.boards.active)) {
          setupBoard(userProfile.boards.active, possibleBoardStatuses.active);

          return;
        }

        if (!isNull(userProfile.boards.finalized)) {
          setupBoard(userProfile.boards.finalized, possibleBoardStatuses.finalized);

          return;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const actionButtons =
    <>
      {selectedCards.length > 0 &&
        <Button
          color="accent"
          variant='solid'
          role='button'
          onClick={deleteCards}
          sx={{
            backgroundColor: 'var(--friendly-palette-accent-900)',
            color: 'var(--friendly-palette-accent-100)',
            width: '36px',
            marginRight: '14px'
          }}
        >
          {icons.delete()}
        </Button>}
      <Button
        data-testid="completeButton"
        color='secondary'
        variant='solid'
        role='button'
        onClick={() => setIsModalOpen(true)}
        sx={{
          backgroundColor: 'var(--friendly-palette-secondary-900)',
          color: 'var(--friendly-palette-shades-50)',
          padding: '8.5px 18.5px',
          border: '1px solid var(--friendly-palette-secondary-900)',
          fontWeight: 600,
          fontSize: 14
        }}
      >
        Complete
      </Button>
    </>;

  const childrenConfig: PropsChildren[] = [
    {
      path: pathConstants.ADMIN,
      label: boardSettings.name,
      position: 'left'
    },
    {
      element: isShowTimer && <Timer />,
      position: 'center'
    },
    {
      path: `${pathConstants.BOARD_SUMMARY}/${URLBoardId}`,
      label: panelTitles.boardSummary,
      position: 'right',
      mode: 'finalizedBoard'
    },
    {
      element: isTimerStarted && actionButtons,
      position: 'right',
      mode: 'soloBoard'
    }
  ];

  useEffect(() => {
    fetchUserData();
  }, [boardStatus, URLBoardId]);

  return (
    <>
      {completeBoardModal}
      <div className={classes['board-container']}>
        {isAdmin && <InteractivePanel childrenConfig={childrenConfig} />}
        <div className={classes.board} style={{ height: layoutHeight }} data-testid='board'>
          {isBoard &&
            boardSettings?.columns.map((column) => (
              <Column
                key={column.columnId}
                columnId={column.columnId}
                columnTitle={column.columnTitle}
                columnSubtitle={column.columnSubtitle}
                columnStyle={column.columnStyle}
                columnAvatar={column.columnAvatar}
                columnCards={column.columnCards}
              />
            ))
          }
          {isNoBoard &&
            <NoContent message={NO_BOARDS_MESSAGE} />
          }
          {isLoading &&
            <div>
              <CircularProgress
                color="primary"
                size="md"
                variant="soft"
              />
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Board;
