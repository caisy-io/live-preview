"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const CompFaq_1 = require("../comp-faq/CompFaq");
const CompHeroSlider_1 = require("../comp-hero-slider/CompHeroSlider");
const CompImageWithText_1 = require("../comp-image-with-text/CompImageWithText");
const CompPageHeader_1 = require("../comp-page-header/CompPageHeader");
const CompSectionHeader_1 = require("../comp-section-header/CompSectionHeader");
const CompTextBlock_1 = require("../comp-text-block/CompTextBlock");
const SPage_1 = require("./styles/SPage");
const CompVideo_1 = require("../comp-video/CompVideo");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const Page = (props) => {
    const { components } = (0, useCaisyUpdates_1.useCaisyUpdates)(props);
    return ((0, jsx_runtime_1.jsxs)(SPage_1.SPage, { children: [components &&
                components.map((component, index) => {
                    switch (true) {
                        case component?.__typename === "CompFaq":
                            return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: (0, jsx_runtime_1.jsx)(CompFaq_1.CompFaq, { ...component }) }, `pc-${index}`));
                        case component?.__typename === "CompImageWithText":
                            return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: (0, jsx_runtime_1.jsx)(CompImageWithText_1.CompImageWithText, { ...component }) }, `pc-${index}`));
                        case component?.__typename === "CompHeroSlider":
                            return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: (0, jsx_runtime_1.jsx)(CompHeroSlider_1.CompHeroSlider, { ...component }) }, `pc-${index}`));
                        case component?.__typename === "CompPageHeader":
                            return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: (0, jsx_runtime_1.jsx)(CompPageHeader_1.CompPageHeader, { ...component }) }, `pc-${index}`));
                        case component?.__typename === "CompTextBlock":
                            return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: (0, jsx_runtime_1.jsx)(CompTextBlock_1.CompTextBlock, { ...component }) }, `pc-${index}`));
                        case component?.__typename === "CompSectionHeader":
                            return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: (0, jsx_runtime_1.jsx)(CompSectionHeader_1.CompSectionHeader, { ...component }) }, `pc-${index}`));
                        case component?.__typename === "Video":
                            return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: (0, jsx_runtime_1.jsx)(CompVideo_1.CompVideo, { ...component }) }, `pc-${index}`));
                        default:
                            return null;
                    }
                }), props.children] }));
};
exports.Page = Page;
