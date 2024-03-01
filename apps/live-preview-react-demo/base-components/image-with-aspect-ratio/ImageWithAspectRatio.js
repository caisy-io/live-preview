"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Img_1 = require("../img/Img");
const SImageWithAspectRatio_1 = require("./styles/SImageWithAspectRatio");
const ImageWithAspectRatio = (props) => {
    const { src, alt, height = 100, width = 100, ratio, bronze = {
        height,
        width,
        ratio,
    }, silver = bronze, gold = silver, platinum = gold, diamond = platinum, } = props;
    const ratioCalcBronze = !isNaN(bronze)
        ? bronze
        : bronze.ratio || bronze.height / bronze.width;
    const ratioCalcSilver = !isNaN(silver)
        ? silver
        : silver.ratio || silver.height / silver.width;
    const ratioCalcGold = !isNaN(gold)
        ? gold
        : gold.ratio || gold.height / gold.width;
    const ratioCalcPlatinum = !isNaN(platinum)
        ? platinum
        : platinum.ratio || platinum.height / platinum.width;
    const ratioCalcDiamond = !isNaN(diamond)
        ? diamond
        : silver.ratio || diamond.height / diamond.width;
    return ((0, jsx_runtime_1.jsx)(SImageWithAspectRatio_1.SImageWithAspectRatio, { ratioCalcBronze: ratioCalcBronze * 100, ratioCalcSilver: ratioCalcSilver * 100, ratioCalcGold: ratioCalcGold * 100, ratioCalcPlatinum: ratioCalcPlatinum * 100, ratioCalcDiamond: ratioCalcDiamond * 100, ...props, children: (0, jsx_runtime_1.jsx)(Img_1.Img, { src: src, alt: alt, ...props }) }));
};
exports.default = ImageWithAspectRatio;
