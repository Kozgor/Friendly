import Button from '@mui/joy/Button';
import { useContext } from 'react';

import { ColumnContext } from '../../store/column-context';
import Comment from '../Comment/Comment';
import { IColumn } from '../../interfaces/column';

import classes from './Column.module.scss';

const Column = (props: IColumn) => {
  const comments = [{ id: 'test' }];
  const { isAddingDisabled } = useContext(ColumnContext);

  return (
    <section className={classes.column}>
      <div className={classes['column__header']}>
        <h2>{props.title}</h2>
        <p>{props.subtitle}</p>
      </div>
      {/* <div className={classes['column__adding']}>
        <Button
          disabled={isAddingDisabled}
          role="button"
          aria-label="Add new comment"
        >
          <i className="bi bi-plus"></i>
          <h4>Add comment</h4>
        </Button>
      </div> */}
      {/* <div className={classes['column__comments']}>
        {comments.map((comment) => (
          <Comment key={comment.id} />
        ))}
      </div> */}
    </section>
  );
};

export default Column;
