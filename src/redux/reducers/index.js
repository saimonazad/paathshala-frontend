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
import personalCourses from "./personalCourses";
import getCourse from "./course";
import getAllUsers from "./explore";
import courseFeeds from "./courseFeeds";

export default combineReducers({
  common: Common,
  profileApp: ProfileApp,
  wallApp: WallApp,
  comment: Comment,
  basic: basicInfoReducer,
  work: workInfoReducer,
  academic: academicInfoReducer,
  feeds: personalFeeds,
  personalCourses: personalCourses,
  getCourse: getCourse,
  getAllUsers: getAllUsers,
  courseFeeds: courseFeeds,
});
