"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSInActiveItemState = void 0;
const styled_components_1 = require("styled-components");
exports.CSSInActiveItemState = (0, styled_components_1.css) `
  transform: translate3d(10%, 0px, 0px);
  clip-path: inset(0% 0% 0% 100%);
  transition: transform ease-in-out 300ms
      ${({ animationIndex, totalAnimationItems }) => `${(totalAnimationItems - animationIndex) * 50}ms`},
    clip-path ease-in-out 300ms
      ${({ animationIndex, totalAnimationItems }) => `${(totalAnimationItems - animationIndex) * 50}ms`};
  pointer-events: none;
`;
