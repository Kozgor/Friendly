import Timer from '../Timer/Timer';
import classes from './BoardHeader.module.scss';

const BoardHeader = () => {
    return <header className={classes.header}>
        <Timer />
    </header>
}

export default BoardHeader;