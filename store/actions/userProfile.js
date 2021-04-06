export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const CLEAR_USER_PROFILE = "CLEAR_USER_PROFILE";

export const setUserProfile = (userProfile) => async (dispatch) => {
  dispatch({
    type: SET_USER_PROFILE,
    payload: { userProfile },
  });
};

export const clearUserProfile = () => async (dispatch) => {
  dispatch({
    type: CLEAR_USER_PROFILE,
  });
};
