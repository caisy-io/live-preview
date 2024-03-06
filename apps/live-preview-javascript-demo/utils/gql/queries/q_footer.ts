import { gql } from "@apollo/client";
import { f_button } from "./fragments/f_button";
import { f_button_external_links } from "./fragments/f_link";

export const q_footer = gql`
  ${f_button}
  ${f_button_external_links}
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
