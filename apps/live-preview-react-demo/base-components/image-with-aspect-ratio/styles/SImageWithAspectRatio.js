"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SImageWithAspectRatio = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const mediaquerys_1 = require("../../../constants/styles/mediaquerys");
const cover = (0, styled_components_1.css) `
  object-fit: cover;
`;
const _contain = (0, styled_components_1.css) `
  object-fit: contain;
`;
const Bronze = (0, styled_components_1.css) `
  padding-top: ${(props) => props.ratioCalcBronze || 100}%;
  position: relative;
  width: 100%;
  > div {
    bottom: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    img {
      height: 100%;
      ${({ contain, noFit }) => {
    return !noFit ? (contain ? _contain : cover) : "";
}};
      width: 100%;
    }
  }
`;
const Silver = (0, styled_components_1.css) `
  padding-top: ${(props) => props.ratioCalcSilver || 100}%;
`;
const Gold = (0, styled_components_1.css) `
  padding-top: ${(props) => props.ratioCalcGold || 100}%;
`;
const Platinum = (0, styled_components_1.css) `
  padding-top: ${(props) => props.ratioCalcPlatinum || 100}%;
`;
const Diamond = (0, styled_components_1.css) `
  padding-top: ${(props) => props.ratioCalcDiamond || 100}%;
`;
exports.SImageWithAspectRatio = styled_components_1.default.div `
  ${Bronze};
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
`;
