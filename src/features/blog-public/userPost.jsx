import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./post.module.css";
import formatRelativeTime from "../../config/timestamp";

export default function UserPost() {
  const { username } = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(
      `https://blog-backend-production-e9b5.up.railway.app/api/posts/user/${username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("User portfolio not found");
        return res.json();
      })
      .then((data) => {
        setPosts(data.userPost || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username, token]);
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
            <p className={styles.statusTitle}>Unable to load profile</p>
            <p className={styles.statusText}>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>User Portfolio</p>
          <h1 className={styles.title}>
            Welcome to {username}&apos;s Blog Space
          </h1>
          <p className={styles.subtitle}>
            A curated view of all posts written by this user.
          </p>
        </section>
        <section className={styles.postsGrid}>
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              This user hasn&apos;t written any posts yet.
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className={styles.postCard}>
                <h2 className={styles.postCardTitle}>{post.title}</h2>
                <p className={styles.postCardContent}>{post.content}</p>
                <p className={styles.postMeta}>
                  {formatRelativeTime(post.timestamp)}
                </p>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
