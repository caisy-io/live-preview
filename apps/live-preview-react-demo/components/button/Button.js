"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Arrow_1 = require("../../constants/svgs/Arrow");
const SCompImageWithTextButtonContent_1 = require("../comp-image-with-text/styles/SCompImageWithTextButtonContent");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const Button = (props) => {
    const button = (0, useCaisyUpdates_1.useCaisyUpdates)({ ...props });
    const link = (0, useCaisyUpdates_1.useCaisyUpdates)({ ...(button?.link?.[0] ?? null) });
    const linkIntern = link?.__typename === "Page" && link?.slug
        ? `/${link?.slug}`
        : "#noslugincaisy";
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: button?.__typename === "CompButton" ? ((0, jsx_runtime_1.jsx)("a", { href: `${linkIntern}`, children: (0, jsx_runtime_1.jsxs)(SCompImageWithTextButtonContent_1.SCompImageWithTextButtonContent, { children: [`${button.title}`, (0, jsx_runtime_1.jsx)(Arrow_1.Arrow, {})] }) })) : ((0, jsx_runtime_1.jsx)("a", { href: "https://" +
                `${button?.url}`.replace("https://", ""), target: "_blank", children: (0, jsx_runtime_1.jsxs)(SCompImageWithTextButtonContent_1.SCompImageWithTextButtonContent, { children: [`${button?.title}`, (0, jsx_runtime_1.jsx)(Arrow_1.Arrow, {})] }) })) }));
};
exports.Button = Button;
