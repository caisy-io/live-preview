"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f_component_grid_column = void 0;
const client_1 = require("@apollo/client");
const f_asset_1 = require("./f_asset");
const f_button_1 = require("./f_button");
const f_link_1 = require("./f_link");
exports.f_component_grid_column = (0, client_1.gql) `
  ${f_asset_1.f_asset}
  ${f_button_1.f_button}
  ${f_link_1.f_button_external_links}

  fragment ComponentGirdColumn on ComponentGirdColumn {
    __typename
    id
    selectVariant
    enableNewsletter
    newsletterBackground(locale: $locale) {
      ...Asset
    }

    linkPages(locale: $locale) {
      ... on ComponentTextBlock {
        __typename
        id
        text
        button(locale: $locale) {
          ...Button
          ...ButtonExternalLinks
        }
      }
      ... on ArticlePage {
        __typename
        _meta {
          publishedAt
        }
        id
        slug
        createdAt
        headline
        teaserText
        headerImage(locale: $locale) {
          ...Asset
        }
        category(locale: $locale) {
          title
        }
      }
    }
  }
`;
