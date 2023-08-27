import { Dialog } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Groups } from "../redux/actions/Action";
import "./groupchat.css";
import Group from "./Group";

function Groupchat({ socket }) {
  const [groupName, setGroupName] = useState("");
  const [dialog, setDialog] = useState(false);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [image, setImage] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [groups, setgroups] = useState([]);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(Groups(userInfo.groupIds));
  //   console.log("hi");
  // }, []);

  const [base64, setBase64] = useState();

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
            groupImage: base64,
          },
          userid: userInfo._id,
        },
        config
      );
      console.log(data);
      setgroups(data.group);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    setImage(e.target.files[0]);
    const base = await convertToBase64(e.target.files[0]);
    setBase64(base);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };
  //     const { data } = await axios.post(
  //       "/g/message",
  //       {
  //         groupId: "641cabfb24724e1923f28b93",
  //         messages: [
  //           {
  //             text,
  //             isLiked,
  //             senderId: userInfo._id,
  //           },
  //         ],
  //       },
  //       config
  //     );
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Dialog
        fullWidth={false}
        maxWidth="xl"
        open={dialog}
        onClose={() => setDialog(false)}
      >
        <form className="form" onSubmit={submithandler} action="">
          <h2>Create Group</h2>
          <label htmlFor="groupName">Group Name</label>
          <input
            type="groupName"
            name=""
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className="email error"></div>
          <label htmlFor="groupImage">Group Image</label>
          <input
            type="file"
            name=""
            id="groupImage"
            accept="image/*"
            onChange={handleImage}
          />
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
            <h1>Group 1</h1>
          </div>
        </div>
        <Group setDialog={setDialog} socket={socket} />
      </div>
    </>
  );
}

export default Groupchat;
