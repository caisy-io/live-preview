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
exports.SText = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const mediaquerys_1 = require("../../../constants/styles/mediaquerys");
const Bronze = (0, styled_components_1.css) `
  font-size: 14px;
  line-height: 140%;
  color: rgba(29, 0, 84, 0.8);
  text-align: left;
  letter-spacing: normal;
  line-height: 1.4;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    min-height: 1em;
    font-family: Open Sans;
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    letter-spacing: 0.005em;
    color: #5064b4;
    text-align: left;
    min-height: 1em;
    margin-bottom: 32px;
  }

  a {
    text-decoration: underline;
    display: inline-block;
    cursor: pointer;
    white-space: break-spaces;
  }

  b,
  strong {
    font-weight: 700;
  }

  p {
    min-height: 1em;
  }

  ol {
    margin-left: 18px;
    list-style: decimal;
  }

  i {
    font-style: italic;
  }

  ul {
    margin-left: 18px;
    list-style: disc;
  }

  li {
    padding-left: 16px;
    padding-bottom: 10px;
  }

  strong {
    font-weight: 600;
  }
`;
const Silver = (0, styled_components_1.css) `
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 28px;
    letter-spacing: 0.005em;
  }
`;
const Gold = (0, styled_components_1.css) `
  font-size: 18px;
  line-height: 160%;
`;
const Platinum = (0, styled_components_1.css) ``;
const Diamond = (0, styled_components_1.css) ``;
exports.SText = styled_components_1.default.div `
  ${Bronze};
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
`;
