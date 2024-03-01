"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompFaq = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SGridPadding_1 = require("../../base-components/grid-padding/styles/SGridPadding");
const SCompFaq_1 = require("./styles/SCompFaq");
const CompFaqItem_1 = require("./comp-faq-item/CompFaqItem");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const CompFaq = (props) => {
    const [activeId, setActiveId] = (0, react_1.useState)();
    const handleActiveFaq = (id) => () => {
        setActiveId(id === activeId ? "" : id);
    };
    const { faqItems } = (0, useCaisyUpdates_1.useCaisyUpdates)({ ...props });
    return ((0, jsx_runtime_1.jsx)(SCompFaq_1.SCompFaq, { children: (0, jsx_runtime_1.jsx)(SGridPadding_1.SGridPadding, { children: faqItems
                ? faqItems.map((faqItem) => faqItem?.__typename === "CompFaqItem" && ((0, jsx_runtime_1.jsx)(CompFaqItem_1.CompFaqItem, { item: faqItem, handleActiveFaq: handleActiveFaq, activeId: activeId }, faqItem?.id)))
                : null }) }));
};
exports.CompFaq = CompFaq;
