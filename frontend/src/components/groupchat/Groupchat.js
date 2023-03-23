import { Dialog } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "./groupchat.css";

function Groupchat() {
  const [groupName, setGroupName] = useState("");
  const [text, setText] = useState("");
  const [isLiked, setIsliked] = useState(false);
  const [likes, setlikes] = useState();
  const [dialog, setDialog] = useState(false);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/g/group",
        {
          groupDetails: {
            groupName,
            groupAdmin: userInfo._id,
            groupMembers: [userInfo._id],
          },
          latestMessage: [Math.random().toString],
        },
        config
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/g/message",
        {
          groupId: "641b514be67237e368ef6570",
          messages: [
            {
              text,
              isLiked,
              senderId: userInfo._id,
            },
          ],
        },
        config
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={dialog}
        onClose={() => setDialog(false)}
      >
        <form className="form" onSubmit={submithandler} action="">
          <h2>Log in</h2>
          <label htmlFor="groupName">Group Name</label>
          <input
            type="groupName"
            name=""
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className="email error"></div>
          <button>Log up</button>
        </form>
      </Dialog>
      <div className="groupchat">
        <div className="group-list-container">
          <div className="group-list-box">
            <img
              className="chat-profile-img"
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              alt=""
            />
            <h3>Group 1</h3>
          </div>
        </div>
        <div className="chat-container">
          <div className="group-name">
            <h1>Group 1</h1>
            <button onClick={() => setDialog(true)}>+Group</button>
          </div>
          <div className="chatbox-container-scroll">
            <div className="chatbox-container">
              <div className="chatbox">
                <img
                  className="chat-profile-img"
                  src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  alt=""
                />
                <div className="textpart">
                  <div className="self-details-chat">
                    <h3 className="chat-name">Person 1</h3>
                    <p className="date-time">10 20-03-22</p>
                  </div>
                  <div className="text-box">
                    <p className="text">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Animi rem voluptates qui quia sed optio, autem error odit
                      similique beatae!
                    </p>
                    <img src="" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="textinput-container">
              <textarea
                name=""
                onChange={(e) => setText(e.target.value)}
                id=""
                rows="1"
              ></textarea>
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Groupchat;
