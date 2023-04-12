import React from 'react'
import SendIcon from "@mui/icons-material/Send";

const Messagebox = ({message,sendMessage,setMessage}) => {
  return (
    <div className="message_box">
    <input
      type="text"
      placeholder="Message..."
      onKeyDown={(e) => {
        e.key === "Enter" && sendMessage();
      }}
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      value={message}
    />
    <button className="send_btn" onClick={sendMessage}>
      <SendIcon />
    </button>
  </div>
  )
}

export default Messagebox
