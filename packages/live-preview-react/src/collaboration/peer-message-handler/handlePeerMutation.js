"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePeerMutation = void 0;
const constants_1 = require("../../constants");
const encoding_1 = require("../encoding");
const handlePeerMutation = (data) => {
    const body = (0, encoding_1.decodeAnyJSONMessage)(data);
    if (body) {
        const e = new CustomEvent(constants_1.CLIENT_EVENTS.peerMutation, {
            bubbles: true,
            detail: body,
        });
        window.dispatchEvent(e);
    }
};
exports.handlePeerMutation = handlePeerMutation;
