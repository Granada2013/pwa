import React from "react";

interface Props {
  closeModal: () => void;
  content: JSX.Element;
}

const ModalWindow = (props: Props) => {
  return (
    <div className="mask">
      <div className="modalWrapper">
        <div className="closeBtn" onClick={() => props.closeModal()}>
          X
        </div>
        <React.Fragment>{props.content}</React.Fragment>
      </div>
    </div>
  );
};

export default ModalWindow;
