import { useContext, useEffect, useState } from 'react';

import { Box, CircularProgress } from '@mui/joy';
import { BoardContext } from '../../context/board/boardContext';
import { Divider } from '@mui/material';
import { ThemeContext } from '../../context/theme/themeContext';
import { boardAPI } from '../../api/BoardAPI';
import { sortByDateStartNew } from '../../utils/sortByDate';

import { IBoardSettings } from '../../interfaces/boardSettings';
import { THERE_ARE_NO_BOARDS_MESSAGE } from '../../constants';

import BoardStepper from '../BoardStepper/BoardStepper';
import NoContent from '../NoContent/NoContent';
import classes from './BoardsManagement.module.scss';

const BoardsManagement = () => {
  const { boardId } = useContext(BoardContext);
  const [boards, setBoards] = useState<IBoardSettings[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getAllBoards } = boardAPI();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const boards: IBoardSettings[] | undefined = await getAllBoards();

      boards ? setBoards(sortByDateStartNew(boards)) : setBoards([]);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
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
              data-testid='circular-progress'
              color='primary'
              size='md'
              variant='soft'
            />
          </div>
        }
        {!isLoading &&
          <div className={classes.boardList} data-testid='boards-list'>
            {boards?.map(board =>
              <div key={board._id}>
                <BoardStepper board={board} />
              </div>
            )}
          </div>
        }
        {(!isLoading && !boards?.length) &&
          <NoContent message={THERE_ARE_NO_BOARDS_MESSAGE} />
        }
      </div>
    </Box>
  );
};

export default BoardsManagement;
