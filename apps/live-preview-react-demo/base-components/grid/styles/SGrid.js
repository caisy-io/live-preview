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
exports.SGrid = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const grid_1 = require("../../../constants/styles/grid");
const mediaquerys_1 = require("../../../constants/styles/mediaquerys");
const generateColumns = (type, rowGrid) => {
    return (0, styled_components_1.css) `
    grid-template-columns: repeat(${grid_1.COL_AMOUNT[type]}, 1fr);
    grid-column-gap: ${grid_1.GUTTER[type]};
    ${rowGrid ? `grid-row-gap: ${grid_1.GUTTER[type]}` : ""};
  `;
};
const Bronze = (0, styled_components_1.css) `
  display: grid;
  grid-template-rows: auto;
  ${({ rowGap }) => generateColumns(grid_1.SCREEN_TYPES.BRONZE, rowGap)};
  width: 100%;
`;
const Silver = (0, styled_components_1.css) `
  ${({ rowGap }) => generateColumns(grid_1.SCREEN_TYPES.SILVER, rowGap)};
`;
const Gold = (0, styled_components_1.css) `
  ${({ rowGap }) => generateColumns(grid_1.SCREEN_TYPES.GOLD, rowGap)};
`;
const Platinum = (0, styled_components_1.css) `
  ${({ rowGap }) => generateColumns(grid_1.SCREEN_TYPES.PLATINUM, rowGap)};
`;
const Diamond = (0, styled_components_1.css) `
  ${({ rowGap }) => generateColumns(grid_1.SCREEN_TYPES.DIAMOND, rowGap)};
`;
exports.SGrid = styled_components_1.default.div `
  ${Bronze};
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
`;
