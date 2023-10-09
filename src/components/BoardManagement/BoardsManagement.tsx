import { useContext, useEffect, useState } from 'react';

import { Box, Button } from '@mui/joy';

import { BoardContext } from '../../context/board/board-context';
import { boardAPI } from '../../api/BoardAPI';

import { IBoardSettings } from '../../interfaces/boardSettings';
import { possibleBoardStatuses } from '../../constants';

import classes from './BoardsManagement.module.scss';


const BoardsManagement = () => {
  const { boardId } = useContext(BoardContext);

  const initSettings = {
    _id: '',
    name: '',
    theme: '',
    timer: 0,
    columns: [],
    status: ''
  };

  const [board, setBoard] = useState<IBoardSettings | undefined>(initSettings);
  const [isFinalizeButton, setIsFinalizeButton] = useState(false);
  const { getBoardById, finalizeBoard } = boardAPI();

  const onFinalizeBoard = async () => {
    if (boardId) {
      const board = await finalizeBoard(boardId);

      if (board) {
        setBoard(board);
      }

      setIsFinalizeButton(false);
    }
  };

  const fetchData = async () => {
    if (boardId) {
      try {
        const availableBoard: IBoardSettings | undefined = await getBoardById(boardId);

        availableBoard ? setBoard(availableBoard) : setBoard(initSettings);

        if (availableBoard?.status === possibleBoardStatuses.active) {
          setIsFinalizeButton(true);
        }

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
        flexGrow: 1,
        bgcolor: 'background.default',
        p: 3,
        marginLeft: 0
      }}
    >
      <h2 className={classes.title} data-testid='board-management-title'>
        BOARDS MANAGEMENT
      </h2>
      {board && (
        <ul>
          <li data-testid='board-name'>Board name: {isFinalizeButton ? board.name : 'No active board'}</li>
          <li data-testid='board-status'>Board status: {isFinalizeButton ? board.status : 'Finalized'}</li>
        </ul>
      )}
      <Button
        variant='solid'
        type='submit'
        aria-label='solid button for submitting the form'
        onClick={onFinalizeBoard}
        role='button'
        data-testid='finalize-button'
        disabled={!isFinalizeButton}
      >
        Finalize Board
      </Button>
    </Box>
  );
};

export default BoardsManagement;
