import { useContext, useEffect, useState } from 'react';

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

import { buttonLabels, possibleBoardStatuses } from '../../constants';

import classes from './BoardStepper.module.scss';

const BoardStepper = (props: { board: IBoardSettings }) => {
  const { board } = props;
  const { setBoardStatus } = useContext(BoardContext);
  const steps = [BOARD_STATUSES[1], BOARD_STATUSES[2], BOARD_STATUSES[3]];
  const [activeStep, setActiveStep] = useState(
    board.status === possibleBoardStatuses.active ? 0 : 1
  );
  const [currentBoardStatus, setCurrentBoardStatus] = useState(board.status);
  const [buttonLabel, setButtonLabel] = useState('');
  const { finalizeBoard } = boardAPI();

  useEffect(() => {
    if (currentBoardStatus === possibleBoardStatuses.created) {
      setButtonLabel(buttonLabels.activate);
    } else if (currentBoardStatus === possibleBoardStatuses.active) {
      setButtonLabel(buttonLabels.finalize);
    } else if (currentBoardStatus === possibleBoardStatuses.finalized) {
      setButtonLabel(buttonLabels.archive);
    }
  }, [currentBoardStatus]);

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
    if (activeStep === 1) {
      setCurrentBoardStatus(possibleBoardStatuses.archived);
    }
  };

  return (
    <Box sx={{ width: '50%' }}>
      <div className={classes.stepperHeader}>
        <div className={classes.stepperHeaderSubtittles}>
          <Typography variant='subtitle1' gutterBottom>Board name:</Typography>
          <Typography variant='subtitle1' gutterBottom>Board status:</Typography>
        </div>
        <div className={classes.stepperHeaderInfo}>
          <Typography variant='overline'>{board.name}</Typography>
          <Typography variant='overline'>{currentBoardStatus}</Typography>
        </div>
      </div>
      <Stepper alternativeLabel activeStep={activeStep + 1}>
        {steps.map(label => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length - 1 ? (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {`${board.name} ${possibleBoardStatuses.archived}`}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {buttonLabel}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BoardStepper;
