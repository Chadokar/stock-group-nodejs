import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./groupchat.css";
import Group from "./Group";
import { setData, setGroup } from "../redux/actions/Action";
import axios from "axios";

function Groupchat({ socket }) {
  const [currSocket, setCurrentSocket] = useState(socket);
  const [dialog, setDialog] = useState(false);
  const [dialogErr, setDialogErr] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const dispatch = useDispatch();
  const group = useSelector((state) => state.GroupManager?.group);
  // useEffect(() => {
  //   dispatch(Groups(userInfo.groupIds));
  //   console.log("hi");
  // }, []);

  useEffect(() => {
    setCurrentSocket(socket);
  }, [socket]);

  const userData = useSelector((state) => state.UserReducers);

  // const submithandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };
  //     const { data } = await axios.post(
  //       "/g/group",
  //       {
  //         groupDetails: {
  //           groupName,
  //           groupAdmin: userInfo._id,
  //           groupImage: base64,
  //         },
  //         userId: userInfo._id,
  //       },
  //       config
  //     );
  //     console.log(data);
  //     dispatch(setData(data.user));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const groupHandle = async (id) => {
    try {
      const { data } = await axios.get(`/g/group/${id}`);
      console.log(data);
      dispatch(setGroup(data));
    } catch (err) {
      console.log(err);
    }
  };
  const addMember = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/g/add-member/${group._id}`,
        {
          email: memberEmail,
        },
        config
      );
      console.log(data);
      dispatch(setData(data.user));
      dispatch(setGroup(data.group));
      setDialog(false);
    } catch (err) {
      console.log(err);
      setDialogErr(err?.response?.data?.error);
    }
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
        onClose={() => {
          setDialog(false);
          setDialogErr("");
        }}
      >
        <form className="form" onSubmit={addMember} action="">
          <h2>Add Member</h2>
          <label htmlFor="MemberEmail">Email</label>
          <input
            type="email"
            name=""
            value={memberEmail}
            onChange={(e) => {
              setMemberEmail(e.target.value);
              setDialogErr("");
            }}
          />
          <div className="email error">{dialogErr}</div>
          <button>Add</button>
        </form>
      </Dialog>
      <div className="groupchat">
        <div className="group-list-container">
          {userData?.groups?.map((group, i) => (
            <div
              className="group-list-box"
              onClick={() => groupHandle(group?.groupId)}
              key={group?._id}
            >
              <img
                className="chat-profile-img"
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt=""
              />
              <h3>{group?.groupName}</h3>
            </div>
          ))}
        </div>
        {group && <Group setDialog={setDialog} socket={currSocket} />}
      </div>
    </>
  );
}

export default Groupchat;
