import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./post.module.css";
import formatRelativeTime from "../../config/timestamp";
import { Link } from "react-router";
import { useOutletContext } from "react-router";

export default function UniquePost() {
  const { id } = useParams();
  const { accessToken } = useOutletContext();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(
      `https://blog-backend-production-e9b5.up.railway.app/api/posts/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
      .then((response) => {
        if (response.status >= 400) {
          setError("Post not found");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data.post || []);
        setError(null);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [setPost, accessToken, id]);
  if (loading)
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  if (error)
    return (
      <div className={styles.page}>
        <div className={styles.shell}>
          <div className={styles.statusState}>
            <p className={styles.statusTitle}>Unable to load post</p>
            <p className={styles.statusText}>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  const author = post?.user || "Unknown author";
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <article key={post.id} className={styles.postCard}>
          <div className={styles.postHeader}>
            <Link className={styles.postAuthor} to={`/${author}`}>
              {author}
            </Link>
            <time className={styles.postTime}>
              {formatRelativeTime(post.timeStamp)}
            </time>
          </div>
          <h2 className={styles.postCardTitle}>{post.title}</h2>
          <p className={styles.postCardContent}>{post.content}</p>
        </article>
      </div>
    </div>
  );
}
