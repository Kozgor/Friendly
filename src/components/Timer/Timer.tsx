import Button from '@mui/joy/Button';
import Countdown from 'react-countdown';
import classes from './Timer.module.scss';
import moment from 'moment';
import { useMemo, useRef, useState } from 'react';

const Timer = () => {
  const [isStarted, setStarted] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const countdownRef = useRef<Countdown>(null);
  const [isChanged, setIsChanged] = useState(false);
  const time = 600000; // should be received from manager settings, equal 10 min

  const getNow = (): number => moment().toDate().getTime();

  const now = getNow();
  const date = now + time;

  const startTimer = () => {
    countdownRef.current?.start();
    setPaused(false);
  };

  const pauseTimer = () => {
    countdownRef.current?.pause();
    setPaused(true);
  };

  const resetTimer = () => {
    countdownRef.current?.stop();
    setPaused(true);
  };

  const showTimer = () => {
    setStarted(true);
    setIsChanged(true);
  };

  const submitForm = () => {
    console.log('submit');
  };

  const onComplete = () => {
    setCompleted(true);
  };

  const countdown = useMemo(
    () => (
      <Countdown
        className={classes.timer__time}
        ref={countdownRef}
        daysInHours
        date={date}
        onComplete={onComplete}
      ></Countdown>
    ),
    [isChanged]
  );

  return (
    <>
      {!isStarted && (
        <Button
          variant="solid"
          type="submit"
          aria-label="submit the form"
          onClick={showTimer}
        >
          Start
        </Button>
      )}
      {isStarted && !isCompleted && (
        <div className={classes.timer}>
          {!isPaused && (
            <div className={classes.timer__pause} onClick={pauseTimer}>
              <i className="bi bi-pause-circle-fill"></i>
            </div>
          )}
          {isPaused && (
            <div className={classes.timer__start} onClick={startTimer}>
              <i className="bi bi-play-fill"></i>
            </div>
          )}
          {countdown}
          <div className={classes.timer__reset} onClick={resetTimer}>
            <i className="bi bi-square-fill"></i>
          </div>
        </div>
      )}
      {isCompleted && (
        <Button
          variant="solid"
          type="submit"
          aria-label="submit the form"
          onClick={submitForm}
        >
          Submit
        </Button>
      )}
    </>
  );
};

export default Timer;
