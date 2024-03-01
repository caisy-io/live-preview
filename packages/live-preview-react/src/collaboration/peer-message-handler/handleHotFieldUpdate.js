"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHotFieldUpdate = void 0;
const encoding_1 = require("../encoding");
const handleHotFieldUpdate = (state, data) => {
    const msg = (0, encoding_1.decodeHotFieldUpdate)(data);
    const { documentFieldLocaleId, metaKey } = msg;
    state.pubsub.emit("hfu_" + metaKey, [{ data: msg.data, documentFieldLocaleId }]);
};
exports.handleHotFieldUpdate = handleHotFieldUpdate;
