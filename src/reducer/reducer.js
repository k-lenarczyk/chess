// Reducer Logic for storing and determining the game state

import { ACTIONS, Status } from "../constants/global";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.NEW_MOVE:
      let { position, turn } = state;

      turn = turn === "w" ? "b" : "w";
      position = [...position, action.payload.newPosition];

      return {
        ...state,
        turn,
        position,
      };

    case ACTIONS.GENERATE_CANDIDATE_MOVES:
      return {
        ...state,
        candidateMoves: action.payload.candidateMoves,
      };

    case ACTIONS.CLEAR_CANDIDATE_MOVES:
      return {
        ...state,
        candidateMoves: [],
      };

    case ACTIONS.PROMOTION_OPEN:
      return {
        ...state,
        status: Status.promoting,
        promotionSquare: { ...action.payload },
      };

    case ACTIONS.PROMOTION_CLOSE:
      return {
        ...state,
        status: Status.ongoing,
        promotionSquare: null,
      };

    default:
      return state;
  }
};
