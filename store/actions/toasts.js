import { generateUUID } from "../../utils/helper";

export const SET_TOAST = "SET_TOAST";
export const REMOVE_TOAST = "REMOVE_TOAST";

export const removeToast = (id) => {
  return {
    type: REMOVE_TOAST,
    id,
  };
};

export const setToast = (toastType, msg, icon) => async (dispatch) => {
  const id = await generateUUID();
  dispatch({
    type: SET_TOAST,
    payload: { id, toastType, msg, icon },
  });

  setTimeout(() => dispatch(removeToast(id)), 5000);
};
