import axios from "axios";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const token = JSON.parse(localStorage.getItem("userToken"));

const GroupManager = (state = null, action) => {
  switch (action.type) {
    case "GROUP":
      const { groupIds } = action.payload;
      const data = groupIds.map(async (groupId) => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.get(`/g/group/${groupId}`, config);
          return data;
        } catch (err) {
          console.log(err);
        }
      });
      console.log({ ...state, data: data, currentgroup: "" });
      return { ...state, data: [...data], currentgroup: "" };

    case "GROUP_NAVIGATOR":
      const { groupId } = action.payload;
      const group = async (groupId) => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.get(`/g/group/${groupId}`, config);
          console.log(data);
          return data;
        } catch (err) {
          console.log(err);
        }
      };

      return {
        ...state,
        currentgroup: group(groupId),
      };

    case "CREATE_GROUP":
      const { groupName } = action.payload;
      const createGroup = async (groupName) => {
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
          return data;
        } catch (err) {
          console.log(err);
        }
      };
      const newgroup = createGroup(groupName);
      return {
        ...state,
        data: [...state.data, newgroup],
        currentgroup: newgroup,
      };
    default:
      return state;
  }
};

export default GroupManager;

// import axios from "axios";

// const userInfo = JSON.parse(localStorage.getItem("userInfo"));
// const token = JSON.parse(localStorage.getItem("userToken"));

// const GroupManager = (state = null, action) => {
//   switch (action.type) {
//     case "GROUP":
//       const { groupIds } = action.payload;
//       const fetchData = async () => {
//         const promises = groupIds.map(async (groupId) => {
//           try {
//             const config = {
//               headers: {
//                 "Content-type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             };
//             const { data } = await axios.get(`/g/group/${groupId}`, config);
//             return data;
//           } catch (err) {
//             console.log(err);
//           }
//         });
//         const results = await Promise.all(promises);
//         return results;
//       };
//       fetchData().then((data) => {
//         console.log({ ...state, data: data, currentgroup: "" });
//         return { ...state, data: data, currentgroup: "" };
//       });
//       // Return the current state until the promises are resolved
//       return state;

//     case "GROUP_NAVIGATOR":
//       const { groupId } = action.payload;
//       const fetchGroup = async () => {
//         try {
//           const config = {
//             headers: {
//               "Content-type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           };
//           const { data } = await axios.get(`/g/group/${groupId}`, config);
//           console.log(data);
//           return data;
//         } catch (err) {
//           console.log(err);
//         }
//       };
//       fetchGroup().then((data) => {
//         return {
//           ...state,
//           currentgroup: data,
//         };
//       });
//       // Return the current state until the promises are resolved
//       return state;

//     case "CREATE_GROUP":
//       const { groupName } = action.payload;
//       const createGroup = async () => {
//         try {
//           const config = {
//             headers: {
//               "Content-type": "application/json",
//             },
//           };
//           const { data } = await axios.post(
//             "/g/group",
//             {
//               groupDetails: {
//                 groupName,
//                 groupAdmin: userInfo._id,
//                 groupMembers: [userInfo._id],
//               },
//               latestMessage: [Math.random().toString],
//             },
//             config
//           );
//           return data;
//         } catch (err) {
//           console.log(err);
//         }
//       };
//       createGroup().then((newgroup) => {
//         return {
//           ...state,
//           data: [...state.data, newgroup],
//           currentgroup: newgroup,
//         };
//       });
//       // Return the current state until the promises are resolved
//       return state;

//     default:
//       return state;
//   }
// };

// export default GroupManager;
