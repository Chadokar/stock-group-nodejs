import React, { useEffect, useRef, useState } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import { useSelector } from "react-redux";

function Group({ setDialog, socket }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [isLiked, setIsliked] = useState(false);
  const [likes, setlikes] = useState();
  const messageRef = useRef(null);
  const userInfo = useSelector((state) => state.UserReducers);
  const [userId, setUserId] = React.useState("");
  useAutosizeTextArea(messageRef?.current, message);

  const group = useSelector((state) => state.GroupManager?.group);

  useEffect(() => {
    if (socket) {
      console.log(socket);
      setTimeout(async () => {
        await socket.emit("joinRoom", {
          groupId: group?._id,
        });
        console.log("Joined room");
      }, 300);
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          groupId: group?._id,
        });
      }
    };
  }, [socket, group?._id]);

  const sendMessage = () => {
    messageRef.current.style.height = "24px";
    if (socket) {
      socket.emit("chatroomMessage", {
        groupId: group?._id,
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
      setTimeout(
        () =>
          socket.on("newMessage", (message) => {
            const newMessage = [...messages, message];
            setMessages(newMessage);
          }),
        300
      );
    }
  });

  const handleMessage = (e) => {
    const val = e.target.value;
    setMessage(val);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default action
      sendMessage(e);
    }
  };

  return (
    <>
      <div className="chat-container">
        <div className="group-name">
          <h1>{group?.groupDetails?.groupName || "Group Name"}</h1>
          {group && <button onClick={() => setDialog(true)}>+ Member</button>}
        </div>
        <div className="chatbox-container-scroll">
          <div className="chatbox-container">
            {messages.map((message, i) => (
              <div
                className={`chatbox-fx ${message.userId === userId && "me"}`}
                key={i}
              >
                <div className={`chatbox ${message.userId === userId && "me"}`}>
                  <img
                    className="chat-profile-img"
                    src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    alt=""
                  />
                  <div className="textpart">
                    <div className="self-details-chat">
                      <h3 className="chat-name">{message.userName}</h3>
                      <p className="date-time">10 20-03-22</p>
                    </div>
                    <div className="text-box">
                      <p className="text">{message.message}</p>
                      <img src="" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {group && (
            <div className="textinput-container">
              <textarea
                name="message"
                placeholder="Say Something..."
                id=""
                rows="1"
                onChange={handleMessage}
                onKeyPress={handleKey}
                ref={messageRef}
              ></textarea>
              <button onClick={sendMessage}>Send</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Group;
