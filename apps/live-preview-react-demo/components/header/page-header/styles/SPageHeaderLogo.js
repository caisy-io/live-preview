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
exports.SPageHeaderLogo = exports.CSSWhiteMode = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const mediaquerys_1 = require("../../../../constants/styles/mediaquerys");
const BronzeWhiteMode = (0, styled_components_1.css) `
  img {
    opacity: 0;
  }
  img:last-child {
    opacity: 1;
  }
`;
const SilverWhiteMode = (0, styled_components_1.css) ``;
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
const Bronze = (0, styled_components_1.css) `
  cursor: pointer;
  position: relative;
  a {
    height: 100%;
    display: block;
  }
  img {
    transition: opacity 0.3s ease-in-out;
    max-width: 250px;
    max-height: 64px;
  }

  img:last-child {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
`;
const Silver = (0, styled_components_1.css) ``;
const Gold = (0, styled_components_1.css) ``;
const Platinum = (0, styled_components_1.css) ``;
const Diamond = (0, styled_components_1.css) ``;
exports.SPageHeaderLogo = styled_components_1.default.div `
  ${Bronze}
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
  ${({ whiteMode }) => (whiteMode ? exports.CSSWhiteMode : "")}
`;
