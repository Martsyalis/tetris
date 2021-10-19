import {
    buildGrid,
    renderPieceToGrid,
    moveDown,
    attachControls,
} from "../../gameLogic";
import { buildPiece } from "../../gameLogic/Piece";
import { useState, useLayoutEffect } from "react";
import { Square, Column } from "./GridElements";
const GRID_X_LENGTH = 12;
const GRID_Y_LENGTH = 20;
// useEffect docs: However, not all effects can be deferred. For example, a DOM mutation that is visible to the user must fire synchronously before the next paint so that the user does not perceive a visual inconsistency. (The distinction is conceptually similar to passive versus active event listeners.) For these types of effects, React provides one additional Hook called useLayoutEffect. It has the same signature as useEffect, and only differs in when it is fired.

const GameGrid = () => {
    const [grid, setGrid] = useState(buildGrid(GRID_X_LENGTH, GRID_Y_LENGTH));
    const [currentPiece, setCurrentPiece] = useState(buildPiece(grid));
    const [intervalId, setIntervalId] = useState("");
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
            <div style={{ display: "flex", justifyContent: "center" }}>
                <ul>
                    {grid.map((xs, gridX) => (
                        <Column key={gridX}>
                            {xs.map((color, gridY) => (
                                <Square
                                    key={gridY}
                                    color={
                                        currentPiece?.intercects([gridX, gridY])
                                            ? currentPiece.color
                                            : color
                                    }
                                />
                            ))}
                        </Column>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default GameGrid;
