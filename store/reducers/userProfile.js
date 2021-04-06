import { SET_USER_PROFILE, CLEAR_USER_PROFILE } from "../actions/userProfile";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      const { userProfile } = action.payload;
      return { ...state, ...userProfile };
    case CLEAR_USER_PROFILE:
      return {};
    default:
      return state;
  }
};
