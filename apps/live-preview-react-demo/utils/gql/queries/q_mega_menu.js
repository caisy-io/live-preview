"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q_mega_menu = void 0;
const client_1 = require("@apollo/client");
const f_asset_1 = require("./fragments/f_asset");
exports.q_mega_menu = (0, client_1.gql) `
  ${f_asset_1.f_asset}
  query q_mega_menu($locale: String!) {
    MainNavigation(locale: $locale) {
      logo(locale: $locale) {
        ...Asset
      }
      logoDarkVersion(locale: $locale) {
        ...Asset
      }
      title
      id
      home(locale: $locale) {
        ... on Page {
          __typename
          id
          slug
        }
      }
      mainNavigation(locale: $locale) {
        ... on Page {
          __typename
          id
          internalTitle
          slug
        }
      }
    }
  }
`;
