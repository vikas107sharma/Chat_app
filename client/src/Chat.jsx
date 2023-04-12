import React, { useEffect, useState } from "react";
import Sender from "./Sender";
import Receiver from "./Receiver";
import Messagebox from "./Messagebox";

const Chat = ({ socket, room, username }) => {
  const [message, setMessage] = useState("");
  const [messageList, setmessageList] = useState([]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        message: message,
        room: room,
        author: username,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      await socket.emit("send_message", messageData);
      setmessageList((prev) => [...prev, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setmessageList((prev) => [...prev, data]);
    });
    return ()=> socket.off("receive_message");
  }, [socket]);

  return (
    <React.Fragment>
      <div className="chat_box">
        <div className="top_bar">
          <h1 className="logo">Chat App</h1>
        </div>

        <div className="message_area">
          {messageList.map((m, index) => {
            return (
              <div>
                {m.author === username ? (
                  <Sender m={m} key={index} />
                ) : (
                  <Receiver m={m} key={index} />
                )}
              </div>
            );
          })}
        </div>

        <Messagebox
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
    </React.Fragment>
  );
};

export default Chat;
