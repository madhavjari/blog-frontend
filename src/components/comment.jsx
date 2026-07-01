import formatRelativeTime from "../config/timestamp";
import styles from "./comment.module.css";
import { Link } from "react-router";
import DeleteComment from "./DeleteComment";

export default function Comment({
  comments,
  error,
  author,
  accessToken,
  onDelete,
}) {
  if (error) return <p> {error.message} </p>;

  return (
    <>
      {comments.length === 0 ? null : (
        <div className={styles.commentSection}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <Link
                to={`/${comment.user.username}`}
                className={styles.commentAvatar}
              >
                {comment.user.username[0]}
              </Link>
              <div>
                <div className={styles.commentBubble}>
                  <Link
                    to={`/${comment.user.username}`}
                    className={styles.commentAuthor}
                  >
                    {comment.user.username}
                  </Link>
                  <span className={styles.commentContent}>
                    {comment.content}
                  </span>
                </div>
                <div className={styles.commentMeta}>
                  <time className={styles.commentTime}>
                    {formatRelativeTime(comment.timestamp)}
                  </time>
                  {author ? (
                    <DeleteComment
                      accessToken={accessToken}
                      comment={comment}
                      onDelete={onDelete}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
