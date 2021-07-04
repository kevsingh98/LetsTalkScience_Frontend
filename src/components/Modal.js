import React from "react";

export const Modal = ({ title, open, setOpen, children }) => {
  return (
    <div className="modal">
      <div className="modal__container"></div>
      <div className="modal__content">
        <div className="modal__content__container">
          <div className="modal__header">
            <h1>{title}</h1>
            <p onClick={(e) => setOpen()}>x</p>
          </div>

          <div className="main__content">{children}</div>
        </div>
      </div>
    </div>
  );
};
