// Overlay Board that displays and operates the chess pieces.

"use client";

import { useReducer, useRef } from "react";
import Piece from "./Piece";
import { copyPosition, createPosition } from "@/utils/helper";
import { reducer } from "../../reducer/positionReducer";
import { ACTIONS } from "@/constants/global.js";

const Pieces = () => {
  const boardRef = useRef(null);

  const initialPosition = createPosition();

  const [gameState, dispatch] = useReducer(reducer, {
    positions: [initialPosition],
    turn: "w",
  });
  let currentPosition = gameState.positions[gameState.positions.length - 1];

  const calculateCoords = (e) => {
    const { width, left, top } = boardRef.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);

    return { x, y };
  };

  const onDrop = (e) => {
    let newPosition = copyPosition(currentPosition);
    const { x, y } = calculateCoords(e);

    const [piece, rank, file] = e.dataTransfer.getData("text").split(",");

    // *** Temporary move-disabling system ***
    // if (
    //   gameState.turn !== piece[0] ||
    //   (rank === x.toString() && file === y.toString())
    // )
    //   return;

    newPosition[rank][file] = "";
    newPosition[x][y] = piece;

    dispatch({ type: ACTIONS.UPDATE_POSITION, newPosition: newPosition });
  };
  const onDragOver = (e) => e.preventDefault();

  return (
    <div
      ref={boardRef}
      className="absolute top-0 right-0 bottom-[calc(.25*var(--tile-size))] left-[calc(.25*var(--tile-size))]"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {currentPosition.map((r, rank) =>
        r.map((f, file) =>
          currentPosition[rank][file] ? (
            <Piece
              key={file + "-" + rank}
              rank={rank}
              file={file}
              piece={currentPosition[rank][file]}
            />
          ) : null
        )
      )}
    </div>
  );
};

export default Pieces;
