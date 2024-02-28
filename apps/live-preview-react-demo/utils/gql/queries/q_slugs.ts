import { gql } from "@apollo/client";

export const q_slugs = gql`
  query q_slugs {
    allPage {
      totalCount
      edges {
        node {
          slug
          sitemapPriority
        }
      }
    }
  }
`;
