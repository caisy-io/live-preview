"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaisyLivePreviewProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PreviewElement_1 = require("./PreviewElement");
const SPreviewElementWrapper_1 = require("./styles/SPreviewElementWrapper");
const CaisyLivePreviewProvider = ({ children }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(SPreviewElementWrapper_1.SPreviewElementWrapper, { children: (0, jsx_runtime_1.jsx)(PreviewElement_1.CaisyLivePreviewElement, {}) }), (0, jsx_runtime_1.jsx)("div", { children: children })] }));
};
exports.CaisyLivePreviewProvider = CaisyLivePreviewProvider;
