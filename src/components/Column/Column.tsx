import Button from '@mui/joy/Button';
import Comment from '../Comment/Comment';
import { IColumn } from '../../interfaces/column';

import classes from './Column.module.scss';

const Column = (props: IColumn) => {
  const comments = [{ id: 'test' }];

  return (
    <section className={classes.column}>
      <div className={classes['column__header']}>
        <h2>{props.columnTitle}</h2>
        <p>{props.columnSubtitle}</p>
      </div>
      <div className={classes['column__adding']}>
        <Button disabled={props.isAddingDisabled}>
          <i className="bi bi-plus"></i>
          <h4>Add comment</h4>
        </Button>
      </div>
      <div className={classes['column__comments']}>
        {comments.map((comment) => (
          <Comment key={comment.id} />
        ))}
      </div>
    </section>
  );
};

export default Column;
