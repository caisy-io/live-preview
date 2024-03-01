"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f_page = void 0;
const client_1 = require("@apollo/client");
const f_asset_1 = require("./f_asset");
const f_button_1 = require("./f_button");
const f_link_1 = require("./f_link");
exports.f_page = (0, client_1.gql) `
  ${f_asset_1.f_asset}
  ${f_button_1.f_button}
  ${f_link_1.f_button_external_links}

  fragment Page on Page {
    id
    slug
    internalTitle
    metaDescription
    metaTitle
    featuredImage {
      ...Asset
    }
    components(locale: $locale) {
      __typename
      ... on CompFaq {
        __typename
        id
        title
        faqItems(locale: $locale) {
          ... on CompFaqItem {
            __typename
            id
            title
            description {
              json
            }
          }
        }
      }
      ... on CompHeroSlider {
        slides(locale: $locale) {
          ... on CompHeroSliderSlide {
            id
            __typename
            backgroundImage(locale: $locale) {
              ...Asset
            }
            headline
            text {
              json
            }
          }
        }
      }
      ... on CompImageWithText {
        __typename
        imageRightInsteadOfLeft
        id
        headline
        strap
        text {
          json
        }
        imageRightInsteadOfLeft
        buttons(locale: $locale) {
          ...CompButton
          ...CompButtonExternalLinks
        }
        asset(locale: $locale) {
          ...Asset
        }
      }
      ... on CompSectionHeader {
        __typename
        id
        title
        image(locale: $locale) {
          ...Asset
        }
      }
      ... on CompPageHeader {
        id
        headline
        backgroundImage {
          ...Asset
        }
        backgroundVideo {
          id
          vimeoVideoId
        }
      }
      ... on CompTextBlock {
        id
        text {
          json
        }
        buttons(locale: $locale) {
          ...CompButton
          ...CompButtonExternalLinks
        }
        __typename
      }
    }
  }
`;
