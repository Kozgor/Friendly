import BoardHeader from "../BoardHeader/BoardHeader";
import Column from "../Column/Column";

import classes from './Board.module.scss';

const Board = () => {
    const columns = [{ _id: 'test' }]

    return <>
        <BoardHeader />
        <main className={classes.board}>
            {columns.map(column => <Column key={column._id} />)}
        </main>
    </>
}

export default Board;