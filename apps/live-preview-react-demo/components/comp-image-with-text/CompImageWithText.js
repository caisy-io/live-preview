"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompImageWithText = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const GridItem_1 = require("../../base-components/grid-item/GridItem");
const SGridPadding_1 = require("../../base-components/grid-padding/styles/SGridPadding");
const SGrid_1 = require("../../base-components/grid/styles/SGrid");
const Text_1 = require("../text/Text");
const SCompImageWithText_1 = require("./styles/SCompImageWithText");
const SCompImageWithTextButton_1 = require("./styles/SCompImageWithTextButton");
const SCompImageWithTextButtonWrapper_1 = require("./styles/SCompImageWithTextButtonWrapper");
const SCompImageWithTextComponentWrapper_1 = require("./styles/SCompImageWithTextComponentWrapper");
const SCompImageWithTextHeadline_1 = require("./styles/SCompImageWithTextHeadline");
const SCompImageWithTextImageSide_1 = require("./styles/SCompImageWithTextImageSide");
const SCompImageWithTextText_1 = require("./styles/SCompImageWithTextText");
const SCompImageWithTextTextSide_1 = require("./styles/SCompImageWithTextTextSide");
const SCompImageWithTextTitle_1 = require("./styles/SCompImageWithTextTitle");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const getInspectProps_1 = require("@repo/live-preview-react/getInspectProps");
const CompImageWithTextAsset_1 = require("./CompImageWithTextAsset");
const Button_1 = require("../button/Button");
const CompImageWithText = (props) => {
    const { imageRightInsteadOfLeft, text, buttons, strap, headline, asset, id } = (0, useCaisyUpdates_1.useCaisyUpdates)({ ...props });
    return ((0, jsx_runtime_1.jsx)(SCompImageWithText_1.SCompImageWithText, { children: (0, jsx_runtime_1.jsx)(SGridPadding_1.SGridPadding, { children: (0, jsx_runtime_1.jsx)(SGrid_1.SGrid, { children: (0, jsx_runtime_1.jsx)(GridItem_1.GridItem, { bronze: { start: 1, end: 4 }, silver: { start: 1, end: 12 }, gold: { start: 2, end: 11 }, children: (0, jsx_runtime_1.jsxs)(SCompImageWithTextComponentWrapper_1.SCompImageWithTextComponentWrapper, { imageRightInsteadOfLeft: !!imageRightInsteadOfLeft, children: [(0, jsx_runtime_1.jsx)(SCompImageWithTextImageSide_1.SCompImageWithTextImageSide, { ...(0, getInspectProps_1.getInspectProps)({
                                    id,
                                    fieldName: "asset",
                                }), children: asset && asset[0] && (0, jsx_runtime_1.jsx)(CompImageWithTextAsset_1.CompImageWithTextAsset, { ...asset[0] }) }), (0, jsx_runtime_1.jsxs)(SCompImageWithTextTextSide_1.SCompImageWithTextTextSide, { imageRightInsteadOfLeft: !!imageRightInsteadOfLeft, children: [(0, jsx_runtime_1.jsx)(SCompImageWithTextTitle_1.SCompImageWithTextTitle, { ...(0, getInspectProps_1.getInspectProps)({
                                            id,
                                            fieldName: "strap",
                                        }), children: strap && strap }), (0, jsx_runtime_1.jsx)(SCompImageWithTextHeadline_1.SCompImageWithTextHeadline, { ...(0, getInspectProps_1.getInspectProps)({
                                            id,
                                            fieldName: "headline",
                                        }), children: headline && headline }), (0, jsx_runtime_1.jsx)(SCompImageWithTextText_1.SCompImageWithTextText, { ...(0, getInspectProps_1.getInspectProps)({
                                            id,
                                            fieldName: "text",
                                        }), children: text?.json && (0, jsx_runtime_1.jsx)(Text_1.Text, { json: text?.json }) }), (0, jsx_runtime_1.jsx)(SCompImageWithTextButtonWrapper_1.SCompImageWithTextButtonWrapper, { ...(buttons &&
                                            buttons.length >= 1 &&
                                            (0, getInspectProps_1.getInspectProps)({ id, fieldName: "buttons" })), children: buttons?.map((button, index) => {
                                            const buttonStyle = button?.style;
                                            return ((0, jsx_runtime_1.jsx)(SCompImageWithTextButton_1.SCompImageWithTextButton, { buttonStyle: buttonStyle, children: button && (0, jsx_runtime_1.jsx)(Button_1.Button, { ...button }) }, "button" + index + button.id));
                                        }) })] })] }) }) }) }) }));
};
exports.CompImageWithText = CompImageWithText;
