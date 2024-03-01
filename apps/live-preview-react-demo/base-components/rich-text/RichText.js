"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const rich_text_react_renderer_1 = require("@caisy/rich-text-react-renderer");
const RichText = ({ content }) => {
    if (!content) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(rich_text_react_renderer_1.RichTextRenderer, { node: { type: "doc", content } }) }));
};
exports.RichText = RichText;
