"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticProps = exports.default = void 0;
var _slug_1 = require("./[slug]");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(_slug_1).default; } });
const _slug_2 = require("./[slug]");
const getStaticProps = async ({ params, locale = "en", draftMode }) => {
    return (0, _slug_2.getStaticProps)({
        params: {
            ...params,
            isIndexPage: true,
        },
        draftMode,
        locale,
    });
};
exports.getStaticProps = getStaticProps;
