import * as Dialog from "@radix-ui/react-dialog";
import styles from "./dailog.module.css";

const CloseIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M17.25 6.75L6.75 17.25"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M6.75 6.75L17.25 17.25"
    />
  </svg>
);

export const ModalDialog = ({ trigger, ...props }) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.backdrop} />
        <Dialog.Content className={styles.dialog}>
          {props.children}
          <Dialog.Close asChild>
            <button className={styles.close} aria-label="Close">
              <CloseIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const DialogFooter = ({ children }) => {
  return <div className={styles.footer}>{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return <div className={styles.header}>{children}</div>;
};

export const DialogContent = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};
