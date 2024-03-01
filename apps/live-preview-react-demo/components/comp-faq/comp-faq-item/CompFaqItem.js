"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompFaqItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Dash_1 = require("../../../constants/svgs/Dash");
const Plus_1 = require("../../../constants/svgs/Plus");
const Text_1 = require("../../text/Text");
const SCompFaqItem_1 = require("./styles/SCompFaqItem");
const SCompFaqItemTitle_1 = require("./styles/SCompFaqItemTitle");
const SCompFaqItemContent_1 = require("./styles/SCompFaqItemContent");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const getInspectProps_1 = require("@repo/live-preview-react/getInspectProps");
const CompFaqItem = ({ handleActiveFaq, activeId, ...props }) => {
    const item = (0, useCaisyUpdates_1.useCaisyUpdates)({ ...props.item });
    const contentRef = (0, react_1.useRef)();
    return ((0, jsx_runtime_1.jsxs)(SCompFaqItem_1.SCompFaqItem, { children: [(0, jsx_runtime_1.jsxs)(SCompFaqItemTitle_1.SCompFaqItemTitle, { ...(0, getInspectProps_1.getInspectProps)({
                    id: props.item.id,
                    fieldName: "title",
                }), onClick: handleActiveFaq(item?.id), children: [(0, jsx_runtime_1.jsx)("p", { children: item?.title ?? "" }), item?.id === activeId ? (0, jsx_runtime_1.jsx)(Dash_1.Dash, {}) : (0, jsx_runtime_1.jsx)(Plus_1.Plus, {})] }), (0, jsx_runtime_1.jsx)(SCompFaqItemContent_1.SCompFaqItemContent, { ...(0, getInspectProps_1.getInspectProps)({
                    id: props.item.id,
                    fieldName: "description",
                }), ref: contentRef, isActive: activeId === item?.id, contentHeight: contentRef?.current?.scrollHeight, children: item?.description?.json && (0, jsx_runtime_1.jsx)(Text_1.Text, { json: item?.description?.json }) })] }));
};
exports.CompFaqItem = CompFaqItem;
