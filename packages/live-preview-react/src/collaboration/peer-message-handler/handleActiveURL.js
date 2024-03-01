"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleActiveURL = void 0;
const constants_1 = require("../constants");
const encoding_1 = require("../encoding");
const handleActiveURL = (state, peer, data) => {
    const msg = (0, encoding_1.decodeAnyJSONMessage)(data);
    state.peerLocations[peer.clientId] = msg;
    state.pubsub.emit(constants_1.PUBSUB_KEY_ACTIVE_URL_CHANGE, []);
};
exports.handleActiveURL = handleActiveURL;
