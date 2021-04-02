import {
  SET_PHRASE_DATA,
  POST_PHRASE,
  REMOVE_PHRASE,
  TOGGLE_PHRASE_LIKE,
  TOGGLE_PHRASE_VISIBILITY,
  CLEANUP_PHRASES,
} from "../actions/phrases";
import { omit } from "../../utils/helper";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PHRASE_DATA: {
      const { phraseData } = action.payload;
      return { ...state, ...phraseData };
    }
    case POST_PHRASE: {
      const { phrase } = action.payload;
      return {
        ...state,
        myPhrases: {
          ...state.myPhrases,
          [phrase.id]: phrase,
        },
        recentPhrases: phrase.isPublic
          ? {
              [phrase.id]: phrase,
              ...state.recentPhrases,
            }
          : { ...state.recentPhrases },
      };
    }
    case REMOVE_PHRASE: {
      const { phraseId } = action.payload;
      return {
        ...state,
        myPhrases: omit(phraseId, state.myPhrases),
        topPhrases: omit(phraseId, state.topPhrases),
        recentPhrases: omit(phraseId, state.recentPhrases),
      };
    }
    case TOGGLE_PHRASE_LIKE: {
      const { phraseId, userId, hasLiked } = action.payload;
      let updatedTopPhrases;
      if (state.topPhrases.hasOwnProperty(phraseId)) {
        updatedTopPhrases = {
          ...state.topPhrases,
          [phraseId]: {
            ...state.topPhrases[phraseId],
            likes: hasLiked
              ? state.topPhrases[phraseId].likes.filter((id) => id !== userId)
              : state.topPhrases[phraseId].likes.concat([userId]),
          },
        };
      } else {
        updatedTopPhrases = { ...state.topPhrases };
      }

      let updatedRecentPhrases;
      if (state.recentPhrases.hasOwnProperty(phraseId)) {
        updatedRecentPhrases = {
          ...state.recentPhrases,
          [phraseId]: {
            ...state.recentPhrases[phraseId],
            likes: hasLiked
              ? state.recentPhrases[phraseId].likes.filter(
                  (id) => id !== userId
                )
              : state.recentPhrases[phraseId].likes.concat([userId]),
          },
        };
      } else {
        updatedRecentPhrases = { ...state.recentPhrases };
      }

      return {
        ...state,
        topPhrases: updatedTopPhrases,
        recentPhrases: updatedRecentPhrases,
      };
    }
    case TOGGLE_PHRASE_VISIBILITY: {
      const { phraseId } = action.payload;
      const updatedMyPhrases = { ...state.myPhrases };
      updatedMyPhrases[phraseId].isPublic = !updatedMyPhrases[phraseId]
        .isPublic;

      return {
        ...state,
        myPhrases: updatedMyPhrases,
      };
    }
    case CLEANUP_PHRASES: {
      return {};
    }

    default:
      return state;
  }
};
