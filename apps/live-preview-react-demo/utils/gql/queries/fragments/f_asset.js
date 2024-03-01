"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f_asset = void 0;
const client_1 = require("@apollo/client");
exports.f_asset = (0, client_1.gql) `
  fragment Asset on Asset {
    id
    __typename
    author
    copyright
    dominantColor
    keywords
    originType
    originalName
    src
    description
    title
  }
`;
