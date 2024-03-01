"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q_universal_text = void 0;
const client_1 = require("@apollo/client");
const f_asset_1 = require("./fragments/f_asset");
const f_button_1 = require("./fragments/f_button");
const f_link_1 = require("./fragments/f_link");
exports.q_universal_text = (0, client_1.gql) `
  ${f_button_1.f_button}
  ${f_link_1.f_button_external_links}
  ${f_asset_1.f_asset}

  query q_universal_text($locale: String!) {
    UniversalText(locale: $locale) {
      __typename
      id
      customHtml
      customHtmlBody
      copyright
      filter_divested
      filter_current
      filter_all
      pageNotFoundBackgroundImage(locale: $locale) {
        ...Asset
      }
      pageNotFoundDescription {
        json
      }
      pageNotFoundButton(locale: $locale) {
        ...CompButton
        ...CompButtonExternalLinks
      }
      secondaryColor
      primaryColor
    }
  }
`;
