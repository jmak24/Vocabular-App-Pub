export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const CLEAR_USER_PROFILE = "CLEAR_USER_PROFILE";
export const SET_USER_TAG = "SET_USER_TAG";

import { Auth } from "@aws-amplify/auth";

import {
  updateUserProfile,
  createUserProfile,
  getUserProfile,
  phrasesToObj,
} from "../../utils/helper";
import { fetchUserProfile } from "../actions/loading";
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

export const loadUserProfile = ({ withPhrases }) => async (dispatch) => {
  try {
    dispatch(fetchUserProfile("REQUEST"));
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (cognitoUser) {
      const userId = cognitoUser.username;
      const email = cognitoUser.attributes.email;
      const userProfileRes = await getUserProfile({
        id: userId,
        withPhrases,
      });
      let userProfile = userProfileRes.data.getUserProfile;

      if (userProfile) {
        if (userProfile.hasOwnProperty("phrases")) {
          const myPhrasesArr = userProfile.phrases.items;
          userProfile.phrases = phrasesToObj(myPhrasesArr);
        }
        dispatch(setUserProfile(userProfile));
      } else {
        // create user profile (only on first time logging in)
        dispatch(handleCreateUserProfile({ id: userId, cognitoUser, email }));
      }
    }
    dispatch(fetchUserProfile("SUCCESS"));
  } catch (err) {
    dispatch(fetchUserProfile("FAIL"));
    console.log(err);
  }
};

export const handleCreateUserProfile = ({ id, cognitoUser, email }) => async (
  dispatch
) => {
  const userAttributes = await Auth.userAttributes(cognitoUser);
  let userTag;
  for (let i = 0; i < userAttributes.length; i++) {
    if (userAttributes[i].Name === "preferred_username")
      userTag = userAttributes[i].Value;
  }
  const user = {
    id,
    email,
    userTag,
    wordsBookmarked: JSON.stringify([]),
    wordsArchived: JSON.stringify({}),
  };
  const userProfile = await createUserProfile({ user });
  console.log(userProfile);
  dispatch(setUserProfile(userProfile));
  console.log("New user profile created in Amplify");
};

export const handleUpdateUserTag = ({
  id,
  currentUserTag,
  newUserTag,
}) => async (dispatch) => {
  dispatch(setUserTag(newUserTag));
  try {
    await updateUserProfile({ id, userTag: currentUserTag });
    dispatch(setToast("toastInfo", "Username changed", "ios-checkmark-circle"));
  } catch (err) {
    dispatch(setUserTag(currentUserTag));
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
