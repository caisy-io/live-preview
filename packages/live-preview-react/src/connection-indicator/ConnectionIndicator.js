"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const IconDragHandle_1 = __importDefault(require("./IconDragHandle"));
const IconCaisy_1 = __importDefault(require("./IconCaisy"));
const useDraggableElement_1 = require("./useDraggableElement");
const DESCRIPTION_BY_STATE = {
    Disconnected: ((0, jsx_runtime_1.jsxs)("p", { children: ["You connection has timed, out, to continue restart the preivew in", " ", (0, jsx_runtime_1.jsx)("strong", { children: "caisy" })] })),
    Reconnecting: ((0, jsx_runtime_1.jsx)("p", { children: "Connected to the preview server, but there is no active caisy window to connect to" })),
};
const WIDTH_BY_STATE = {
    Connected: 221,
    Reconnecting: 293,
    Disconnected: 293,
};
const HEIGHT_BY_STATE = {
    Connected: 48,
    Reconnecting: 112,
    Disconnected: 112,
};
const ConnectionIndicator = () => {
    const [initialized, setInitialized] = (0, react_1.useState)(false);
    const [state, setState] = (0, react_1.useState)("Connected");
    const description = DESCRIPTION_BY_STATE[state];
    const componentRef = (0, react_1.useRef)(null);
    const dragHandleRef = (0, react_1.useRef)(null);
    (0, useDraggableElement_1.useDraggableElement)(componentRef, dragHandleRef);
    (0, react_1.useLayoutEffect)(() => {
        const observer = new MutationObserver(() => {
            if (!document.body.dataset["collaboration"])
                return;
            setState(document.body.dataset["collaboration"]);
        });
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["data-collaboration"],
        });
        return () => {
            observer.disconnect();
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (!initialized)
            return setInitialized(true);
        if (!componentRef.current)
            return;
        const oldHeight = componentRef.current.getBoundingClientRect().height;
        const newHeight = HEIGHT_BY_STATE[state];
        componentRef.current.style.width = `${WIDTH_BY_STATE[state]}px`;
        componentRef.current.style.height = `${HEIGHT_BY_STATE[state]}px`;
        componentRef.current.style.top = `${componentRef.current.offsetTop - (newHeight - oldHeight)}px`;
    }, [state]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "caisy-connection-indicator-container", children: (0, jsx_runtime_1.jsxs)("div", { ref: componentRef, className: "caisy-connection-indicator", children: [(0, jsx_runtime_1.jsxs)("div", { className: "caisy-connection-indicator-header", children: [(0, jsx_runtime_1.jsx)("div", { ref: dragHandleRef, className: "caisy-connection-indicator-icon-drag", children: (0, jsx_runtime_1.jsx)(IconDragHandle_1.default, {}) }), (0, jsx_runtime_1.jsxs)("div", { className: `caisy-connection-indicator-content --${state.toLowerCase()}`, children: [(0, jsx_runtime_1.jsx)(IconCaisy_1.default, {}), "Live Preview ", state] })] }), description && ((0, jsx_runtime_1.jsx)("div", { className: "caisy-connection-indicator-description", children: description }))] }) }));
};
exports.ConnectionIndicator = ConnectionIndicator;
