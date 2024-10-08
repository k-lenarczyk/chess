// A visual representation of the board.
// Displays the possible moves a player can make (To be added*)

import { useGameContext } from "../contexts/Context";
import Files from "./bps/Files";
import Ranks from "./bps/Ranks";
import Pieces from "./pieces/Pieces";
import Popup from "./popup/Popup";

const Board = () => {
  const { gameState } = useGameContext();
  const position = gameState.position[gameState.position.length - 1];

  const highlightMoves = (i, j) => {
    let className = "";

    if (
      gameState.candidateMoves?.find((move) => move[0] === i && move[1] === j)
    ) {
      if (position[i][j]) {
        className += " attacking";
      } else {
        className += " highlight";
      }
    }

    return className;
  };

  const ranks = Array(8)
    .fill("")
    .map((x, i) => 8 - i);

  const files = Array(8)
    .fill("")
    .map((x, i) => i + 1);

  return (
    <main className="relative grid grid-cols-[calc(.25*var(--tile-size)),calc(8*var(--tile-size))]">
      <Ranks ranks={ranks} />

      <div className="grid grid-cols-[repeat(8,var(--tile-size))] grid-rows-[repeat(8,var(--tile-size))] w-[calc(8*var(--tile-size))]">
        {ranks.map((rank, i) =>
          files.map((file, j) => (
            <div
              key={file + rank}
              className={`relative ${
                (i + j) % 2 === 0 ? "bg-tileLight" : "bg-tileDark"
              } ${highlightMoves(7 - i, j)}`}
            ></div>
          ))
        )}
      </div>

      <Pieces />

      <Popup />

      <Files files={files} />
    </main>
  );
};

export default Board;
