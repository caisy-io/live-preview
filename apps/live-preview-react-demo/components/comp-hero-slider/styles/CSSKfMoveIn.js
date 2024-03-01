"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSKfMoveIn = void 0;
const styled_components_1 = require("styled-components");
exports.CSSKfMoveIn = (0, styled_components_1.keyframes) `
    from {
      transform: translate3d(1%, 0, 0);
      clip-path: inset(0px 100% 0% 0% );
    }
    to {
      transform: translate3d(0, 0, 0);
      clip-path: inset(0px 0% 0% 0%);
    }
`;
