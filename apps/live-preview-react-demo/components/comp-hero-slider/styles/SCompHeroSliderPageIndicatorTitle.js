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
exports.SCompHeroSliderPageIndicatorTitle = void 0;
const styled_components_1 = __importStar(require("styled-components"));
const mediaquerys_1 = require("../../../constants/styles/mediaquerys");
const CSSKfMoveIn_1 = require("./CSSKfMoveIn");
const CSSKfMoveOut_1 = require("./CSSKfMoveOut");
// transitionFrom
const CSSTransitionFromState = (0, styled_components_1.css) `
  animation: ${CSSKfMoveOut_1.CSSKfMoveOut} 1.6s normal forwards cubic-bezier(0.87, 0, 0.13, 1);
  animation-iteration-count: 1;
`;
const CSSNotTransitionFromState = (0, styled_components_1.css) `
  clip-path: inset(0px 100% 0px 0px);
  transform: translate3d(-5%, 0, 0);
`;
// ACTIVE
const CSSActiveState = (0, styled_components_1.css) `
  animation: ${CSSKfMoveIn_1.CSSKfMoveIn} 1.6s normal forwards cubic-bezier(0.87, 0, 0.13, 1);
  animation-iteration-count: 1;
`;
const CSSInActiveState = (0, styled_components_1.css) `
  /* transform: translate3d(-100%, 0, 0); */
`;
const Bronze = (0, styled_components_1.css) `
  /* transform: translate3d(-100%, 0, 0); */
  display: none;
`;
const Silver = (0, styled_components_1.css) ``;
const Gold = (0, styled_components_1.css) `
  display: block;
  position: relative;
  margin-bottom: 8px;
  /* bottom: 23px; */
  /* right: 0; */
  width: 100%;
  /* Caption/14 */

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  /* or 20px */
  text-transform: uppercase;

  color: #ffffff;
`;
const Platinum = (0, styled_components_1.css) ``;
const Diamond = (0, styled_components_1.css) ``;
exports.SCompHeroSliderPageIndicatorTitle = styled_components_1.default.div `
  ${Bronze}
  ${(0, mediaquerys_1.MIN_SILVER) `${Silver}`};
  ${(0, mediaquerys_1.MIN_GOLD) `${Gold}`};
  ${(0, mediaquerys_1.MIN_PLATINUM) `${Platinum}`};
  ${(0, mediaquerys_1.MIN_DIAMOND) `${Diamond}`};
  ${(props) => props.transitionFrom ? CSSTransitionFromState : CSSNotTransitionFromState};
  ${(props) => (props.active ? CSSActiveState : CSSInActiveState)};
`;
