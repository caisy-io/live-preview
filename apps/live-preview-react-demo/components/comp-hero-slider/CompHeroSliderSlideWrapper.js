"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompHeroSliderSlideWrapper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const getInspectProps_1 = require("@repo/live-preview-react/getInspectProps");
const CompHeroSliderSlide_1 = require("./comp-hero-slider-slide/CompHeroSliderSlide");
const SCompHeroSliderPageIndicatorContainer_1 = require("./styles/SCompHeroSliderPageIndicatorContainer");
const SCompHeroSliderPageIndicatorLine_1 = require("./styles/SCompHeroSliderPageIndicatorLine");
const SCompHeroSliderPageIndicatorLineProgress_1 = require("./styles/SCompHeroSliderPageIndicatorLineProgress");
const SCompHeroSliderPageIndicatorTitle_1 = require("./styles/SCompHeroSliderPageIndicatorTitle");
const CompHeroSliderSlideWrapper = ({ transitionFromSlide, index, activeSlide, setTtransitionFromSlide, setActiveSlideManual, setActiveSlide, refActiveSlide, timePerSlide, slidesLength, ...props }) => {
    const slide = (0, useCaisyUpdates_1.useCaisyUpdates)({
        ...props,
    });
    return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(CompHeroSliderSlide_1.CompHeroSliderSlide, { ...slide, transitionFrom: transitionFromSlide === undefined
                    ? undefined
                    : index === transitionFromSlide, active: index === activeSlide }), (0, jsx_runtime_1.jsxs)(SCompHeroSliderPageIndicatorContainer_1.SCompHeroSliderPageIndicatorContainer, { index: index, active: index === activeSlide, onClick: () => {
                    if (slidesLength > 1) {
                        setTtransitionFromSlide(activeSlide);
                        setActiveSlide(index);
                        setActiveSlideManual(index);
                        refActiveSlide.current = index;
                    }
                }, children: [(0, jsx_runtime_1.jsx)(SCompHeroSliderPageIndicatorTitle_1.SCompHeroSliderPageIndicatorTitle, { ...(0, getInspectProps_1.getInspectProps)({ id: slide.id, fieldName: "headline" }), transitionFrom: index === transitionFromSlide, active: index === activeSlide, children: slide.headline && slide.headline }), (0, jsx_runtime_1.jsx)(SCompHeroSliderPageIndicatorLine_1.SCompHeroSliderPageIndicatorLine, { children: (0, jsx_runtime_1.jsx)(SCompHeroSliderPageIndicatorLineProgress_1.SCompHeroSliderPageIndicatorLineProgress, { active: index === activeSlide, timePerSlide: timePerSlide }) })] })] }));
};
exports.CompHeroSliderSlideWrapper = CompHeroSliderSlideWrapper;
