import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import Countdown from 'react-countdown';
import moment from 'moment';

import { BoardContext } from '../../context/board/boardContext';
import { icons } from '../../theme/icons/icons';

import classes from './Timer.module.scss';

const Timer = () => {
  const initialTimerState = {
    isTimerStarted: false,
    isAddingDisabled: false,
    isTimerCompleted: false,
    isTimerChanged: false
  };

  const [countdownTimer, setTimer] = useState(initialTimerState);
  const countdownRef = useRef<Countdown>(null);
  const { boardTime, enableAdding, disableAdding, finalizeTimer, setTimerVisibility, startTimer } = useContext(BoardContext);
  const timeMultiplier = useMemo(() => 60000, []);
  const now = moment().toDate().getTime();
  const date = useMemo(() => now + (boardTime * timeMultiplier), [boardTime, now, timeMultiplier]);

  const playTimer = () => {
    countdownRef.current?.start();
    setTimer((prevState) => ({
      ...prevState,
      isAddingDisabled: false
    }));
    enableAdding();
  };

  const pauseTimer = () => {
    countdownRef.current?.pause();
    setTimer((prevState) => ({
      ...prevState,
      isAddingDisabled: true
    }));
    disableAdding();
  };

  const resetTimer = () => {
    countdownRef.current?.stop();
    setTimer((prevState) => ({
      ...prevState,
      isAddingDisabled: true
    }));
    disableAdding();
  };

  const showTimer = () => {
    setTimer((prevState) => ({
      ...prevState,
      isTimerStarted: true,
      isTimerChanged: true
    }));
    enableAdding();
    startTimer();
  };

  const onComplete = useCallback(() => {
    setTimer((prevState) => ({
      ...prevState,
      isTimerCompleted: true
    }));
    disableAdding();
    finalizeTimer();
    setTimerVisibility(false);
  }, []);

  const countdown = useMemo(
    () => (
      <Countdown
        className={classes.timer__time}
        ref={countdownRef}
        daysInHours
        date={date}
        onComplete={onComplete}
        aria-description="timer"
      ></Countdown>
    ),
    [countdownTimer.isTimerChanged, onComplete]
  );

  return (
    <>
      {!countdownTimer.isTimerStarted && (
        <Button
          color='secondary'
          type="submit"
          aria-label="solid neutral button for enabling and starting timer"
          onClick={showTimer}
          data-testid="timerStartButton"
          sx={{
            backgroundColor: 'var(--friendly-palette-secondary-900)',
            color: 'var(--friendly-palette-shades-50)'
          }}
        >
          Start Timer
        </Button>
      )}

      {countdownTimer.isTimerStarted && !countdownTimer.isTimerCompleted && (
        <div
          className={classes.timer}
          aria-description="timer section"
          data-testid="timer"
        >
          {!countdownTimer.isAddingDisabled && (
            <button
              className={classes.timer__pause}
              onClick={pauseTimer}
              aria-label="button for pausing timer"
              data-testid="pause"
            >
              {icons.pauseCircle()}
            </button>
          )}

          {countdownTimer.isAddingDisabled && (
            <button
              className={classes.timer__start}
              onClick={playTimer}
              aria-label="button for starting timer"
              data-testid="continue"
            >
              {icons.playCircle()}
            </button>
          )}

          {countdown}

          <button
            className={classes.timer__reset}
            onClick={resetTimer}
            aria-label="button for resetting timer"
            data-testid="reset"
          >
            {icons.stopCircle()}
          </button>
        </div>
      )}
    </>
  );
};

export default Timer;
