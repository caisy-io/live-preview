"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompHeroSlider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CompHeroSliderScrollDownButton_1 = require("./CompHeroSliderScrollDownButton");
const SCompHeroSlider_1 = require("./styles/SCompHeroSlider");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const CompHeroSliderSlideWrapper_1 = require("./CompHeroSliderSlideWrapper");
const CompHeroSlider = (props) => {
    const [activeSlideManual, setActiveSlideManual] = (0, react_1.useState)(0);
    const [activeSlide, setActiveSlide] = (0, react_1.useState)(0);
    const [transitionFromSlide, setTtransitionFromSlide] = (0, react_1.useState)(undefined);
    const intervalRef = (0, react_1.useRef)();
    const refActiveSlide = (0, react_1.useRef)();
    const timePerSlide = 5000;
    const { slides } = (0, useCaisyUpdates_1.useCaisyUpdates)({ ...props });
    (0, react_1.useEffect)(() => {
        if (slides && slides.length > 1) {
            intervalRef.current = setInterval(() => {
                if (slides && slides.length > 1) {
                    setTtransitionFromSlide(refActiveSlide.current || 0);
                    setActiveSlide((value) => {
                        return slides.length - 1 == value ? 0 : value + 1;
                    });
                    refActiveSlide.current =
                        slides.length - 1 == refActiveSlide.current
                            ? 0
                            : refActiveSlide.current + 1;
                }
            }, timePerSlide);
        }
        return () => {
            intervalRef.current && clearInterval(intervalRef.current);
        };
        // if we trigger a new slide by click we reset the interval
    }, [activeSlideManual]);
    return ((0, jsx_runtime_1.jsxs)(SCompHeroSlider_1.SCompHeroSlider, { children: [slides &&
                slides.map((slide, index) => {
                    return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: (0, jsx_runtime_1.jsx)(CompHeroSliderSlideWrapper_1.CompHeroSliderSlideWrapper, { transitionFromSlide: transitionFromSlide, index: index, activeSlide: activeSlide, setActiveSlide: setActiveSlide, setTtransitionFromSlide: setTtransitionFromSlide, setActiveSlideManual: setActiveSlideManual, refActiveSlide: refActiveSlide, timePerSlide: timePerSlide, slidesLength: slides ? slides.length : 0, ...slide }) }, slide.id));
                }), (0, jsx_runtime_1.jsx)(CompHeroSliderScrollDownButton_1.CompHeroSliderScrollDownButton, { onClick: () => {
                    if (typeof window !== "undefined") {
                        window.scrollTo({
                            top: window.innerHeight,
                            left: 0,
                            behavior: "smooth",
                        });
                    }
                } })] }));
};
exports.CompHeroSlider = CompHeroSlider;
