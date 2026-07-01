import { useState } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  ModalDialog,
} from "./ModalDialog";
import styles from "./dailog.module.css";

export default function BlogStatus({ post, accessToken, onStatusChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://blog-backend-production-e9b5.up.railway.app/api/posts/${post.id}/update`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error in changing post status");
      }
      onStatusChange(data.post);
      setIsOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ModalDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <button
            onClick={() => setIsOpen(true)}
            className={post.published ? styles.unpublishBtn : styles.publishBtn}
          >
            {post.published ? "Unpublish Post" : "Publish Post"}
          </button>
        }
      >
        <DialogHeader>
          {post.published ? "Unpublish Post" : "Publish Post"}
        </DialogHeader>
        <DialogContent>
          {error && <p className={styles.errorText}>{error}</p>}
          Are you sure you want to make the changes?
        </DialogContent>
        <DialogFooter>
          <button className={styles.denyBtn} onClick={() => setIsOpen(false)}>
            Deny
          </button>
          <button
            className={styles.confirmBtn}
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "Updating…" : "Confirm"}
          </button>
        </DialogFooter>
      </ModalDialog>
    </>
  );
}
