import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./post.module.css";
import formatRelativeTime from "../../config/timestamp";
import { Link } from "react-router";
import { useOutletContext } from "react-router";
import BlogStatus from "../../components/blogStatus";

export default function UserPost() {
  const { username: user } = useParams();
  const { username, accessToken } = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isEqual = username === user;
  const handleStatusChange = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
    );
  };
  useEffect(() => {
    fetch(
      `https://blog-backend-production-e9b5.up.railway.app/api/posts/user/${user}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("User portfolio not found");
        return res.json();
      })
      .then((data) => {
        setPosts(data.userPost || []);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user, accessToken]);
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
          <p className={styles.eyebrow}>Author Archive</p>
          <h1 className={styles.title}>{user}&apos;s posts</h1>
          <p className={styles.subtitle}>
            All published writing from this author.
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
                <div className={styles.postHeader}>
                  <Link className={styles.postAuthor} to={`/${user}`}>
                    {user}
                  </Link>
                  <div className={styles.postUnpublished}>
                    <p className={styles.postTime}>
                      {isEqual ? (
                        <BlogStatus
                          post={post}
                          accessToken={accessToken}
                          onStatusChange={handleStatusChange}
                        />
                      ) : null}
                    </p>
                    <time className={styles.postTime}>
                      {formatRelativeTime(post.timestamp)}
                    </time>
                  </div>
                </div>
                <Link to={`/posts/${post.id}`}>
                  <h2 className={styles.postCardTitle}>{post.title}</h2>
                </Link>
                <p className={styles.postCardContent}>{post.content}</p>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
