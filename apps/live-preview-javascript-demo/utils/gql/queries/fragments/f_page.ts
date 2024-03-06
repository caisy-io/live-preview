import { gql } from "@apollo/client";
import { f_asset } from "./f_asset";
import { f_button } from "./f_button";
import { f_button_external_links } from "./f_link";

export const f_page = gql`
  ${f_asset}
  ${f_button}
  ${f_button_external_links}

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
