import React from "react";

const CommentModel = ({ id }) => {
  return (
    <div className="comment__model">
      <div>
        <div className="header">
          <h4>Comment Post</h4>
          <i className="toolbar__actionIcon icon material-icons close__icon">
            close
          </i>
        </div>
        <div className="form">
          <textarea placeholder="Type Something" />
          <button>Comment</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModel;
