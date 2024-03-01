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
exports.SPreviewElement = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const mediaqueries_1 = require("./mediaqueries");
const Bronze = (0, styled_components_1.css) `
  width: 100px;
  height: 48px;
  border-radius: 8px;
  background-color: rgba(0, 140, 255, 0.8);

  &:hover {
    baclground-color: rgba(0, 140, 255, 1);
  }
`;
const Silver = (0, styled_components_1.css) ``;
const Gold = (0, styled_components_1.css) ``;
const Platinum = (0, styled_components_1.css) ``;
const Diamond = (0, styled_components_1.css) ``;
exports.SPreviewElement = styled_components_1.default.div `
  ${Bronze}
  ${(0, mediaqueries_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaqueries_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaqueries_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaqueries_1.MIN_DIAMOND) `${Diamond}`};
`;
