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
exports.SFooterMainNavigation = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const mediaquerys_1 = require("../../../constants/styles/mediaquerys");
const Bronze = (0, styled_components_1.css) `
  font-family: Roboto;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  color: var(--colorSolidWhite);
  position: relative;
  margin-bottom: 49px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    padding: 8px 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 200px;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.4);
    top: 100%;
    left: 50%;
    margin-top: 24px;
    transform: translateX(-50%);
    bottom: 0;
  }
`;
const Silver = (0, styled_components_1.css) `
  align-items: initial;
  margin-bottom: 76px;
  margin-top: 10px;

  &:after {
    display: none;
  }
`;
const Gold = (0, styled_components_1.css) ``;
const Platinum = (0, styled_components_1.css) ``;
const Diamond = (0, styled_components_1.css) ``;
exports.SFooterMainNavigation = styled_components_1.default.div `
  ${Bronze}
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
`;
