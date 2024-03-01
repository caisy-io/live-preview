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
exports.SFlex = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const mediaquerys_1 = require("../../../constants/styles/mediaquerys");
const Bronze = (0, styled_components_1.css) `
  display: flex;
  flex-wrap: ${(props) => props.bronze?.wrap || props.wrap || "nowrap"};
  flex-direction: ${(props) => props.bronze?.direction || props.direction || "row"};
  align-items: ${(props) => props.bronze?.alignItems || props.alignItems || "center"};
  justify-content: ${(props) => props.bronze?.justify || props.justify || "flex-start"};
  align-content: ${(props) => props.bronze?.alignContent || props.alignContent || "stretch"};
`;
const Silver = (0, styled_components_1.css) `
  ${(props) => props.silver?.wrap ? `flex-wrap: ${props.silver?.wrap}` : ""};
  ${(props) => props.silver?.direction
    ? `flex-direction: ${props.silver?.direction}`
    : ""};
  ${(props) => props.silver?.alignItems ? `align-items: ${props.silver?.alignItems}` : ""};
  ${(props) => props.silver?.justify ? `justify-content: ${props.silver?.justify}` : ""};
  ${(props) => props.silver?.alignContent
    ? `align-content: ${props.silver?.alignContent}`
    : ""};
`;
const Gold = (0, styled_components_1.css) `
  ${(props) => props.gold?.wrap ? `flex-wrap: ${props.gold?.wrap}` : ""};
  ${(props) => props.gold?.direction ? `flex-direction: ${props.gold?.direction}` : ""};
  ${(props) => props.gold?.alignItems ? `align-items: ${props.gold?.alignItems}` : ""};
  ${(props) => props.gold?.justify ? `justify-content: ${props.gold?.justify}` : ""};
  ${(props) => props.gold?.alignContent
    ? `align-content: ${props.gold?.alignContent}`
    : ""};
`;
const Platinum = (0, styled_components_1.css) `
  ${(props) => props.platinum?.wrap ? `flex-wrap: ${props.platinum?.wrap}` : ""};
  ${(props) => props.platinum?.direction
    ? `flex-direction: ${props.platinum?.direction}`
    : ""};
  ${(props) => props.platinum?.alignItems
    ? `align-items: ${props.platinum?.alignItems}`
    : ""};
  ${(props) => props.platinum?.justify
    ? `justify-content: ${props.platinum?.justify}`
    : ""};
  ${(props) => props.platinum?.alignContent
    ? `align-content: ${props.platinum?.alignContent}`
    : ""};
`;
const Diamond = (0, styled_components_1.css) `
  ${(props) => props.diamond?.wrap ? `flex-wrap: ${props.diamond?.wrap}` : ""};
  ${(props) => props.diamond?.direction
    ? `flex-direction: ${props.diamond?.direction}`
    : ""};
  ${(props) => props.diamond?.alignItems
    ? `align-items: ${props.diamond?.alignItems}`
    : ""};
  ${(props) => props.diamond?.justify ? `justify-content: ${props.diamond?.justify}` : ""};
  ${(props) => props.diamond?.alignContent
    ? `align-content: ${props.diamond?.alignContent}`
    : ""};
`;
exports.SFlex = styled_components_1.default.div `
  ${Bronze};
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
`;
