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
exports.SPageHeaderLinkElement = exports.CSSWhiteMode = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const mediaquerys_1 = require("../../../../constants/styles/mediaquerys");
const BronzeWhiteMode = (0, styled_components_1.css) ``;
const SilverWhiteMode = (0, styled_components_1.css) `
  color: var(--colorSolidBlack);
  &:after {
    opacity: 1;
    background: var(--colorSolidBlack);
    width: 3px;
    height: 3px;
  }
`;
const GoldWhiteMode = (0, styled_components_1.css) ``;
const PlatinumWhiteMode = (0, styled_components_1.css) ``;
const DiamondWhiteMode = (0, styled_components_1.css) ``;
exports.CSSWhiteMode = (0, styled_components_1.css) `
  ${BronzeWhiteMode}
  ${(0, mediaquerys_1.MIN_SILVER) `${SilverWhiteMode}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${GoldWhiteMode}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${PlatinumWhiteMode}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${DiamondWhiteMode}`};
`;
const Bronze = (0, styled_components_1.css) ``;
const Silver = (0, styled_components_1.css) `
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.005em;
  color: var(--colorSolidWhite);
  padding: 0 24px;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  position: relative;
  transition: opacity 200ms linear, color 200ms linear;

  &:hover {
    opacity: 0.7;
  }

  &:after {
    transition: opacity 200ms linear, width 200ms linear, height 200ms linear;
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    background: var(--colorSolidWhite);
    opacity: 0.3;
    width: 2px;
    height: 2px;
    border-radius: 50%;
  }

  &:first-of-type {
    padding-left: 20px;
  }
`;
const Gold = (0, styled_components_1.css) ``;
const Platinum = (0, styled_components_1.css) ``;
const Diamond = (0, styled_components_1.css) ``;
exports.SPageHeaderLinkElement = styled_components_1.default.button `
  ${Bronze}
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
  ${({ whiteMode }) => (whiteMode ? exports.CSSWhiteMode : "")}
`;
