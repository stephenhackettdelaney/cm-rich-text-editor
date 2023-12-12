import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const Heading = () => {
    const [count, setCount] = useState(0);
    return (_jsxs("section", { children: [_jsx("h1", { children: "Count" }), _jsx("h2", { children: "Very cool watching" }), _jsx("h3", { children: count }), _jsx("button", { onClick: () => setCount(count + 1), children: "Add" }), _jsx("button", { onClick: () => setCount(count - 1), children: "Subtract" })] }));
};
export default Heading;
