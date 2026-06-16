import { useState, useEffect } from "react";
import styles from "./post.module.css";
import formatRelativeTime from "../../config/timestamp";

function AllPost() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://blog-backend-production-e9b5.up.railway.app/api/posts", {
      method: "GET",
      headers: {
        "User-agent": "owner",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad request");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts || []);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [setPosts]);

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
            <p className={styles.statusTitle}>We hit a snag</p>
            <p className={styles.statusText}>
              A network error was encountered. Please try again in a moment.
            </p>
          </div>
        </div>
      </div>
    );
  return (
    posts && (
      <div className={styles.page}>
        <div className={styles.shell}>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>Public Feed</p>
            <h1 className={styles.title}>Latest stories from the blog</h1>
            <p className={styles.subtitle}>
              Browse through recent posts in a polished, card-based layout.
            </p>
          </section>
          <section className={styles.postsGrid}>
            {posts.length === 0 ? (
              <div className={styles.emptyState}>
                No posts have been published yet.
              </div>
            ) : (
              posts.map((post) => {
                return (
                  <article key={post.id} className={styles.postCard}>
                    <p>{post.user.username}</p>
                    <h2 className={styles.postCardTitle}>{post.title}</h2>
                    <p className={styles.postCardContent}>{post.content}</p>
                    <p className={styles.postMeta}>
                      {formatRelativeTime(post.timestamp)}
                    </p>
                  </article>
                );
              })
            )}
          </section>
        </div>
      </div>
    )
  );
}

export default AllPost;
