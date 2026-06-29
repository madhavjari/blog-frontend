import { useState } from "react";
import { useOutletContext } from "react-router";
import checkUser from "../config/checkUser";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import styles from "./postform.module.css";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { accessToken } = useOutletContext();
  const user = checkUser(accessToken);
  const { username } = useParams();
  const areEqual = user === username;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://blog-backend-production-e9b5.up.railway.app/api/posts",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ title, content }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error in Submitting posts");
      }
      alert(
        "Blog submitted successfully. Go to your profile to review and publish!",
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return areEqual ? (
    <div className={styles.formPage}>
      <div className={styles.formShell}>
        <div className={styles.formHero}>
          <span className={styles.formEyebrow}>New Post</span>
          <h1 className={styles.formTitle}>Create a Blog Post</h1>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="title">
              Title
            </label>
            <input
              className={styles.input}
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="content">
              Content
            </label>
            <textarea
              className={styles.textarea}
              name="content"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? "Submitting…" : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className={styles.formPage}>
      <div className={styles.formShell}>
        <div className={styles.denied}>
          <h3>Cannot create a blog for another user.</h3>
        </div>
      </div>
    </div>
  );
}
