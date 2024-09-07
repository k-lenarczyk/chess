import { ACTIONS } from "../../constants/global";

export const openPromotion = ({ rank, file, x, y }) => {
  return {
    type: ACTIONS.PROMOTION_OPEN,
    payload: {
      rank,
      file,
      x,
      y,
    },
  };
};

export const closePopup = () => {
  return {
    type: ACTIONS.PROMOTION_CLOSE,
  };
};
