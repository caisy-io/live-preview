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
exports.SCompHeroSliderSlideText = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const mediaquerys_1 = require("../../../../constants/styles/mediaquerys");
const Bronze = (0, styled_components_1.css) `
  font-family: Roboto;
  font-size: 14px;
  line-height: 140%;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.005em;
  color: #ffffff;
  strong,
  bold,
  strong > *,
  bold > * {
    font-weight: bold;
  }
  margin-top: 16px;
`;
const Silver = (0, styled_components_1.css) ``;
const Gold = (0, styled_components_1.css) `
  max-width: 45vw;
  font-size: 18px;
  line-height: 160%;
`;
const Platinum = (0, styled_components_1.css) ``;
const Diamond = (0, styled_components_1.css) ``;
exports.SCompHeroSliderSlideText = styled_components_1.default.div `
  ${Bronze}
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
`;
