"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOwnListeningField = void 0;
const findOwnListeningField = (state, field) => {
    return state.ownListeningFields.find((f) => f.documentId === field.documentId &&
        f.documentFieldLocaleId === field.documentFieldLocaleId &&
        f.blueprintFieldId === field.blueprintFieldId);
};
exports.findOwnListeningField = findOwnListeningField;
