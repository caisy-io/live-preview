"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaisyLivePreviewElement = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CaisyIcon_1 = require("./CaisyIcon");
const SPreviewElement_1 = require("./styles/SPreviewElement");
const CaisyLivePreviewElement = () => {
    (0, react_1.useEffect)(() => { }, []);
    return ((0, jsx_runtime_1.jsx)(SPreviewElement_1.SPreviewElement, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(CaisyIcon_1.CaisyIcon, {}) }) }));
};
exports.CaisyLivePreviewElement = CaisyLivePreviewElement;
