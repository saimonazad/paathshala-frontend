import { combineReducers } from "redux";
import {
  allFeedsReducer,
  createFeedReducer,
  allPersonalFeedsReducer,
} from "./feedReducers";
import {
  basicInfoReducer,
  workInfoReducer,
  academicInfoReducer,
} from "./profileReducer";
import { createCommentReducer } from "./commentRedcer";

//combine reducers
const reducer = combineReducers({
  allFeeds: allFeedsReducer,
  allPersonalFeeds: allPersonalFeedsReducer,
  createFeed: createFeedReducer,
  basic: basicInfoReducer,
  work: workInfoReducer,
  academic: academicInfoReducer,
  createComment: createCommentReducer,
});

export default reducer;
