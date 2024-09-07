// Component displays specific pieces based on the current position

const Piece = ({ rank, file, piece }) => {
  const highlightMoves = () => {};

  const onDragStart = (e) => {
    const target = e.currentTarget;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
    setTimeout(() => {
      target.style.display = "none";
    }, 0);
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
      onClick={highlightMoves}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
};

export default Piece;
