"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaQueryArrayToVal = exports.MIN_DIAMOND = exports.MIN_PLATINUM = exports.MIN_GOLD = exports.MIN_SILVER = exports.BREAKPOINTS = void 0;
const styled_components_1 = require("styled-components");
exports.BREAKPOINTS = {
    DIAMOND: 1920,
    PLATINUM: 1440,
    GOLD: 1280,
    SILVER: 768,
    BRONZE: 0,
};
const MIN_SILVER = (...args) => (0, styled_components_1.css) `
  @media (min-width: ${exports.BREAKPOINTS.SILVER / 16}em) {
    ${(0, styled_components_1.css)(() => args)};
  }
`;
exports.MIN_SILVER = MIN_SILVER;
const MIN_GOLD = (...args) => (0, styled_components_1.css) `
  @media (min-width: ${exports.BREAKPOINTS.GOLD / 16}em) {
    ${(0, styled_components_1.css)(() => args)};
  }
`;
exports.MIN_GOLD = MIN_GOLD;
const MIN_PLATINUM = (...args) => (0, styled_components_1.css) `
  @media (min-width: ${exports.BREAKPOINTS.PLATINUM / 16}em) {
    ${(0, styled_components_1.css)(() => args)};
  }
`;
exports.MIN_PLATINUM = MIN_PLATINUM;
const MIN_DIAMOND = (...args) => (0, styled_components_1.css) `
  @media (min-width: ${exports.BREAKPOINTS.DIAMOND / 16}em) {
    ${(0, styled_components_1.css)(() => args)};
  }
`;
exports.MIN_DIAMOND = MIN_DIAMOND;
/*
Match array of values to breakpoints
  */
const MediaQueryArrayToVal = (mqArray, breakpoint) => {
    if (Array.isArray(mqArray)) {
        return mqArray[Object.values(exports.BREAKPOINTS).reverse().indexOf(breakpoint)];
    }
    return mqArray;
};
exports.MediaQueryArrayToVal = MediaQueryArrayToVal;
