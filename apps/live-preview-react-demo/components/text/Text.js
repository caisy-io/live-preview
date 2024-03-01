"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SText_1 = require("./styles/SText");
const RichText_1 = require("../../base-components/rich-text/RichText");
const Text = ({ ...props }) => {
    if (!props.json?.content) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(SText_1.SText, { children: (0, jsx_runtime_1.jsx)(RichText_1.RichText, { content: props.json.content }) }));
};
exports.Text = Text;
