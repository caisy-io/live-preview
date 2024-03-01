"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q_slugs = void 0;
const client_1 = require("@apollo/client");
exports.q_slugs = (0, client_1.gql) `
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
