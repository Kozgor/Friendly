import { useContext, useMemo, useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import Countdown from 'react-countdown';
import moment from 'moment';

import { ColumnContext } from '../../store/column-context';
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
  const { enableAdding, disableAdding } = useContext(ColumnContext);

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
          type="submit"
          aria-label="submit the form"
          onClick={showTimer}
        >
          Start
        </Button>
      )}

      {countdownTimer.isTimerStarted && !countdownTimer.isTimerCompleted && (
        <div
          className={classes.timer}
          aria-description="timer section"
          data-testid="timer"
        >
          {!countdownTimer.isTimerPaused && (
            <div
              className={classes.timer__pause}
              onClick={pauseTimer}
              aria-label="pause button"
              role="button"
              data-testid="pause"
            >
              <i className="bi bi-pause-circle-fill"></i>
            </div>
          )}

          {countdownTimer.isTimerPaused && (
            <div
              className={classes.timer__start}
              onClick={startTimer}
              aria-label="start button"
              role="button"
              data-testid="continue"
            >
              <i className="bi bi-play-fill"></i>
            </div>
          )}

          {countdown}

          <div
            className={classes.timer__reset}
            onClick={resetTimer}
            aria-label="reset button"
            role="button"
            data-testid="reset"
          >
            <i className="bi bi-square-fill"></i>
          </div>
        </div>
      )}
      {countdownTimer.isTimerCompleted && (
        <Button
          variant="solid"
          type="submit"
          aria-label="submit the form"
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
