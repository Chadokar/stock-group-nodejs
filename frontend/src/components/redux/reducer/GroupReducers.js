const GroupManager = (state, action) => {
  switch (action.type) {
    case "GROUP":
      const { token, groupIds } = action.payload;
      const data = groupIds.filter(async (groupId) => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.put(`/updates/${groupId}`, config);
          console.log(data);
          return data;
        } catch (err) {
          console.log(err);
        }
      });

      return { ...state, data: data };
    case "GROUPNAVIGATOR":
      const a = 0;
  }
};
