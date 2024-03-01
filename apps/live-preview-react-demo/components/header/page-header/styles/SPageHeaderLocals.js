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
exports.SPageHeaderLocals = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const mediaquerys_1 = require("../../../../constants/styles/mediaquerys");
const ActiveState = (0, styled_components_1.css) `
  transform: translate3d(0, 0px, 0px);
  clip-path: inset(0px 0% 0% 0%);
  transition: transform ease-in-out 600ms 200ms,
    clip-path ease-in-out 600ms 200ms;
  pointer-events: all;
`;
const InActiveState = (0, styled_components_1.css) `
  transform: translate3d(10%, 0px, 0px);
  clip-path: inset(0px 0% 0% 100%);
  transition: transform ease-in-out 600ms 150ms,
    clip-path ease-in-out 600ms 150ms;
  pointer-events: none;
`;
const Bronze = (0, styled_components_1.css) `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
  color: var(--colorSolidWhite);
  margin: 0 12px;
  ${(props) => (props.isOpen ? ActiveState : InActiveState)};
`;
const Silver = (0, styled_components_1.css) `
  margin: 0 20px 0 24px;
`;
const Gold = (0, styled_components_1.css) `
  ${ActiveState}
`;
const Platinum = (0, styled_components_1.css) ``;
const Diamond = (0, styled_components_1.css) ``;
exports.SPageHeaderLocals = styled_components_1.default.div `
  ${Bronze}
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
`;
