"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePreviewFieldUpdate = void 0;
const encoding_1 = require("../encoding");
const handlePreviewFieldUpdate = (data) => {
    const update = (0, encoding_1.decodeAnyJSONMessage)(data);
    if (window.c.debug) {
        console.log(`handlePreviewFieldUpdate update:`, update);
    }
    window.c.preview.pubsub.emit(update.documentId, [update]);
};
exports.handlePreviewFieldUpdate = handlePreviewFieldUpdate;
