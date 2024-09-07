import { Status } from "../../constants/global";
import { useGameContext } from "../../contexts/Context";
import { closePopup } from "../../reducer/actions/popup";
import Promotion from "./Promotion";

const Popup = () => {
  const { gameState, dispatch } = useGameContext();

  if (gameState.status === Status.ongoing) return null;

  const onClosePopup = () => {
    dispatch(closePopup());
  };

  return (
    <div className="absolute top-0 right-0 bottom-[calc(.25*var(--tile-size))] left-[calc(.25*var(--tile-size))]">
      <Promotion onClosePopup={onClosePopup} />
    </div>
  );
};

export default Popup;
