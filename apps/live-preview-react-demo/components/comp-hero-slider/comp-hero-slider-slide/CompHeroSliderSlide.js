"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompHeroSliderSlide = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RichText_1 = require("../../../base-components/rich-text/RichText");
const SCompHeroSliderSlide_1 = require("./styles/SCompHeroSliderSlide");
const SCompHeroSliderSlideHeadline_1 = require("./styles/SCompHeroSliderSlideHeadline");
const SCompHeroSliderSlideText_1 = require("./styles/SCompHeroSliderSlideText");
const SCompHeroSliderSlideTextContainer_1 = require("./styles/SCompHeroSliderSlideTextContainer");
const image_1 = __importDefault(require("next/legacy/image"));
const SCompHeroSliderSlideImage_1 = require("./styles/SCompHeroSliderSlideImage");
const SCompHeroSliderSlideBackdrop_1 = require("../styles/SCompHeroSliderSlideBackdrop");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const getInspectProps_1 = require("@repo/live-preview-react/getInspectProps");
const CompHeroSliderSlide = ({ headline, text, backgroundImage, active, transitionFrom, ...props }) => {
    const _imageForUpdates = backgroundImage?.find((image) => image?.__typename === "Asset");
    const _image = (0, useCaisyUpdates_1.useCaisyUpdates)(_imageForUpdates);
    return ((0, jsx_runtime_1.jsxs)(SCompHeroSliderSlide_1.SCompHeroSliderSlide, { active: active, transitionFrom: transitionFrom, children: [(0, jsx_runtime_1.jsx)(SCompHeroSliderSlideBackdrop_1.SCompHeroSliderSlideBackdrop, { children: " " }), (0, jsx_runtime_1.jsx)(SCompHeroSliderSlideImage_1.SCompHeroSliderSlideImage, { dominantColor: _image?.dominantColor ?? "#FFF", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: _image?.src ? ((0, jsx_runtime_1.jsx)(image_1.default, { layout: "responsive", src: _image?.src, width: typeof window != "undefined" ? window.innerWidth : 1920, height: typeof window != "undefined" ? window.innerHeight : 1080, alt: _image?.description })) : null }) }), (0, jsx_runtime_1.jsxs)(SCompHeroSliderSlideTextContainer_1.SCompHeroSliderSlideTextContainer, { children: [headline && ((0, jsx_runtime_1.jsx)(SCompHeroSliderSlideHeadline_1.SCompHeroSliderSlideHeadline, { ...(0, getInspectProps_1.getInspectProps)({ id: props.id, fieldName: "headline" }), children: headline })), (0, jsx_runtime_1.jsx)(SCompHeroSliderSlideText_1.SCompHeroSliderSlideText, { ...(0, getInspectProps_1.getInspectProps)({ id: props.id, fieldName: "text" }), children: text?.json?.content && ((0, jsx_runtime_1.jsx)(RichText_1.RichText, { content: text.json.content })) }), props.children] })] }));
};
exports.CompHeroSliderSlide = CompHeroSliderSlide;
