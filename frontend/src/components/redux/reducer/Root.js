import GroupManager from "./GroupReducers";
import { combineReducers } from "redux";
import UserReducers from "./UserReducers";

const rootReducer = combineReducers({
  GroupManager,
  UserReducers,
});

export default rootReducer;
