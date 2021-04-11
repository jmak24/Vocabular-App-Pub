export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const CLEAR_USER_PROFILE = "CLEAR_USER_PROFILE";
export const SET_USER_TAG = "SET_USER_TAG";

import { Auth } from "@aws-amplify/auth";

import { updateUserTag } from "../../utils/helper";
import { setToast } from "./toasts";

export const setUserProfile = (userProfile) => {
  return {
    type: SET_USER_PROFILE,
    payload: { userProfile },
  };
};

export const clearUserProfile = () => {
  return {
    type: CLEAR_USER_PROFILE,
  };
};

export const setUserTag = (userTag) => {
  return {
    type: SET_USER_TAG,
    payload: { userTag },
  };
};

export const handleUpdateUserTag = ({ id, userTag }) => async (dispatch) => {
  try {
    await updateUserTag({ id, userTag });
    dispatch(setUserTag(userTag));
    dispatch(setToast("toastInfo", "Username changed", "ios-checkmark-circle"));
  } catch (err) {
    dispatch(
      setToast("toastError", "Error changing Username", "ios-close-circle")
    );
    console.log(err);
  }
};

export const handleLogOut = () => async (dispatch) => {
  try {
    await Auth.signOut();
    dispatch(clearUserProfile());
    dispatch(setToast("toastInfo", "Logged out", "ios-checkmark-circle"));
  } catch (err) {
    dispatch(setToast("toastError", "Error logging out", "ios-close-circle"));
  }
};
