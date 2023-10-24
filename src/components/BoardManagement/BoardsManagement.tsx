import { useContext, useEffect, useState } from 'react';

import { Box, CircularProgress } from '@mui/joy';
import { BoardContext } from '../../context/board/boardContext';
import { boardAPI } from '../../api/BoardAPI';

import { IBoardSettings } from '../../interfaces/boardSettings';
import { INITIAL_BOARD } from '../../mocks/board';
import { possibleBoardStatuses } from '../../constants';

import BoardStepper from '../BoardStepper/BoardStepper';
import classes from './BoardsManagement.module.scss';

const BoardsManagement = () => {
  const { boardId } = useContext(BoardContext);
  const [boards, setBoards] = useState<IBoardSettings[] | undefined>([INITIAL_BOARD]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalizeButton, setIsFinalizeButton] = useState(false);
  const { getAllBoards, finalizeBoard } = boardAPI();

  const onFinalizeBoard = async () => {
    if (boardId) {
      const board = await finalizeBoard(boardId);

      setIsFinalizeButton(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);

    if (boardId) {
      try {
        const boards: IBoardSettings[] | undefined = await getAllBoards();

        boards ? setBoards(boards) : setBoards([INITIAL_BOARD]);

        boards?.forEach(board => {
          if (board?.status === possibleBoardStatuses.active) {
            setIsFinalizeButton(true);
          }
        });

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [boardId]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 0,
        bgcolor: 'background.default',
        p: 3,
        marginLeft: 0,
        width: '100%'
      }}
    >
      <h2 className={classes.title} data-testid='board-management-title'>
        BOARDS MANAGEMENT
      </h2>
      <div className={classes.boardsManagementContainer}>
        {isLoading &&
          <div className={classes.boardsManagementLoader}>
            <CircularProgress
              color="primary"
              size="md"
              variant="soft"
            />
          </div>
        }
        {!isLoading &&
          <div className={classes.boardList}>
            {boards?.map(board =>
              <BoardStepper key={board._id} board={board} />
            )}
          </div>
        }
      </div>
      {/* <Button
        variant='solid'
        type='submit'
        aria-label='solid button for submitting the form'
        onClick={onFinalizeBoard}
        role='button'
        data-testid='finalize-button'
        disabled={!isFinalizeButton}
      >
        Finalize Board
      </Button> */}
    </Box>
  );
};

export default BoardsManagement;
