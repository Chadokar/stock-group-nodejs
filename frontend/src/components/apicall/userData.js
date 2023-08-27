import axios from "axios";
import { setData } from "../redux/actions/Action";

export async function fetchUserData(dispatch) {
  if (localStorage.getItem("userToken")) {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    };
    await axios
      .get(`/profile`, config)
      .then(({ data }) => {
        dispatch(setData(data));
      })
      .catch((err) => console.log(err));
  }
}
