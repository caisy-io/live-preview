"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q_index = void 0;
const client_1 = require("@apollo/client");
const f_page_1 = require("./fragments/f_page");
exports.q_index = (0, client_1.gql) `
  ${f_page_1.f_page}
  query q_index($locale: String!) {
    MainNavigation(locale: $locale) {
      home(locale: $locale) {
        ...Page
      }
    }
  }
`;
