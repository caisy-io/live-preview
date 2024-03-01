"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimpleKey = exports.getDocumentKey = exports.getFieldKey = void 0;
const getFieldKey = ({ documentFieldLocaleId, documentId, blueprintFieldId, type, }) => `${type}${documentId}${blueprintFieldId}${documentFieldLocaleId || ""}`;
exports.getFieldKey = getFieldKey;
const getDocumentKey = ({ documentId, type }) => (0, exports.getSimpleKey)(type, documentId);
exports.getDocumentKey = getDocumentKey;
const getSimpleKey = (type, id) => `${type}${id}`;
exports.getSimpleKey = getSimpleKey;
