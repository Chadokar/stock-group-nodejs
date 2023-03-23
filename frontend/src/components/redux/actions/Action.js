export const GroupNavigater = (data, token) => {
  return {
    type: "GROUP",
    payload: {
      data: data,
      token: token,
    },
  };
};
