"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompSectionHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Img_1 = require("../../base-components/img/Img");
const mediaquerys_1 = require("../../constants/styles/mediaquerys");
const useImageMedia_1 = __importDefault(require("../../hooks/useImageMedia"));
// import { Video } from "../video/Video";
const SCompSectionHeader_1 = require("./styles/SCompSectionHeader");
const SCompSectionHeaderImage_1 = require("./styles/SCompSectionHeaderImage");
const SCompSectionHeaderText_1 = require("./styles/SCompSectionHeaderText");
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const getInspectProps_1 = require("@repo/live-preview-react/getInspectProps");
const CompSectionHeader = (props) => {
    const { image, title, id } = (0, useCaisyUpdates_1.useCaisyUpdates)({ ...props });
    const media = (0, useImageMedia_1.default)();
    const _imageForUpdates = image?.find((image) => image?.__typename === "Asset");
    const _image = (0, useCaisyUpdates_1.useCaisyUpdates)(_imageForUpdates);
    // const _video = image.find(
    //   (image) => image?.__typename === "Video"
    // ) as IGenVideo;
    return ((0, jsx_runtime_1.jsxs)(SCompSectionHeader_1.SCompSectionHeader, { children: [(0, jsx_runtime_1.jsx)(SCompSectionHeaderImage_1.SCompSectionHeaderImage, { ...(0, getInspectProps_1.getInspectProps)({ id, fieldName: "image" }), dominantColor: _image?.dominantColor, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: _image && ((0, jsx_runtime_1.jsx)(Img_1.Img, { src: _image?.src, resolution: {
                            width: media,
                            height: ~~(media * (media >= mediaquerys_1.BREAKPOINTS.SILVER ? 0.3 : 1)),
                        } })) }) }), (0, jsx_runtime_1.jsx)(SCompSectionHeaderText_1.SCompSectionHeaderText, { ...(0, getInspectProps_1.getInspectProps)({ id, fieldName: "title" }), children: title ?? "" })] }));
};
exports.CompSectionHeader = CompSectionHeader;
