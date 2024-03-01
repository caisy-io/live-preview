"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSActiveItemState = void 0;
const styled_components_1 = require("styled-components");
exports.CSSActiveItemState = (0, styled_components_1.css) `
  transform: translate3d(0, 0px, 0px);
  clip-path: inset(0px 0% 0% 0%);
  transition: transform ease-in-out 300ms
      ${({ animationIndex }) => `${200 + animationIndex * 50}ms`},
    clip-path ease-in-out 300ms
      ${({ animationIndex }) => `${200 + animationIndex * 50}ms`};
  pointer-events: all;
`;
