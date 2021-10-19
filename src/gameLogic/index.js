// * => grid
export const buildGrid = (gridX, gridY) =>
    Array.from(Array(gridX), () => new Array(gridY).fill("white"));

// coords => fn
export const getMoveByDiff =
    ([xDiff, yDiff]) =>
    piece => ({
        ...piece,
        coords: piece.coords.map(([x, y]) => [x + xDiff, y + yDiff]),
    });

// Piece => Piece
export const moveDown = getMoveByDiff([0, +1]);
export const moveLeft = getMoveByDiff([-1, 0]);
export const moveRight = getMoveByDiff([1, 0]);

// (Grid, Piece) => Grid
export const renderPieceToGrid = (grid, piece) => {
    const newGrid = [...grid];
    piece.coords.forEach(coord => {
        newGrid[coord[0]][coord[1]] = piece.color;
    });
    return newGrid;
};

export const asyncWait = ms =>
    new Promise(resolve =>
        setTimeout(() => {
            resolve("done!");
        }, ms)
    );

export const attachControls = setCurrentPiece => {
    document.addEventListener("keydown", e => {
        switch (e.key) {
            case "d":
                setCurrentPiece(oldPiece =>
                    !oldPiece.obsticleRight() ? moveRight(oldPiece) : oldPiece
                );
                break;
            case "a":
                setCurrentPiece(oldPiece =>
                    !oldPiece.obsticleLeft() ? moveLeft(oldPiece) : oldPiece
                );
                break;
            case "s":
                setCurrentPiece(oldPiece =>
                    !oldPiece.obsticleBottom() ? moveDown(oldPiece) : oldPiece
                );
                break;
            default:
                console.log(e);
                return;
        }
    });
};
