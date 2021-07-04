import { GET_ALL_USERS_SUCCESS } from "../../../@jumbo/constants/ActionTypes";

const INIT_STATE = {
  users: [],
};

export default function getAllUsers(state = INIT_STATE, action) {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS: {
      return { ...state, users: action.payload };
    }

    default:
      return state;
  }
}
