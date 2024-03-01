"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swiper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const swiper_1 = __importDefault(require("swiper"));
const react_2 = require("swiper/react");
const debounce_1 = require("../../utils/helpers/debounce");
const Swiper = ({ children, slides, plugins = [], ...props }) => {
    swiper_1.default.use(plugins);
    const resizeUpdate = react_1.default.useCallback((0, debounce_1.debounce)((swiper) => swiper.update(), 300), []);
    return ((0, jsx_runtime_1.jsxs)(react_2.Swiper, { ...props, onResize: (swiper) => {
            props.onResize?.(swiper);
            resizeUpdate(swiper);
        }, children: [children, slides?.map?.((slide, index) => ((0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: slide }, index)))] }));
};
exports.Swiper = Swiper;
