"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q_page = void 0;
const client_1 = require("@apollo/client");
const f_page_1 = require("./fragments/f_page");
exports.q_page = (0, client_1.gql) `
  ${f_page_1.f_page}
  query q_page($locale: String!, $slug: String) {
    allPage(locale: $locale, where: { slug: { eq: $slug } }) {
      totalCount
      edges {
        node {
          ...Page
        }
      }
    }
  }
`;
