// Component displays specific pieces based on the current position

import arbiter from "../../arbiter/arbiter";
import { useGameContext } from "../../contexts/Context";
import { generateCandidateMoves } from "../../reducer/actions/move";

const Piece = ({ rank, file, piece }) => {
  const { gameState, dispatch } = useGameContext();
  const { turn, position } = gameState;
  const currentPosition = position[position.length - 1];
  const previousPosition = position[position.length - 2];

  const onClick = () => {
    if (turn === piece[0]) {
      const candidateMoves = arbiter.getValidMoves({
        position: currentPosition,
        prevPosition: previousPosition,
        piece,
        rank,
        file,
      });
      dispatch(generateCandidateMoves({ candidateMoves }));
    }
  };

  const onDragStart = (e) => {
    const target = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
    setTimeout(() => {
      target.style.display = "none";
    }, 0);

    if (turn === piece[0]) {
      const candidateMoves = arbiter.getValidMoves({
        position: currentPosition,
        prevPosition: previousPosition,
        piece,
        rank,
        file,
      });
      dispatch(generateCandidateMoves({ candidateMoves }));
    }
  };

  const onDragEnd = (e) => {
    const target = e.currentTarget;
    target.style.display = "block";
  };

  return (
    <div
      className={`w-[12.5%] h-[12.5%] absolute bg-cover`}
      style={{
        backgroundImage: `url('/pieces/${piece}.png')`,
        transform: `translate(calc(${file} * var(--tile-size)), calc(var(--tile-size) * (7 - ${rank})))`,
      }}
      draggable={true}
      onClick={onClick}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
};

export default Piece;
