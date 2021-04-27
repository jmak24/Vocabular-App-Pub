import {
  SET_PHRASE_DATA,
  POST_PHRASE,
  REMOVE_PHRASE,
  TOGGLE_PHRASE_LIKE,
  TOGGLE_PHRASE_VISIBILITY,
  CLEANUP_PHRASES,
} from "../actions/phrases";
import { omitProp } from "../../utils/helper";

initialState = { myPhrases: {}, topPhrases: {}, recentPhrases: {} };

export default (state = initialState, action) => {
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
      const updatedMyPhrases = omitProp(phraseId, state.myPhrases);
      const updatedTopPhrases = omitProp(phraseId, state.topPhrases);
      const udpatedRecentPhrases = omitProp(phraseId, state.recentPhrases);

      return {
        ...state,
        myPhrases: updatedMyPhrases,
        topPhrases: updatedTopPhrases,
        recentPhrases: udpatedRecentPhrases,
      };
    }
    case TOGGLE_PHRASE_LIKE: {
      const { phraseId, userId, hasLiked } = action.payload;
      let updatedTopPhrases;
      if (phraseId in state.topPhrases) {
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
      if (phraseId in state.recentPhrases) {
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
      let updatedMyPhrases = { ...state.myPhrases };
      if (phraseId in updatedMyPhrases) {
        updatedMyPhrases[phraseId].isPublic = !updatedMyPhrases[phraseId]
          .isPublic;
      }

      return {
        ...state,
        myPhrases: updatedMyPhrases,
      };
    }
    case CLEANUP_PHRASES: {
      return initialState;
    }

    default:
      return state;
  }
};
