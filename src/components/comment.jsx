import formatRelativeTime from "../config/timestamp";
import styles from "./comment.module.css";
import { Link } from "react-router";

export default function Comment({ comments, error }) {
  if (error) return <p> No comments on Unpublished Post</p>;

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
                <time className={styles.commentTime}>
                  {formatRelativeTime(comment.timestamp)}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
