import { useState } from "react";
import Delete from "./Delete";
import { useParams } from "react-router";

export default function DeleteComment({ comment, accessToken, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const id = comment.id;
  const { id: postId } = useParams();
  const handleClick = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://blog-backend-production-e9b5.up.railway.app/api/posts/${parseInt(postId)}/${comment.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error in deleting comment");
      }
      onDelete(id);
      setIsOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Delete
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      toDelete="comment"
      error={error}
      handleClick={handleClick}
      loading={loading}
    />
  );
}
