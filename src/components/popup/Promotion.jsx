import { useGameContext } from "../../contexts/Context";
import { clearCandidates, makeNewMove } from "../../reducer/actions/move";
import { copyPosition } from "../../utils/helper";

const Promotion = ({ onClosePopup }) => {
  const options = ["q", "r", "b", "n"];

  const { gameState, dispatch } = useGameContext();
  const { promotionSquare } = gameState;

  if (!promotionSquare) return null;

  const color = promotionSquare.x === 7 ? "w" : "b";

  const getPromotionPosition = () => {
    const style = {};

    if (promotionSquare.x === 7) style.top = "calc(12.5%)";
    else style.bottom = "calc(12.5%)";

    if (promotionSquare.y <= 1) style.left = "0%";
    else if (promotionSquare.y >= 6) style.right = "0%";
    else style.left = `${12.5 * promotionSquare.y - 20}%`;

    return style;
  };

  const onClick = (option) => {
    const newPosition = copyPosition(
      gameState.position[gameState.position.length - 1]
    );

    newPosition[promotionSquare.rank][promotionSquare.file] = "";
    newPosition[promotionSquare.x][promotionSquare.y] = color + option;

    dispatch(clearCandidates());
    dispatch(makeNewMove({ newPosition }));
    onClosePopup();
  };

  return (
    <div
      className="min-h-[12.5%] bg-tileLight absolute border-8 border-orange-900 flex gap-5"
      style={getPromotionPosition()}
    >
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center justify-center bg-cover cursor-pointer size-[100px] hover:bg-tileDark"
          style={{
            backgroundImage: `url('/pieces/${color + option}.png')`,
          }}
          onClick={() => onClick(option)}
        />
      ))}
    </div>
  );
};

export default Promotion;
