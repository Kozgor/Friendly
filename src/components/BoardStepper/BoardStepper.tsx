import { useContext, useState } from 'react';

import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { BOARD_STATUSES } from '../../mocks/board';
import { BoardContext } from '../../context/board/boardContext';
import { IBoardSettings } from '../../interfaces/boardSettings';
import { boardAPI } from '../../api/BoardAPI';
import { possibleBoardStatuses } from '../../constants';

const BoardStepper = (props: { board: IBoardSettings }) => {
  const { board } = props;
  const { setBoardStatus } = useContext(BoardContext);
  const steps = [BOARD_STATUSES[1], BOARD_STATUSES[2]];
  const [activeStep, setActiveStep] = useState(board.status === possibleBoardStatuses.active ? 0 : 1);
  const [currentBoardStatus, setCurrentBoardStatus] = useState(board.status);
  const { finalizeBoard } = boardAPI();

  const onFinalizeBoard = async () => {
    if (board._id) {
      const finalizedBoard = await finalizeBoard(board._id);

      setCurrentBoardStatus(possibleBoardStatuses.finalized);
      setBoardStatus(possibleBoardStatuses.finalized);

      return finalizedBoard;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === 0) {
      onFinalizeBoard();
    }
  };

  return (
    <Box sx={{ width: '50%' }}>
      <Typography variant='overline'>{board.name}</Typography>
      <Stepper activeStep={activeStep}>
        {steps.map(label => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {`${board.name} archived`}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Board status: {currentBoardStatus}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Archive board' : 'Finalize board'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BoardStepper;
