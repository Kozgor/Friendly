/* eslint-disable complexity */
import moment from 'moment';

import { Button, Divider, Typography } from '@mui/joy';
import {
  Stack,
  Step,
  StepButton,
  StepIconProps,
  StepLabel,
  Stepper,
  styled
} from '@mui/material';

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

interface IOwnerState {
  completed?: boolean;
  active?: boolean;
}

const ColorlibStepIconRoot = styled('div')<{ownerState: IOwnerState}>
  (({ ownerState }) => ({
    zIndex: 1,
    color: defaultTheme.color3,
    width: 39.5,
    height: 36,
    padding: 4,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultTheme.color4,
    ...(ownerState.active && {
      backgroundColor: defaultTheme.color4
    }),
    ...(ownerState.completed && {
      backgroundColor: defaultTheme.color5
    })
  })
);

const BoardStepper = (props: { board: IBoardSettings }) => {
  const { board } = props;
  const navigate = useNavigate();
  const { setBoardId, setBoardStatus } = useContext(BoardContext);
  const [currentBoardStatus, setCurrentBoardStatus] = useState<string>(board.status);
  const { finalizeBoard } = boardAPI();
  const formatedDate = moment(board.createdAt).format('DD/MM/YYYY');

  const stepIconValues = {
    1: icons.map,
    2: icons.backpack,
    3: icons.pinMap,
    4: icons.bus,
    5: null
  };

  const isStatusArchivedOrFinalized = currentBoardStatus === possibleBoardStatuses.finalized ||
    currentBoardStatus === possibleBoardStatuses.archived;
  const isStatusArchived = currentBoardStatus === possibleBoardStatuses.archived;

  const isStepCompletedMap = {
    [STEPS_MAP.first]: true,
    [STEPS_MAP.second]: isStatusArchivedOrFinalized,
    [STEPS_MAP.third]: isStatusArchivedOrFinalized,
    [STEPS_MAP.fourth]: isStatusArchived
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
      navigate(`/board/${board._id}`);
    }
  };

  const ColorlibStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;
    const opacity = (!active && !completed) &&
      currentBoardStatus !== possibleBoardStatuses.finalized ? 0.5 : 1;

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
        sx={{
          opacity
        }}
      >
        {stepIconValues[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
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
        activeStep={STEPS_MAP.second}
        sx={{
          '& .MuiStepConnector-line': {
            borderStyle: 'dotted',
            borderLeft: 'none',
            borderRight: 'none',
            borderColor: defaultTheme.color7,
            borderBottom: 'none',
            borderBlockStartWidth: 2
          },
          '& .Mui-completed:nth-of-type(1)': {
            paddingLeft: '0px'
          }
        }}
      >
        {Object.values(stepIconValues).map((_: any, index: number) => (
          <Step key={index} completed={isStepCompletedMap[index]}>
            {(index === STEPS_MAP.third && currentBoardStatus === possibleBoardStatuses.active) ||
              index === STEPS_MAP.fifth ?
              (<Button
                disabled={index === STEPS_MAP.fifth && currentBoardStatus !== possibleBoardStatuses.finalized}
                onClick={index === STEPS_MAP.third && currentBoardStatus === possibleBoardStatuses.active ?
                  onFinalizeBoard : () => {}}
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
                disabled={index === STEPS_MAP.fourth && currentBoardStatus === possibleBoardStatuses.active}
                onClick={openSpecificBoard}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  sx={{
                    opacity: index === STEPS_MAP.fourth && currentBoardStatus === possibleBoardStatuses.active ? 0.5 : 1,
                    '&:hover': {
                      cursor: 'pointer'
                    }
                  }}
                >
                  <span className={classes.stepperStepLabel}>{boardStepperLabels[index]}</span>
                </StepLabel>
              </StepButton>)
            }
          </Step>
        ))}
      </Stepper>
      <Divider
        sx={{
          backgroundColor: defaultTheme.color7,
          opacity: '0.8',
          width: 'calc(100% - 8px)'
        }}
      />
    </Stack>
  );
};

export default BoardStepper;
