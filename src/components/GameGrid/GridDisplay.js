import { Square, Column } from "./GridElements";

const GridDisplay = ({ grid, currentPiece }) => (
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
);

export default GridDisplay;
