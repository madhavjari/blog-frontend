import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./post.module.css";
import formatRelativeTime from "../../config/timestamp";
import { Link } from "react-router";
import { useOutletContext, useNavigate } from "react-router";
import Comment from "../../components/comment";
import CommentForm from "../../components/commentForm";
import BlogStatus from "../../components/blogStatus";
import DeletePost from "../../components/DeletePost";

export default function UniquePost() {
  const { id } = useParams();
  const { username, accessToken } = useOutletContext();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [isEqual, setIsEqual] = useState(false);
  const navigate = useNavigate();
  const handleStatusChange = (updatedPost) => {
    setPost(updatedPost);
  };
  const handleDelete = () => {
    navigate(`/${username}`);
  };
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
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setPost(data.post || []);
        setIsEqual(data.post.user.username === username);
        setError(null);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [accessToken, id, username]);
  useEffect(() => {
    fetch(
      `https://blog-backend-production-e9b5.up.railway.app/api/posts/${id}/comments`,
      {
        method: "GET",
      },
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad request");
        }
        return response.json();
      })
      .then((data) => {
        setComments(data.comments || []);
        setCommentError(null);
      })
      .catch((error) => setCommentError(error));
  }, [id, setComments]);

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };
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
  const author = post.user?.username || "Unknown author";
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <article key={post.id} className={styles.postCard}>
          <div className={styles.postHeader}>
            <Link className={styles.postAuthor} to={`/${author}`}>
              {author}
            </Link>
            <div className={styles.postUnpublished}>
              {isEqual ? (
                <>
                  <BlogStatus
                    post={post}
                    accessToken={accessToken}
                    onStatusChange={handleStatusChange}
                  />
                  <DeletePost
                    post={post}
                    accessToken={accessToken}
                    onDelete={handleDelete}
                  />
                </>
              ) : null}
              <time className={styles.postTime}>
                {formatRelativeTime(post.timestamp)}
              </time>
            </div>
          </div>
          <h2 className={styles.postCardTitle}>{post.title}</h2>
          <p className={styles.postCardContent}>{post.content}</p>
          <Comment comments={comments} error={commentError} />
          <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
        </article>
      </div>
    </div>
  );
}
