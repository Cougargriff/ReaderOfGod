import { combineReducers } from "redux";
import ChapterReducer from "./ChapterReducer";

const RootReducer = combineReducers({
  ChapterReducer,
});

export default RootReducer;
