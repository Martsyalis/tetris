import { useState, useLayoutEffect } from "react";
import GridDisplay from "./GridDisplay.js";
import {
    buildGrid,
    renderPieceToGrid,
    moveDown,
    attachControls,
    scoreGrid,
} from "../../gameLogic";
import { buildPiece } from "../../gameLogic/Piece";
const GRID_X_LENGTH = 12;
const GRID_Y_LENGTH = 20;

const GameGrid = () => {
    const [grid, setGrid] = useState(buildGrid(GRID_X_LENGTH, GRID_Y_LENGTH));
    const [currentPiece, setCurrentPiece] = useState(buildPiece(grid));
    const [_, setIntervalId] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const clearFall = () => setIntervalId(clearInterval);

    const beginFall = () => {
        const temp = setInterval(() => {
            setCurrentPiece(moveDown);
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
        if (currentPiece.obsticleBottom()) {
            setGrid(oldGrid => {
                const newGrid = renderPieceToGrid(oldGrid, currentPiece);
                const scoredGrid = scoreGrid(newGrid, setScore);
                const newPiece = buildPiece(scoredGrid);
                if (newPiece.checkGameOver()) {
                    clearFall();
                    setGameOver(true);
                    return scoredGrid;
                }
                setCurrentPiece(newPiece);
                return scoredGrid;
            });
        }
    }, [currentPiece]);

    useLayoutEffect(() => {
        attachControls(setCurrentPiece, grid);
        handleNewPiece();
    }, []);

    return (
        <>
            <h1>Your Score: {score}</h1>
            {gameOver && <h1> YOU LOST!!!!! </h1>}
            <GridDisplay currentPiece={currentPiece} grid={grid} />
        </>
    );
};

export default GameGrid;
