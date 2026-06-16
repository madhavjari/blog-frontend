import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./post.module.css";
import formatRelativeTime from "../../config/timestamp";

export default function UniquePost() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(
      `https://blog-backend-production-e9b5.up.railway.app/api/posts/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
        setPost(data || []);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [setPost, token, id]);
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
  return (
    <article>
      <h2 className={styles.postCardTitle}>{post.title}</h2>
      <p className={styles.postCardContent}>{post.content}</p>
      <p className={styles.postMeta}>{formatRelativeTime(post.timeStamp)}</p>
    </article>
  );
}
