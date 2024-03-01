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
exports.SGridItem = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const grid_1 = require("../../../constants/styles/grid");
const mediaquerys_1 = require("../../../constants/styles/mediaquerys");
const generateGridItemCss = (props, screenType) => {
    const val = props[screenType.toLowerCase()];
    if (val === null) {
        return (0, styled_components_1.css) `
      display: none;
    `;
    }
    const isAnyNull = Object.values(props).find((a) => a === null)
        ? (0, styled_components_1.css) `
        display: block;
      `
        : "";
    const start = val?.start;
    const end = val?.end;
    const order = val?.order;
    if (start && end) {
        return (0, styled_components_1.css) `
      ${isAnyNull};
      grid-column-start: ${start};
      grid-column-end: ${end + 1};
    `;
    }
    const _order = (0, styled_components_1.css) `
    ${order ? `order: ${order};` : ""}
  `;
    const col = val?.col;
    const row = val?.row;
    const _row = (0, styled_components_1.css) `
    ${row && row.start
        ? `grid-row-start: ${row.start};`
        : "grid-row-start: auto;"}
    ${row && row.end ? `grid-row-end: ${row.end + 1};` : "grid-row-end: auto;"}
  `;
    if (col?.start && col?.end) {
        return (0, styled_components_1.css) `
      ${isAnyNull};
      grid-column-start: ${col.start};
      grid-column-end: ${col.end + 1};
      ${_row}
      ${_order}
    `;
    }
};
const Bronze = (0, styled_components_1.css) `
  ${(props) => generateGridItemCss(props, grid_1.SCREEN_TYPES.BRONZE)};
`;
const Silver = (0, styled_components_1.css) `
  ${(props) => generateGridItemCss(props, grid_1.SCREEN_TYPES.SILVER)};
`;
const Gold = (0, styled_components_1.css) `
  
  ${(props) => generateGridItemCss(props, grid_1.SCREEN_TYPES.GOLD)};
`;
const Platinum = (0, styled_components_1.css) `
  ${(props) => generateGridItemCss(props, grid_1.SCREEN_TYPES.PLATINUM)};
`;
const Diamond = (0, styled_components_1.css) `
  ${(props) => generateGridItemCss(props, grid_1.SCREEN_TYPES.DIAMOND)};
`;
exports.SGridItem = styled_components_1.default.div `
  ${Bronze};
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
`;
