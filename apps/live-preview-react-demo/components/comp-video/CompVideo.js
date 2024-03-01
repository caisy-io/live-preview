"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompVideo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const GridItem_1 = require("../../base-components/grid-item/GridItem");
const GridPadding_1 = require("../../base-components/grid-padding/GridPadding");
const Grid_1 = require("../../base-components/grid/Grid");
const Video_1 = require("../video/Video");
const SCompVideo_1 = require("./styles/SCompVideo");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const CompVideo = ({ ...props }) => {
    const { vimeoVideoId } = (0, useCaisyUpdates_1.useCaisyUpdates)({ ...props });
    if (!vimeoVideoId) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(GridPadding_1.GridPadding, { children: (0, jsx_runtime_1.jsx)(Grid_1.Grid, { children: (0, jsx_runtime_1.jsx)(GridItem_1.GridItem, { bronze: { start: 1, end: 4 }, silver: { start: 1, end: 12 }, children: (0, jsx_runtime_1.jsxs)(SCompVideo_1.SCompVideo, { children: [(0, jsx_runtime_1.jsx)(Video_1.Video, { id: props.id, inline: true, vimeoVideoId: vimeoVideoId }), props.children] }) }) }) }));
};
exports.CompVideo = CompVideo;
