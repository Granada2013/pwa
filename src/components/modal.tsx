import React, { useEffect } from "react";

interface Props {
  closeModal: () => void;
  content: JSX.Element;
}

const ModalWindow = (props: Props) => {
  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", props.closeModal, { once: true });
    }, 300);
  }, []);

  return (
    <div className="modalWrapper">
      <div className="closeBtn" onClick={() => props.closeModal()}>
        X
      </div>
      <React.Fragment>{props.content}</React.Fragment>
    </div>
  );
};

export default ModalWindow;
