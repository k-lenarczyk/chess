// Ranks are the rows of the chess board
// Component displays the rank numbers (as part of the board positioning system BPS)

const Ranks = ({ ranks }) => {
  return (
    <aside className="flex flex-col items-center justify-around text-tileDark">
      {ranks.map((rank) => (
        <span key={rank}>{rank}</span>
      ))}
    </aside>
  );
};

export default Ranks;
