import GroupManager from "./GroupReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  GroupManager: GroupManager,
});

export default rootReducer;
