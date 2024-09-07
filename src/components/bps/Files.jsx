// Files are the columns of the chess board
// Component displays the file characters (as part of the board positioning system BPS)

import { getCharacter } from "@/utils/helper";

const Files = ({ files }) => {
  return (
    <aside className="h-[calc(.25*var(--tile-size))] flex items-center justify-around text-tileDark col-start-2">
      {files.map((file) => (
        <span key={file}>{getCharacter(file)}</span>
      ))}
    </aside>
  );
};

export default Files;
