import { useContext, useMemo, useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import Countdown from 'react-countdown';
import moment from 'moment';

import { BoardContext } from '../../context/board/board-context';
import { ITimerProps } from '../../interfaces/timerProps';

import classes from './Timer.module.scss';

const Timer = (props: ITimerProps) => {
  const initialTimerState = {
    isTimerStarted: false,
    isTimerPaused: false,
    isTimerCompleted: false,
    isTimerChanged: false
  };

  const [countdownTimer, setTimer] = useState(initialTimerState);
  const countdownRef = useRef<Countdown>(null);
  const { enableAdding, disableAdding } = useContext(BoardContext);

  const now = moment().toDate().getTime();
  const date = now + props.time;

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

  const submitForm = () => {
    disableAdding();
  };

  const onComplete = () => {
    setTimer((prevState) => ({
      ...prevState,
      isTimerCompleted: true
    }));
    disableAdding();
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
      {countdownTimer.isTimerCompleted && (
        <Button
          variant="solid"
          color='neutral'
          type="submit"
          aria-label="solid neutral button for submitting the form"
          onClick={submitForm}
          role="button"
          data-testid="submit"
        >
          Submit
        </Button>
      )}
    </>
  );
};

export default Timer;
