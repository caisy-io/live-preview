"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompImageWithTextAsset = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ImageWithAspectRatio_1 = __importDefault(require("../../base-components/image-with-aspect-ratio/ImageWithAspectRatio"));
const useCaisyUpdates_1 = require("@repo/live-preview-react/useCaisyUpdates");
const CompImageWithTextAsset = (props) => {
    const { __typename, src } = (0, useCaisyUpdates_1.useCaisyUpdates)({ ...props });
    if (!(__typename === "Asset" && src)) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(ImageWithAspectRatio_1.default, { src: src, resolution: { width: 500, height: 800 }, bronze: { ratio: 0.812 }, gold: { ratio: 1.53 } }));
};
exports.CompImageWithTextAsset = CompImageWithTextAsset;
