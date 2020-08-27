import { SET_TOAST, REMOVE_TOAST } from "../actions/toasts";

const initialState = [{ state: "inactive" }, { state: "inactive" }];

export default (state = initialState, action) => {
  let updatedToasts;

  switch (action.type) {
    case SET_TOAST:
      updatedToasts = [...state];
      const activeToast = {
        ...action.payload,
        state: "active-slide-up",
      };

      let activated = false;
      for (let i = 0; i < 2; i++) {
        if (updatedToasts[i].state.startsWith("active")) {
          updatedToasts[i].state = "inactive";
        } else {
          if (!activated) {
            updatedToasts[i] = activeToast;
            activated = true;
          }
        }
      }
      return [...updatedToasts];
    case REMOVE_TOAST:
      updatedToasts = [...state];
      updatedToasts.forEach((toast) => {
        if (toast.id === action.id && toast.state === "active-slide-up")
          toast.state = "inactive-slide-down";
      });
      return [...updatedToasts];
    default:
      return state;
  }
};
