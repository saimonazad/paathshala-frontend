import { combineReducers } from "redux";

import Common from "./Common";

import ProfileApp from "./ProfileApp";
import WallApp from "./WallApp";
import Comment from "./Comments";
import {
  basicInfoReducer,
  workInfoReducer,
  academicInfoReducer,
} from "./profileReducer";

import personalFeeds from "./personalFeed";

export default combineReducers({
  common: Common,
  profileApp: ProfileApp,
  wallApp: WallApp,
  comment: Comment,
  basic: basicInfoReducer,
  work: workInfoReducer,
  academic: academicInfoReducer,
  feeds: personalFeeds,
});
