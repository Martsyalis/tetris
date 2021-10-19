export const Square = ({ color }) => (
    <div
        style={{
            border: "1px solid black",
            padding: "10px",
            paddingBottom: "5px",
            paddingTop: "5px",
            backgroundColor: color,
            width: "20px",
            height: "20px",
        }}
    >
        {" "}
    </div>
);

export const Column = ({ children }) => (
    <div
        style={{
            display: "inline-block",
        }}
    >
        {children}
    </div>
);