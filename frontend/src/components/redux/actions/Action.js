export const Groups = (groupIds) => {
  return {
    type: "GROUP",
    payload: {
      groupIds: groupIds,
    },
  };
};

export const groupsNavigator = (groupId) => {
  return {
    type: "GROUP_NAVIGATOR",
    payload: {
      groupId: groupId,
    },
  };
};

export const createGroup = (groupName) => {
  return {
    type: "CREATE_GROUP",
    payload: {
      groupName: groupName,
    },
  };
};

export const setData = (data) => {
  return {
    type: "DATA",
    payload: { data: data },
  };
};
