"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNotFound = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const universalText_1 = require("../../provider/universalText");
const Arrow_1 = require("../../constants/svgs/Arrow");
const CompHeroSliderSlide_1 = require("../comp-hero-slider/comp-hero-slider-slide/CompHeroSliderSlide");
const SCompImageWithTextButton_1 = require("../comp-image-with-text/styles/SCompImageWithTextButton");
const SCompImageWithTextButtonContent_1 = require("../comp-image-with-text/styles/SCompImageWithTextButtonContent");
const SCompTextBlockButtonWrapper_1 = require("../comp-text-block/styles/SCompTextBlockButtonWrapper");
const SPageNotFound_1 = require("./styles/SPageNotFound");
const PageNotFound = ({ ...props }) => {
    const universalText = (0, universalText_1.useUniversalText)();
    const buttons = universalText?.pageNotFoundButton;
    const pageNotFoundDescription = universalText?.pageNotFoundDescription;
    return ((0, jsx_runtime_1.jsxs)(SPageNotFound_1.SPageNotFound, { children: [(0, jsx_runtime_1.jsx)(CompHeroSliderSlide_1.CompHeroSliderSlide, { headline: "404", text: pageNotFoundDescription, backgroundImage: [universalText?.pageNotFoundBackgroundImage], active: true, children: (0, jsx_runtime_1.jsx)(SCompTextBlockButtonWrapper_1.SCompTextBlockButtonWrapper, { children: Array.isArray(buttons) &&
                        buttons?.map((button, index) => {
                            const buttonStyle = button?.style;
                            const linkIntern = button?.__typename === "CompButton" &&
                                button.link[0]?.__typename === "Page" &&
                                button?.link?.[0]?.slug
                                ? button?.link?.[0]?.slug
                                : "#noslugincaisy";
                            return ((0, jsx_runtime_1.jsx)(SCompImageWithTextButton_1.SCompImageWithTextButton, { buttonStyle: buttonStyle, children: button && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: button?.__typename === "CompButton" ? ((0, jsx_runtime_1.jsx)("a", { href: `/${linkIntern}`, children: (0, jsx_runtime_1.jsxs)(SCompImageWithTextButtonContent_1.SCompImageWithTextButtonContent, { children: [`${button.title}`, (0, jsx_runtime_1.jsx)(Arrow_1.Arrow, {})] }) })) : ((0, jsx_runtime_1.jsx)("a", { href: "https://" +
                                            `${button?.url}`.replace("https://", ""), target: "_blank", children: (0, jsx_runtime_1.jsxs)(SCompImageWithTextButtonContent_1.SCompImageWithTextButtonContent, { children: [`${button?.title}`, (0, jsx_runtime_1.jsx)(Arrow_1.Arrow, {})] }) })) })) }, "button" + index + button.id));
                        }) }) }), props.children] }));
};
exports.PageNotFound = PageNotFound;
