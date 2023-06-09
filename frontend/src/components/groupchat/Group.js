import React, { useEffect, useRef, useState } from "react";

function Group(props) {
  const { setDialog, socket } = props;
  const groupId = "644e05cb5c2b44020163ea54";
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLiked, setIsliked] = useState(false);
  const [likes, setlikes] = useState();
  const messageRef = useRef();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [userId, setUserId] = React.useState("");

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        groupId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };

  useEffect(() => {
    if (userInfo) {
      const id = userInfo._id;
      setUserId(id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessage = [...messages, message];
        setMessages(newMessage);
      });
    }
    //eslint-disable-next-line
  });

  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        groupId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          groupId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="chat-container">
        <div className="group-name">
          <h1>Group 1</h1>
          <button onClick={() => setDialog(true)}>+Group</button>
        </div>
        <div className="chatbox-container-scroll">
          <div className="chatbox-container">
            {messages.map((message, i) => (
              <div key={message._id} className="chatbox">
                <img
                  className="chat-profile-img"
                  src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  alt=""
                />
                <div className="textpart">
                  <div className="self-details-chat">
                    <h3 className="chat-name">{message._id}</h3>
                    <p className="date-time">10 20-03-22</p>
                  </div>
                  <div className="text-box">
                    <p className="text">{message.message}</p>
                    <img src="" alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="textinput-container">
            <textarea
              name="message"
              placeholder="Say Something..."
              id=""
              rows="1"
              ref={messageRef}
            ></textarea>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Group;
