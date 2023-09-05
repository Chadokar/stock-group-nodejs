import axios from "axios";
import React, { useEffect, useState } from "react";
import "./profile.css";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Groups, setData } from "../redux/actions/Action";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../apicall/userData";
import { handleImage } from "../utility/handleImage";

function Profile() {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [error, setError] = useState();
  const [dialog, setDialog] = useState(false);
  const [dialogGroup, setDialogGroup] = useState(false);
  const [base64, setBase64] = useState();
  const [groupName, setGroupName] = useState("");
  const [image, setImage] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.UserReducers);

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      };
      const { data } = await axios.put(
        `/updates`,
        {
          email: email,
          lastname: lastname,
          firstname: firstname,
        },
        config
      );
      dispatch(setData(data));
    } catch (err) {
      console.log(err);
    }
  };

  const newGroupHandler = async (e) => {
    console.log(userInfo);
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
            groupImage: base64,
          },
          userId: userInfo._id,
        },
        config
      );
      console.log(data);
      dispatch(setData(data?.user));
      setDialogGroup(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="profile">
        <div className="profile-box">
          <div className="profile-img">
            <img
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              alt=""
            />
          </div>
          <div className="self-details">
            <h3>{userInfo?.email}</h3>
            <h2 className="name">
              {userInfo?.firstname + " " + userInfo?.lastname}
            </h2>
            <p className="sort-des">This is a sort description</p>
            <div className="group-btns">
              <button
                className="btn"
                onClick={() => {
                  // dispatch(Groups(userInfo.groupIds));
                  navigate("/group");
                }}
              >
                Group
              </button>
              <button
                className="btn"
                onClick={() => {
                  setDialogGroup(true);
                }}
              >
                Create Group
              </button>
            </div>
          </div>
          <h4 onClick={() => setDialog(true)} className="profile-edit btn">
            Edit
          </h4>
        </div>
      </section>
      <>
        <Dialog
          fullWidth={false}
          maxWidth="xl"
          open={dialogGroup}
          onClose={() => setDialogGroup(false)}
        >
          <form
            className="form"
            onSubmit={groupName && newGroupHandler}
            action=""
          >
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
              onChange={(e) => handleImage(e, setImage, setBase64)}
            />
            <button>Create group</button>
          </form>
        </Dialog>
        <Dialog
          fullWidth={false}
          maxWidth="xl"
          open={dialog}
          onClose={() => setDialog(false)}
        >
          <form className="form" onSubmit={submithandler} action="">
            <h2>Update</h2>
            <label htmlFor="email">Email </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="email error"></div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <div className="password error"></div>
            <label htmlFor="firstname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <div className="password error"></div>
            <button onClick={() => setDialog(false)}>Save</button>
          </form>
        </Dialog>
      </>
    </>
  );
}

export default Profile;
