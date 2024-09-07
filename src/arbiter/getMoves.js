export const getRookMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const allies = piece[0];
  const enemies = allies === "w" ? "b" : "w";

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  directions.forEach((direction) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * direction[0];
      const y = file + i * direction[1];

      if (position?.[x]?.[y] === undefined) {
        break;
      }

      if (position[x][y].startsWith(enemies)) {
        moves.push([x, y]);
        break;
      }

      if (position[x][y].startsWith(allies)) {
        break;
      }

      moves.push([x, y]);
    }
  });

  return moves;
};

export const getKnightMoves = ({ position, rank, file }) => {
  const moves = [];
  const enemies = position[rank][file].startsWith("w") ? "b" : "w";

  const candidates = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
  ];

  candidates.forEach((candidate) => {
    const tile = position?.[rank + candidate[0]]?.[file + candidate[1]];

    if (tile !== undefined && (tile.startsWith(enemies) || tile === "")) {
      moves.push([rank + candidate[0], file + candidate[1]]);
    }
  });
  return moves;
};

export const getBishopMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const allies = piece[0];
  const enemies = allies === "w" ? "b" : "w";

  const directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  directions.forEach((direction) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * direction[0];
      const y = file + i * direction[1];

      if (position?.[x]?.[y] === undefined) {
        break;
      }

      if (position[x][y].startsWith(enemies)) {
        moves.push([x, y]);
        break;
      }

      if (position[x][y].startsWith(allies)) {
        break;
      }

      moves.push([x, y]);
    }
  });

  return moves;
};

export const getQueenMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const allies = piece[0];
  const enemies = allies === "w" ? "b" : "w";

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  directions.forEach((direction) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * direction[0];
      const y = file + i * direction[1];

      if (position?.[x]?.[y] === undefined) {
        break;
      }

      if (position[x][y].startsWith(enemies)) {
        moves.push([x, y]);
        break;
      }

      if (position[x][y].startsWith(allies)) {
        break;
      }

      moves.push([x, y]);
    }
  });

  return moves;
};

export const getKingMoves = ({ position, rank, file }) => {
  const moves = [];
  const enemies = position[rank][file].startsWith("w") ? "b" : "w";

  const candidates = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  candidates.forEach((candidate) => {
    const tile = position?.[rank + candidate[0]]?.[file + candidate[1]];

    if (tile !== undefined && (tile.startsWith(enemies) || tile === "")) {
      moves.push([rank + candidate[0], file + candidate[1]]);
    }
  });

  return moves;
};

export const getPawnMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const dir = piece === "wp" ? 1 : -1;

  // Move by 1
  if (!position?.[rank + dir][file]) {
    moves.push([rank + dir, file]);
  }

  // Move by 2
  if (rank % 5 === 1) {
    if (
      position?.[rank + dir]?.[file] === "" &&
      position?.[rank + 2 * dir]?.[file] === ""
    ) {
      moves.push([rank + 2 * dir, file]);
    }
  }

  return moves;
};

export const getPawnCaptures = ({
  position,
  prevPosition,
  piece,
  rank,
  file,
}) => {
  const moves = [];
  const dir = piece === "wp" ? 1 : -1;
  const enemies = piece[0] === "w" ? "b" : "w";

  // Regular Capture
  if (
    position?.[rank + dir]?.[file - 1] &&
    position?.[rank + dir]?.[file - 1].startsWith(enemies)
  ) {
    moves.push([rank + dir, file - 1]);
  }

  if (
    position?.[rank + dir]?.[file + 1] &&
    position?.[rank + dir]?.[file + 1].startsWith(enemies)
  ) {
    moves.push([rank + dir, file + 1]);
  }

  // En Passant
  const enemyPawn = dir === 1 ? "bp" : "wp";
  const adjacentFiles = [file - 1, file + 1];

  if (prevPosition) {
    if ((dir === 1 && rank === 4) || (dir === -1 && rank === 3)) {
      adjacentFiles.forEach((f) => {
        if (
          position?.[rank]?.[f] === enemyPawn &&
          position?.[rank + 2 * dir]?.[f] === "" &&
          prevPosition?.[rank]?.[f] === "" &&
          prevPosition?.[rank + 2 * dir]?.[f] === enemyPawn
        ) {
          moves.push([rank + dir, f]);
        }
      });
    }
  }

  return moves;
};
