"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompPageHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SCompPageHeader_1 = require("./styles/SCompPageHeader");
const SCompPageHeaderBg_1 = require("./styles/SCompPageHeaderBg");
const SCompPageHeaderHeadline_1 = require("./styles/SCompPageHeaderHeadline");
const ImageWithAspectRatio_1 = __importDefault(require("../../base-components/image-with-aspect-ratio/ImageWithAspectRatio"));
const mediaquerys_1 = require("../../constants/styles/mediaquerys");
const useImageMedia_1 = __importDefault(require("../../hooks/useImageMedia"));
const GridItem_1 = require("../../base-components/grid-item/GridItem");
const GridPadding_1 = require("../../base-components/grid-padding/GridPadding");
const Grid_1 = require("../../base-components/grid/Grid");
const SCompPageHeaderHeadlineWrapper_1 = require("./styles/SCompPageHeaderHeadlineWrapper");
const Video_1 = require("../video/Video");
const SCompPageHeaderBackdropShadow_1 = require("./styles/SCompPageHeaderBackdropShadow");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const getInspectProps_1 = require("@repo/live-preview-react/getInspectProps");
const CompPageHeader = (props) => {
    const { backgroundImage, backgroundVideo, headline, id } = (0, useCaisyUpdates_1.useCaisyUpdates)({
        ...props,
    });
    const media = (0, useImageMedia_1.default)();
    const _imageForUpdates = backgroundImage?.find((image) => image?.__typename === "Asset");
    const _image = (0, useCaisyUpdates_1.useCaisyUpdates)(_imageForUpdates);
    const _video = (0, useCaisyUpdates_1.useCaisyUpdates)(backgroundVideo);
    return ((0, jsx_runtime_1.jsxs)(SCompPageHeader_1.SCompPageHeader, { id: id, isBackgroundImage: !!_image?.src, children: [(0, jsx_runtime_1.jsx)(SCompPageHeaderBackdropShadow_1.SCompPageHeaderBackdropShadow, {}), _video ? ((0, jsx_runtime_1.jsx)(Video_1.Video, { id: _video.id, vimeoVideoId: _video.vimeoVideoId })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: _image?.src ? ((0, jsx_runtime_1.jsx)(SCompPageHeaderBg_1.SCompPageHeaderBg, { children: (0, jsx_runtime_1.jsx)(ImageWithAspectRatio_1.default, { src: _image.src, bronze: { ratio: 1.173 }, silver: { ratio: 0.33 }, resolution: {
                            width: media,
                            height: ~~(media * (media >= mediaquerys_1.BREAKPOINTS.PLATINUM ? 0.33 : 1.173)),
                        }, alt: _image.title }) })) : null })), headline ? ((0, jsx_runtime_1.jsx)(SCompPageHeaderHeadlineWrapper_1.SCompPageHeaderHeadlineWrapper, { children: (0, jsx_runtime_1.jsx)(GridPadding_1.GridPadding, { children: (0, jsx_runtime_1.jsx)(Grid_1.Grid, { children: (0, jsx_runtime_1.jsx)(GridItem_1.GridItem, { bronze: { start: 1, end: 4 }, silver: { start: 3, end: 8 }, children: (0, jsx_runtime_1.jsx)(SCompPageHeaderHeadline_1.SCompPageHeaderHeadline, { ...(0, getInspectProps_1.getInspectProps)({
                                    id: props.id,
                                    fieldName: "headline",
                                }), children: headline }) }) }) }) })) : null] }));
};
exports.CompPageHeader = CompPageHeader;
