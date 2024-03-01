"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f_button_external_links = void 0;
const client_1 = require("@apollo/client");
exports.f_button_external_links = (0, client_1.gql) `
  fragment CompButtonExternalLinks on CompButtonExternalLinks {
    __typename
    id
    title
    style
    url
  }
`;
