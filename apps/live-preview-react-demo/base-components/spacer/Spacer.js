"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SSpacer_1 = __importDefault(require("./Styles/SSpacer"));
const Spacer = (props) => {
    return (0, jsx_runtime_1.jsx)(SSpacer_1.default, { ...props, children: props.children });
};
exports.default = Spacer;
