"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f_button = void 0;
const client_1 = require("@apollo/client");
exports.f_button = (0, client_1.gql) `
  fragment CompButton on CompButton {
    __typename
    id
    title
    style
    link(locale: $locale) {
      ... on Page {
        slug
      }
    }
  }
`;
