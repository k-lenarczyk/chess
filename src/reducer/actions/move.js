import { ACTIONS } from "../../constants/global";

export const makeNewMove = ({ newPosition }) => {
  return {
    type: ACTIONS.NEW_MOVE,
    payload: {
      newPosition,
    },
  };
};

export const generateCandidateMoves = ({ candidateMoves }) => {
  return {
    type: ACTIONS.GENERATE_CANDIDATE_MOVES,
    payload: {
      candidateMoves,
    },
  };
};

export const clearCandidates = () => {
  return {
    type: ACTIONS.CLEAR_CANDIDATE_MOVES,
  };
};
