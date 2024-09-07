"use client";

import Board from "@/components/Board";
import GameContext from "../contexts/Context";
import { useReducer } from "react";
import { initGame } from "../constants/global";
import { reducer } from "../reducer/reducer";

const App = () => {
  const [gameState, dispatch] = useReducer(reducer, initGame);

  const providerState = { gameState, dispatch };

  return (
    <GameContext.Provider value={providerState}>
      <main className="h-screen w-screen flex items-center justify-center">
        <Board />
      </main>
    </GameContext.Provider>
  );
};

export default App;
