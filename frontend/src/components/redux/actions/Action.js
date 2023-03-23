// const GroupManager = (state, action) => {
//   switch (action.type) {
//     case "GROUPNAVIGATOR":
//       const { token, groupIds } = action.payload;
//       const data = groupIds.filter(async (groupId) => {
//         try {
//           const config = {
//             headers: {
//               "Content-type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           };
//           const { data } = await axios.put(`/updates/${groupId}`, config);
//           console.log(data);
//           return data;
//         } catch (err) {
//           console.log(err);
//           setError(err);
//         }
//       });
//       console.log("data : ", data);
//       return data;
//   }
// };
