import { combineReducers } from 'redux';

import Common from './Common';

import ProfileApp from './ProfileApp';
import WallApp from './WallApp';

export default combineReducers({
  common: Common,
  
  profileApp: ProfileApp,
  wallApp: WallApp,
});
