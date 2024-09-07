// Constants used throughout the game

import { createPosition } from "../utils/helper";

// Game Statuses
export const Status = {
  ongoing: "Ongoing",
  promoting: "Promoting",
  white: "White wins",
  black: "Black wins",
};

// Initialize a new game for the reducer
export const initGame = {
  position: [createPosition()],
  turn: "w",
  candidateMoves: [],
  status: Status.ongoing,
  promotionSquare: null,
};

// Reducer action types
export const ACTIONS = {
  NEW_MOVE: "new_move",
  GENERATE_CANDIDATE_MOVES: "generate_candidate_moves",
  CLEAR_CANDIDATE_MOVES: "clear_candidate_moves",
  PROMOTION_OPEN: "promotion_open",
  PROMOTION_CLOSE: "promotion_close",
};
