import React, { JSX, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./MyMadal.module.scss";

interface MyModalProps {
  modalIsShown: boolean;
  children: React.ReactElement;
  setModalIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}
function MyModal({
  children,
  modalIsShown,
  setModalIsShown,
}: MyModalProps): JSX.Element {
  const backdropRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>): void {
    e.stopPropagation();
    if (
      backdropRef.current &&
      !backdropRef.current.contains(e.target as Element)
    ) {
      setModalIsShown(false);
    }
  }

  // block scroll while modal is shown
  useEffect(() => {
    if (modalIsShown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIsShown]);
  return ReactDOM.createPortal(
    <>
      {modalIsShown && (
        <div onClick={handleClickOutside} className={classes.modalBackDrop}>
          <div ref={backdropRef} className={classes.modalWrapper}>
            <div className={classes.modalBody}>{children}</div>
          </div>
        </div>
      )}
    </>,
    document.body,
  );
}

export default MyModal;
