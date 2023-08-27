const UserReducers = (state = null, action) => {
  switch (action.type) {
    case "DATA":
      const { data } = action.payload;
      return { ...data };
    default:
      return state; // Return the current state by default
  }
};

export default UserReducers;
