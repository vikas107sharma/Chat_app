import React from "react";

const Sender = ({m}) => {
  return (
    <div className="sender_message">
      <div className="s_message">
      <span className="author">{m.author}</span>
        <p>{m.message}</p>
        <div className="time">
          <span>{m.time}</span>
        </div>
      </div>
    </div>
  );
};

export default Sender;
