export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const CLEAR_USER_PROFILE = "CLEAR_USER_PROFILE";
export const SET_USER_TAG = "SET_USER_TAG";
export const SET_USER_PHRASES = "SET_USER_PHRASES";
export const CLEANUP_USER_PHRASES = "CLEANUP_USER_PHRASES";

import { Auth } from "@aws-amplify/auth";

import {
  updateUserProfile,
  createUserProfile,
  getUserProfile,
  getPhrasesByUser,
  phrasesToObj,
} from "../../utils/helper";
import { fetchUserProfile, fetchPhrases } from "../actions/loading";
import { setToast } from "./toasts";

export const setUserProfile = (userProfile) => {
  return {
    type: SET_USER_PROFILE,
    payload: { userProfile },
  };
};

export const setUserPhrases = (userPhrases) => {
  return {
    type: SET_USER_PHRASES,
    payload: { userPhrases },
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

export const cleanupUserPhrases = () => {
  return {
    type: CLEANUP_USER_PHRASES,
  };
};

export const loadUserProfile = () => async (dispatch) => {
  try {
    dispatch(fetchUserProfile("REQUEST"));
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (cognitoUser) {
      const userId = cognitoUser.username;
      const email = cognitoUser.attributes.email;
      const userProfileRes = await getUserProfile({
        id: userId,
      });
      let userProfile = userProfileRes.data.getUserProfile;

      if (userProfile) {
        dispatch(setUserProfile(userProfile));
      } else {
        // create user profile (only on first time logging in)
        dispatch(handleCreateUserProfile({ userId, cognitoUser, email }));
      }
    }
    dispatch(fetchUserProfile("SUCCESS"));
  } catch (err) {
    dispatch(fetchUserProfile("FAIL"));
    console.log(err);
  }
};

export const handleLoadUserPhrases = ({ userId }) => async (dispatch) => {
  try {
    dispatch(fetchPhrases("REQUEST"));
    const userPhrasesRes = await getPhrasesByUser({ userId });
    userPhrasesArr = userPhrasesRes.data.phrasesByUser.items;
    const userPhrases = phrasesToObj(userPhrasesArr);
    dispatch(setUserPhrases(userPhrases));
    dispatch(fetchPhrases("SUCCESS"));
  } catch (err) {
    dispatch(fetchPhrases("FAIL"));
    console.log(err);
  }
};

export const handleCreateUserProfile = ({
  userId,
  cognitoUser,
  email,
}) => async (dispatch) => {
  const userAttributes = await Auth.userAttributes(cognitoUser);
  let userTag;
  for (let i = 0; i < userAttributes.length; i++) {
    if (userAttributes[i].Name === "preferred_username")
      userTag = userAttributes[i].Value;
  }
  const user = {
    id: userId,
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
  userId,
  currentUserTag,
  newUserTag,
}) => async (dispatch) => {
  dispatch(setUserTag(newUserTag));
  try {
    await updateUserProfile({ id: userId, userTag: currentUserTag });
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
