import classes from './Timer.module.scss';

const Timer = () => (
  <div className={classes.timer}>
    <div className={classes.timer__pause}>
      <i className="bi bi-pause-circle-fill"></i>
    </div>
    <div className={classes.timer__time}>Test time</div>
    <div className={classes.timer__reset}>
      <i className="bi bi-square-fill"></i>
    </div>
  </div>
);

export default Timer;
