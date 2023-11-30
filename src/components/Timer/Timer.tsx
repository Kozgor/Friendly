import { useContext, useMemo, useRef, useState } from 'react';
import { BoardContext } from '../../context/board/boardContext';
import Button from '@mui/joy/Button';
import Countdown from 'react-countdown';
import moment from 'moment';

import classes from './Timer.module.scss';

const Timer = () => {
  const initialTimerState = {
    isTimerStarted: false,
    isTimerPaused: false,
    isTimerCompleted: false,
    isTimerChanged: false
  };

  const [countdownTimer, setTimer] = useState(initialTimerState);
  const countdownRef = useRef<Countdown>(null);
  const { boardTime, enableAdding, disableAdding, finalizeTimer, setTimerVisibility } = useContext(BoardContext);
  const timeMultiplier = 60000;
  const now = moment().toDate().getTime();
  const date = now + (boardTime * timeMultiplier);

  const startTimer = () => {
    countdownRef.current?.start();
    setTimer((prevState) => ({
      ...prevState,
      isTimerPaused: false
    }));
    enableAdding();
  };

  const pauseTimer = () => {
    countdownRef.current?.pause();
    setTimer((prevState) => ({
      ...prevState,
      isTimerPaused: true
    }));
    disableAdding();
  };

  const resetTimer = () => {
    countdownRef.current?.stop();
    setTimer((prevState) => ({
      ...prevState,
      isTimerPaused: true
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
  };

  const onComplete = () => {
    setTimer((prevState) => ({
      ...prevState,
      isTimerCompleted: true
    }));
    disableAdding();
    finalizeTimer();
    setTimerVisibility(false);
  };

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
    [countdownTimer.isTimerChanged]
  );

  return (
    <>
      {!countdownTimer.isTimerStarted && (
        <Button
          variant="solid"
          color='neutral'
          type="submit"
          aria-label="solid neutral button for enabling and starting timer"
          onClick={showTimer}
          data-testid="timerStartButton"
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
          {!countdownTimer.isTimerPaused && (
            <button
              className={classes.timer__pause}
              onClick={pauseTimer}
              aria-label="button for pausing timer"
              data-testid="pause"
            >
              <i className="bi bi-pause-circle-fill"></i>
            </button>
          )}

          {countdownTimer.isTimerPaused && (
            <button
              className={classes.timer__start}
              onClick={startTimer}
              aria-label="button for starting timer"
              data-testid="continue"
            >
              <i className="bi bi-play-fill"></i>
            </button>
          )}

          {countdown}

          <button
            className={classes.timer__reset}
            onClick={resetTimer}
            aria-label="button for resetting timer"
            data-testid="reset"
          >
            <i className="bi bi-square-fill"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Timer;
