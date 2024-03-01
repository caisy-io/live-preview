"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompTextBlock = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SCompTextBlock_1 = require("./styles/SCompTextBlock");
const RichText_1 = require("../../base-components/rich-text/RichText");
const GridPadding_1 = require("../../base-components/grid-padding/GridPadding");
const GridItem_1 = require("../../base-components/grid-item/GridItem");
const Grid_1 = require("../../base-components/grid/Grid");
const SCompImageWithTextButton_1 = require("../comp-image-with-text/styles/SCompImageWithTextButton");
const SCompTextBlockButtonWrapper_1 = require("./styles/SCompTextBlockButtonWrapper");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const getInspectProps_1 = require("@repo/live-preview-react/getInspectProps");
const Button_1 = require("../button/Button");
const CompTextBlock = (props) => {
    const { text, buttons } = (0, useCaisyUpdates_1.useCaisyUpdates)({ ...props });
    return ((0, jsx_runtime_1.jsx)(GridPadding_1.GridPadding, { children: (0, jsx_runtime_1.jsx)(Grid_1.Grid, { children: (0, jsx_runtime_1.jsxs)(GridItem_1.GridItem, { bronze: { start: 1, end: 4 }, silver: { start: 3, end: 8 }, children: [(0, jsx_runtime_1.jsx)(SCompTextBlock_1.SCompTextBlock, { ...(text?.json?.content &&
                            (0, getInspectProps_1.getInspectProps)({ id: props.id, fieldName: "text" })), children: text?.json?.content && ((0, jsx_runtime_1.jsx)(RichText_1.RichText, { content: text.json.content })) }), (0, jsx_runtime_1.jsx)(SCompTextBlockButtonWrapper_1.SCompTextBlockButtonWrapper, { ...(buttons &&
                            buttons.length >= 1 &&
                            (0, getInspectProps_1.getInspectProps)({ id: props.id, fieldName: "buttons" })), children: buttons.map((button, index) => {
                            const buttonStyle = button?.style;
                            return ((0, jsx_runtime_1.jsx)(SCompImageWithTextButton_1.SCompImageWithTextButton, { buttonStyle: buttonStyle, children: button && (0, jsx_runtime_1.jsx)(Button_1.Button, { ...button }) }, "button" + index + button.id));
                        }) })] }) }) }));
};
exports.CompTextBlock = CompTextBlock;
