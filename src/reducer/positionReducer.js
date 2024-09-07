import { ACTIONS } from "@/constants/global.js";

export const reducer = (gameState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_POSITION:
      const turn = gameState.turn === "w" ? "b" : "w";
      return {
        positions: [...gameState.positions, action.newPosition],
        turn: turn,
      };
    default:
      return positions;
  }
};
