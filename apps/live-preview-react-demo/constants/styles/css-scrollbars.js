"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSScrollbars = void 0;
const styled_components_1 = require("styled-components");
exports.CSSScrollbars = (0, styled_components_1.css) `
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--colorSecondary80);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--colorPrimary80);
    transition: 400ms background-color;
    cursor: pointer;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--colorPrimary100);
  }
`;
