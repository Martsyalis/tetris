import { shapes, colors } from "./shapesAndColors";

const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = max => Math.floor(Math.random() * max);

export const buildPiece = grid => {
    const randomInt = getRandomInt(grid.length - 3);
    return {
        grid,
        color: getRandomItem(colors),
        coords: getRandomItem(shapes).map(([x, y]) => [x + randomInt, y]),
        intercects([gridX, gridY]) {
            return this.coords.some(([x, y]) => x === gridX && y === gridY);
        },
        obsticleBottom() {
            return this.coords.some(
                ([x, y]) => this.grid[x]?.[y + 1] !== "white"
            );
        },
        obsticleLeft() {
            return this.coords.some(
                ([x, y]) => this.grid[x - 1]?.[y] !== "white"
            );
        },
        obsticleRight() {
            return this.coords.some(
                ([x, y]) => this.grid[x + 1]?.[y] !== "white"
            );
        },
        checkGameOver() {
            return this.coords.some(([x, y]) => this.grid[x]?.[y] !== "white");
        },
    };
};
