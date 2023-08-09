import classes from './Comment.module.scss';

const Comment = () => (
  <div className={classes.comment}>
    <p className={classes['comment__message']}>Some text</p>
    <div className={classes['comment__user']}>
      <div className={classes['comment__user--avatar']}>Icon</div>
      <div className={classes['comment__user--name']}>User</div>
    </div>
  </div>
);

export default Comment;
