// Overlay Board that displays and operates the chess pieces.

"use client";

import { useRef } from "react";
import Piece from "./Piece";
import { copyPosition } from "@/utils/helper";
import { useGameContext } from "../../contexts/Context";
import { clearCandidates, makeNewMove } from "../../reducer/actions/move";
import arbiter from "../../arbiter/arbiter";
import { openPromotion } from "../../reducer/actions/popup";

const Pieces = () => {
  const boardRef = useRef(null);

  const { gameState, dispatch } = useGameContext();

  const currentPosition = gameState.position[gameState.position.length - 1];

  const calculateCoords = (e) => {
    const { width, left, top } = boardRef.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);

    return { x, y };
  };

  const openPromotionBox = ({ rank, file, x, y }) => {
    dispatch(openPromotion({ rank: Number(rank), file: Number(file), x, y }));
  };

  const move = (e) => {
    const { x, y } = calculateCoords(e);
    const [piece, rank, file] = e.dataTransfer.getData("text").split(",");

    if (
      gameState.candidateMoves?.find((move) => move[0] === x && move[1] === y)
    ) {
      if ((piece === "wp" && x === 7) || (piece === "bp" && x === 0)) {
        openPromotionBox({ rank, file, x, y });
        return;
      }
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank,
        file,
        x,
        y,
      });

      dispatch(makeNewMove({ newPosition }));
    }

    dispatch(clearCandidates());
  };

  const onDrop = (e) => {
    e.preventDefault();
    move(e);
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
