import React from "react";

const Receiver = ({ m }) => {
  return (
    <div className="received_message">
      <div className="r_message">
        <span className="author">{m.author}</span>
        <p>{m.message}</p>
        <div className="time">
          <span>{m.time}</span>
        </div>
      </div>
    </div>
  );
};

export default Receiver;
