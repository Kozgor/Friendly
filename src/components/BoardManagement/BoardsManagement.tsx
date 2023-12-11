import { useContext, useEffect, useState } from 'react';

import { Box, CircularProgress, Divider } from '@mui/joy';
import { BoardContext } from '../../context/board/boardContext';
import { boardAPI } from '../../api/BoardAPI';
import { defaultTheme } from '../../theme/default';
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
        bgcolor: 'var(--friendly-palette-neutral-50);',
        padding: '0 32px',
        marginLeft: 0,
        width: '100%',
        height: '80vh'
      }}
    >
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
            {boards?.map((board, index) =>
              <div key={board._id}>
                <BoardStepper board={board} />
                {(index + 1) !== boards.length && <Divider
                  sx={{
                    backgroundColor: defaultTheme.color7,
                    opacity: '0.8',
                    width: 'calc(70% - 8px)'
                  }}
                />}
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
