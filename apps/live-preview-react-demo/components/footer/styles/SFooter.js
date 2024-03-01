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
exports.SFooter = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const SFlex_1 = require("../../../base-components/flex/styles/SFlex");
const SGridPadding_1 = require("../../../base-components/grid-padding/styles/SGridPadding");
const mediaquerys_1 = require("../../../constants/styles/mediaquerys");
const CSSIs404 = (0, styled_components_1.css) `
  margin-top: 0;
`;
const Bronze = (0, styled_components_1.css) `
  background: var(--colorPrimary100);
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  ${SGridPadding_1.SGridPadding} {
    width: 100%;
    ${SFlex_1.SFlex} {
      width: 100%;
      height: 100%;
    }
  }
  margin-top: 64px;
  ${({ is404 }) => (is404 ? CSSIs404 : "")}
`;
const Silver = (0, styled_components_1.css) `
  padding: 32px 0;
  flex-direction: row;
  margin-top: 185px;
  ${({ is404 }) => (is404 ? CSSIs404 : "")}
`;
const Gold = (0, styled_components_1.css) ``;
const Platinum = (0, styled_components_1.css) ``;
const Diamond = (0, styled_components_1.css) ``;
exports.SFooter = styled_components_1.default.div `
  ${Bronze}
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
`;
