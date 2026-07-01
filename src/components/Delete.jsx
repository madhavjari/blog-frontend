import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  ModalDialog,
} from "./ModalDialog";
import styles from "./dailog.module.css";

export default function Delete({
  setIsOpen,
  isOpen,
  error,
  handleClick,
  loading,
  toDelete,
}) {
  return (
    <ModalDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <button
          className={
            toDelete === "post" ? styles.postDeleteBtn : styles.commentDeleteBtn
          }
        >
          Delete
        </button>
      }
    >
      <DialogHeader>Delete {toDelete}</DialogHeader>
      <DialogContent>
        {error && <p className={styles.errorText}>{error}</p>}
        Are you sure you want to delete this {toDelete}? There is no way to
        recover your {toDelete} once deleted
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
          {loading ? "Deleting…" : "Confirm"}
        </button>
      </DialogFooter>
    </ModalDialog>
  );
}
