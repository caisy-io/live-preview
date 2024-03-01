"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f_video = void 0;
const client_1 = require("@apollo/client");
exports.f_video = (0, client_1.gql) `
  fragment Video on Video {
    __typename
    id
    vimeoVideoId
  }
`;
