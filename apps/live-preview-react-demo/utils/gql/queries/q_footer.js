"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q_footer = void 0;
const client_1 = require("@apollo/client");
const f_button_1 = require("./fragments/f_button");
const f_link_1 = require("./fragments/f_link");
exports.q_footer = (0, client_1.gql) `
  ${f_button_1.f_button}
  ${f_link_1.f_button_external_links}
  query q_footer($locale: String!) {
    Footer(locale: $locale) {
      __typename
      id
      legalSection(locale: $locale) {
        ...CompButton
        ...CompButtonExternalLinks
      }
    }
  }
`;
