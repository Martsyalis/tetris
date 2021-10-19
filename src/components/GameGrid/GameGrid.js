import { useState, useLayoutEffect } from "react";
import GridDisplay from "./GridDisplay.js";
import {
    buildGrid,
    renderPieceToGrid,
    moveDown,
    attachControls,
} from "../../gameLogic";
import { buildPiece } from "../../gameLogic/Piece";
const GRID_X_LENGTH = 12;
const GRID_Y_LENGTH = 20;

const GameGrid = () => {
    const [grid, setGrid] = useState(buildGrid(GRID_X_LENGTH, GRID_Y_LENGTH));
    const [currentPiece, setCurrentPiece] = useState(buildPiece(grid));
    const [_, setIntervalId] = useState("");
    const [gameOver, setGameOver] = useState(false);

    const clearFall = () => setIntervalId(clearInterval);

    const beginFall = () => {
        const temp = setInterval(() => {
            setIntervalId(() => temp);
            setCurrentPiece(oldPiece => {
                if (oldPiece.obsticleBottom()) {
                    setGrid(renderPieceToGrid(grid, oldPiece));
                    clearFall();
                    handleNewPiece();
                    return oldPiece;
                }
                return moveDown(oldPiece);
            });
        }, 500);
        setIntervalId(temp);
    };

    const handleNewPiece = () => {
        setCurrentPiece(oldPiece => {
            const newPiece = buildPiece(grid);
            if (newPiece.checkGameOver()) {
                clearFall();
                setGameOver(true);
                return oldPiece;
            } else {
                beginFall();
                return newPiece;
            }
        });
    };

    useLayoutEffect(() => {
        attachControls(setCurrentPiece, grid);
        handleNewPiece();
    }, []);

    return (
        <>
            {gameOver && <div> YOU LOST!!!!! </div>}
            <GridDisplay currentPiece={currentPiece} grid={grid} />
        </>
    );
};

export default GameGrid;
