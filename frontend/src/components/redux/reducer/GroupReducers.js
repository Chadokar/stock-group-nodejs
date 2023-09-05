const GroupManager = (state = null, action) => {
  switch (action.type) {
    case "GROUP":
      const { group } = action.payload;
      return { group };
    default:
      return state; // Return the current state by default
  }
};

export default GroupManager;
