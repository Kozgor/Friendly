import Comment from '../Comment/Comment';
import classes from './Column.module.scss';

const Column = () => {
  const comments = [{ id: 'test' }];

  return (
    <section className={classes.column}>
      <div className={classes['column__header']}>
        <h2>Test title</h2>
        <p>Test description</p>
      </div>
      <div className={classes['column__adding']}>
        <i className="bi bi-plus"></i>
        <h4>Add comment</h4>
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
