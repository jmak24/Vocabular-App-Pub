import {
  SET_USER_PROFILE,
  CLEAR_USER_PROFILE,
  SET_USER_TAG,
  SET_USER_PHRASES,
  CLEANUP_USER_PHRASES,
} from "../actions/userProfile";
import { TOGGLE_PHRASE_VISIBILITY, REMOVE_PHRASE } from "../actions/phrases";
import { omitProp } from "../../utils/helper";

export default (state = null, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      const { userProfile } = action.payload;
      return { ...state, ...userProfile };
    case CLEAR_USER_PROFILE:
      return {};
    case SET_USER_TAG:
      const { userTag } = action.payload;
      return { ...state, userTag };
    case SET_USER_PHRASES:
      const { userPhrases } = action.payload;
      return { ...state, phrases: userPhrases };
    case TOGGLE_PHRASE_VISIBILITY: {
      const { phraseId } = action.payload;
      let updatedPhrases = { ...state.phrases };
      if (phraseId in updatedPhrases) {
        updatedPhrases[phraseId].isPublic = !updatedPhrases[phraseId].isPublic;
      }
      return {
        ...state,
        phrases: updatedPhrases,
      };
    }
    case REMOVE_PHRASE: {
      const { phraseId } = action.payload;
      const updatedPhrases = omitProp(phraseId, state.phrases);
      return {
        ...state,
        phrases: updatedPhrases,
      };
    }
    case CLEANUP_USER_PHRASES: {
      return {
        ...state,
        phrases: null,
      };
    }
    default:
      return state;
  }
};
