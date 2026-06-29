import { useState } from "react";
import { useOutletContext } from "react-router";
import styles from "./comment.module.css";

export default function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { accessToken } = useOutletContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://blog-backend-production-e9b5.up.railway.app/api/posts/${postId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ content }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          setContent("");
          throw new Error("Login/Register to comment");
        } else throw new Error(data.message || "Error in posting comment");
      }
      onCommentAdded(data.comment);
      setContent("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <input
          className={styles.commentInput}
          type="text"
          name="comment"
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment…"
        />
        <button className={styles.commentBtn} type="submit" disabled={loading}>
          {loading ? "Posting…" : "Comment"}
        </button>
      </form>
      {error && <div className={styles.errorText}>{error}</div>}
    </>
  );
}
