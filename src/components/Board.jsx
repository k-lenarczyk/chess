// A visual representation of the board.
// Displays the possible moves a player can make (To be added*)

import Files from "./bps/Files";
import Ranks from "./bps/Ranks";
import Pieces from "./pieces/Pieces";

const Board = () => {
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
              }`}
            ></div>
          ))
        )}
      </div>

      <Pieces />

      <Files files={files} />
    </main>
  );
};

export default Board;
