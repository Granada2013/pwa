import React, { useEffect } from "react";

interface Props {
  closeModal: () => void;
  content: JSX.Element;
}

const ModalWindow = (props: Props) => {
  useEffect(() => {
    setTimeout(() => {
      document.addEventListener(
        "click",
        () => {
          clearTimeout(timer);
          props.closeModal();
        },
        { once: true }
      );
    }, 300);

    const timer = setTimeout(() => {
      props.closeModal();
    }, 5000);
  }, [props]);

  return (
    <div className="modalWrapper">
      <strong className="closeBtn" onClick={() => props.closeModal()}>
        X
      </strong>
      <React.Fragment>{props.content}</React.Fragment>
    </div>
  );
};

export default ModalWindow;
