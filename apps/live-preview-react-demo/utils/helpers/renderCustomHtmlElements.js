"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCustomHtmlElements = void 0;
const html_react_parser_1 = __importDefault(require("html-react-parser"));
const renderCustomHtmlElements = (html) => {
    try {
        return (0, html_react_parser_1.default)(html);
    }
    catch {
        return null;
    }
};
exports.renderCustomHtmlElements = renderCustomHtmlElements;
