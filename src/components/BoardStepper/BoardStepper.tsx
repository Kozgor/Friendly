/* eslint-disable complexity */
import moment from 'moment';

import {
  Button, Typography, Stack,
  StepButton,
  Stepper,
  StepIndicator
} from '@mui/joy';
import Step, { stepClasses } from '@mui/joy/Step';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  STEPS_MAP,
  boardStepperButtons,
  boardStepperLabels,
  possibleBoardStatuses
} from '../../constants';
import { BoardContext } from '../../context/board/boardContext';
import { IBoardSettings } from '../../interfaces/boardSettings';
import { boardAPI } from '../../api/BoardAPI';
import { defaultTheme } from '../../theme/default';
import { icons } from '../../theme/icons/icons';

import classes from './BoardStepper.module.scss';
import { localStorageManager } from '../../utils/localStorageManager';

const BoardStepper = (props: { board: IBoardSettings }) => {
  const { board } = props;
  const navigate = useNavigate();
  const { setBoardId, setBoardStatus } = useContext(BoardContext);
  const [currentBoardStatus, setCurrentBoardStatus] = useState<string>(board.status);
  const { removeLocalBoardDetails, saveLocalBoardDetails } = localStorageManager();
  const { finalizeBoard } = boardAPI();
  const formatedDate = moment(board.createdAt).format('DD/MM/YYYY');

  const stepIconValues = {
    1: icons.map,
    2: icons.backpack('var(--friendly-palette-shades-50)'),
    3: icons.pinMap,
    4: icons.bus('var(--friendly-palette-shades-50)')
    // 5: null
  };

  const isStatusActive = currentBoardStatus === possibleBoardStatuses.active;
  const isStatusFinalized = currentBoardStatus === possibleBoardStatuses.finalized;
  // ToDo: add so steps when the time comes const isStatusArchived = currentBoardStatus === possibleBoardStatuses.archived;

  const isStepCompletedMap = {
    [STEPS_MAP.first]: true,
    [STEPS_MAP.second]: isStatusFinalized, // isStatusArchived || isStatusFinalized
    [STEPS_MAP.third]: isStatusFinalized // [STEPS_MAP.third]: isStatusArchived || isStatusFinalized
    // ToDo: add so steps when the time comes [STEPS_MAP.fourth]: isStatusArchived
  };

  const onFinalizeBoard = async () => {
    if (board._id) {
      const finalizedBoard = await finalizeBoard(board._id);

      setCurrentBoardStatus(possibleBoardStatuses.finalized);
      setBoardStatus(possibleBoardStatuses.finalized);

      return finalizedBoard;
    }
  };

  // const onArchiveBoard = () => {
  //   if (board._id) {
  //     setCurrentBoardStatus(possibleBoardStatuses.archived);
  //     setBoardStatus(possibleBoardStatuses.archived);
  //   }
  // };

  const openSpecificBoard = () => {
    if (board._id) {
      setBoardId(board._id);
      removeLocalBoardDetails(),
        saveLocalBoardDetails({ currentBoardId: board._id, currentBoardName: board.name }),
        navigate(`/board/${board._id}`);
    }
  };

  return (
    <Stack sx={{
      width: '70%',
      marginTop: '40px',
      marginBottom: '40px'
    }} spacing={5}>
      <div className={classes.stepperHeader}>
        <div className={classes.stepperHeaderTittle}>
          <div className={classes.boardNameContainerLeft}>
            <Typography level='body-md' fontSize='xl'>Board:</Typography>
          </div>
          <div className={classes.boardNameContainerRight}>
            <Typography level='h4'> {board.name} ({formatedDate})</Typography>
          </div>
        </div>
      </div>
      <Stepper
        sx={{
          '--StepIndicator-size': '2.5rem',
          paddingLeft: '20px',
          [`& .${stepClasses.root}::after`]: {
            color: 'primary.500',
            backgroundColor: 'transparent',
            backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)',
            backgroundSize: '7px',
            backgroundPosition: 'center left'
          }
        }}
      >
        {Object.values(stepIconValues).map((_: any, index: number) => (
          <Step key={index} completed={isStepCompletedMap[index]} active={index === STEPS_MAP.second}
            disabled={(index === STEPS_MAP.fifth && !isStatusFinalized) || ((index === STEPS_MAP.fourth && isStatusActive) ||
              isStepCompletedMap[index])}
            indicator={!((index === STEPS_MAP.third && isStatusActive) ||
              index === STEPS_MAP.fifth) && <StepIndicator variant="solid" sx={{
                background: isStepCompletedMap[index] ? 'var(--friendly-palette-neutral-700)' : 'rgb(255, 166, 43)',
                borderRadius: '4px',
                height: '36px',
                minWidth: '40px',
                opacity: index === STEPS_MAP.fourth && isStatusActive ? 0.5 : 1
              }}>
                {stepIconValues[index + 1]}
              </StepIndicator>}>
            {(index === STEPS_MAP.third && isStatusActive) ||
              index === STEPS_MAP.fifth ?
              (<Button
                disabled={index === STEPS_MAP.fifth && !isStatusFinalized}
                onClick={index === STEPS_MAP.third && isStatusActive ?
                  onFinalizeBoard : () => { }}
                sx={{
                  backgroundColor: defaultTheme.color2,
                  '&:hover': {
                    backgroundColor: defaultTheme.color2
                  },
                  '&:disabled': {
                    backgroundColor: defaultTheme.color2,
                    color: defaultTheme.color3,
                    opacity: 0.5
                  }
                }}
              >
                {index === STEPS_MAP.third ? boardStepperButtons.finalize : boardStepperButtons.archive}
              </Button>) :
              (<StepButton
                disabled={(index === STEPS_MAP.fourth && isStatusActive) ||
                  isStepCompletedMap[index]}
                onClick={openSpecificBoard}
                sx={{ cursor: (index === STEPS_MAP.fourth && isStatusActive) || isStepCompletedMap[index] ? 'default' : 'pointer' }}>
                <Typography component="span" sx={{
                  opacity: index === STEPS_MAP.fourth && isStatusActive ? 0.5 : 1,
                  '&:hover': {
                    cursor: (index === STEPS_MAP.fourth && isStatusActive) || isStepCompletedMap[index] ? 'default' : 'pointer'
                  }
                }}>
                  <span className={classes.stepperStepLabel}>{boardStepperLabels[index]}</span>
                </Typography>
              </StepButton>)
            }
          </Step>
        ))}
      </Stepper>

    </Stack>
  );
};

export default BoardStepper;
