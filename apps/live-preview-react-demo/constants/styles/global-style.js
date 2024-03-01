"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GSBase = void 0;
const styled_components_1 = require("styled-components");
const css_reset_1 = require("./css-reset");
const css_scrollbars_1 = require("./css-scrollbars");
exports.GSBase = (0, styled_components_1.createGlobalStyle) `
  ${css_reset_1.CSSReset};
  ${css_scrollbars_1.CSSScrollbars};
  
  :root {
    ${css_scrollbars_1.CSSScrollbars};
    --colorPrimary100: ${(props) => props.primaryColor100};
    --colorPrimary80: ${(props) => props.primaryColor80};;
    --colorSecondary100: ${(props) => props.secondayColor100};;
    --colorSecondary80: ${(props) => props.secondayColor80};;
    --colorSolidWhite: rgba(255,255,255,1);
    --colorSolidBlack: rgba(0,0,0,1);
    --colorSolidWhite30: rgba(255,255,255,0.300);
    --colorSolidBlack25: rgba(0,0,0,0.250);
  }
  
  body {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  
  .lazyload-wrapper {
    height: inherit;
    width: inherit;
    max-height: inherit;
  }
  
  a{
    color: inherit;
  }
  
  img{
    pointer-events: none;
  }
  ol {
     li {
      list-style-type: decimal;
      margin-left: 1rem;
     }
  }
  ul { 
    li {
      list-style-type: circle;
      margin-left: 1rem;
    }
  }
  strong, b {
    font-weight: bold;
  }
`;
