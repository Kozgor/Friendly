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
  boardStepperButtons,
  boardStepperLabels,
  possibleBoardStatuses
} from '../../constants';
import { BoardContext } from '../../context/board/boardContext';
import { IBoardSettings } from '../../interfaces/boardSettings';
import { boardAPI } from '../../api/BoardAPI';
import { defaultTheme } from '../../theme/default';
import { icons } from '../../theme/icons/iconst';

import classes from './BoardStepper.module.scss';

interface IOwnerState {
  completed?: boolean;
  active?: boolean;
}

const ColorlibStepIconRoot = styled('div')<{ownerState: IOwnerState}>
  (({ ownerState }) => ({
    zIndex: 1,
    color: defaultTheme.color4,
    width: 39.5,
    height: 36,
    padding: 4,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultTheme.color3,
    ...(ownerState.active && {
      backgroundColor: defaultTheme.color3
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
  const [currentBoardStatus, setCurrentBoardStatus] = useState(board.status);
  const { finalizeBoard } = boardAPI();
  const formatedDate = moment(board.createdAt).format('DD/MM/YYYY');
  const stepIconValues = {
    1: icons.backpack,
    2: icons.passport,
    3: icons.geo,
    4: icons.map,
    5: null
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

  const openSpecificBoard = (index: number) => {
    if (index === 2 && currentBoardStatus === possibleBoardStatuses.active || index === 4) {
      return;
    }
    if (board._id) {
      setBoardId(board._id);
      navigate(`/board/${board._id}`);
    }
  };

  const isCompletedStep = (index: number) => {
    if (index === 0) {
      return true;
    }

    if (index === 1 && currentBoardStatus === possibleBoardStatuses.finalized ||
      currentBoardStatus === possibleBoardStatuses.archived) {

      return true;
    }

    if (index === 2 && currentBoardStatus === possibleBoardStatuses.finalized ||
      currentBoardStatus === possibleBoardStatuses.archived) {

      return true;
    }

    if (index === 3 && currentBoardStatus === possibleBoardStatuses.archived) {
      return true;
    }

    return false;
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
        activeStep={1}
        sx={{
          '& .MuiStepConnector-line': {
            borderStyle: 'dotted',
            borderLeft: 'none',
            borderRight: 'none',
            borderColor: 'black',
            borderBottom: 'none',
            borderBlockStartWidth: 2
          },
          '& .Mui-completed:nth-of-type(1)': {
            paddingLeft: '0px'
          }
        }}
      >
        {Object.values(stepIconValues).map((_: any, index: number) => (
          <Step key={index} completed={isCompletedStep(index)}>
            {(index === 2 && currentBoardStatus === possibleBoardStatuses.active) || index === 4 ?
              (<Button
                disabled={index === 4 && currentBoardStatus !== possibleBoardStatuses.finalized}
                onClick={index === 2 && currentBoardStatus === possibleBoardStatuses.active ? onFinalizeBoard :
                  () => {}}
                sx={{
                  backgroundColor: defaultTheme.color2,
                  '&:hover': {
                    backgroundColor: defaultTheme.color2
                  },
                  '&:disabled': {
                    backgroundColor: defaultTheme.color2,
                    color: defaultTheme.color4,
                    opacity: 0.5
                  }
                }}
              >
                {index === 2 ? boardStepperButtons.finalize : boardStepperButtons.archive}
              </Button>) :
              (<StepButton
                disabled={index === 3 && currentBoardStatus === possibleBoardStatuses.active}
                onClick={() => openSpecificBoard(index)}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  sx={{
                    opacity: index === 3 && currentBoardStatus === possibleBoardStatuses.active ? 0.5 : 1,
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
          backgroundColor: defaultTheme.color5,
          opacity: '0.8',
          width: 'calc(100% - 8px)'
        }}
      />
    </Stack>
  );
};

export default BoardStepper;
