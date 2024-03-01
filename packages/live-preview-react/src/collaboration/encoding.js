"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToUint8Array = exports.uint8ArrayToBase64 = exports.decodeHotFieldUpdate = exports.encodeHotFieldUpdate = exports.decodeAnyJSONMessage = exports.encodeAnyJSONMessage = exports.encodeFieldMessage = exports.decodeFieldMessage = void 0;
const constants_1 = require("./constants");
const js_base64_1 = require("js-base64");
const decodeFieldMessage = (message) => {
    const metaString = new TextDecoder().decode(message.slice(0, 115));
    const chunks = metaString.split(":");
    if (chunks.length !== 6) {
        throw new Error(`Invalid message in decodeFieldMessage`);
    }
    const [documentId, documentFieldLocaleId, blueprintFieldId, syncChecksum] = chunks.slice(1);
    return {
        documentId,
        documentFieldLocaleId,
        blueprintFieldId,
        syncChecksum,
        body: message.subarray(115),
    };
};
exports.decodeFieldMessage = decodeFieldMessage;
const encodeFieldMessage = ({ messageType, blueprintFieldId, documentFieldLocaleId, documentId, syncChecksum, body, }) => {
    const encodedMeta = new TextEncoder().encode(`:${documentId}:${documentFieldLocaleId}:${blueprintFieldId}:${syncChecksum || 0}:`);
    return new Uint8Array([messageType, ...encodedMeta, ...(body ? body : [])]);
};
exports.encodeFieldMessage = encodeFieldMessage;
const encodeAnyJSONMessage = ({ messageType, body, }) => {
    const encodedMeta = new TextEncoder().encode(JSON.stringify(body));
    return new Uint8Array([messageType, ...encodedMeta]);
};
exports.encodeAnyJSONMessage = encodeAnyJSONMessage;
const decodeAnyJSONMessage = (message) => {
    // const objStringWithoutType = `${message.slice(1)}`;
    // console.log(` new TextDecoder().decode(uint8array)`, );
    // console.log(` return JSON.parse(objStringWithoutType);`, objStringWithoutType);
    return JSON.parse(new TextDecoder().decode(message.slice(1)));
};
exports.decodeAnyJSONMessage = decodeAnyJSONMessage;
const encodeHotFieldUpdate = ({ projectId, documentId, blueprintFieldId, documentFieldLocaleId, data, }) => {
    const metaKey = `${projectId}${documentId}${blueprintFieldId}${documentFieldLocaleId}`;
    if (metaKey.length != 144)
        throw new Error(`Meta key wrong length: ${metaKey.length} != 144`);
    const encodedMeta = new TextEncoder().encode(`${projectId}${documentId}${blueprintFieldId}${documentFieldLocaleId}`);
    const encodeData = new TextEncoder().encode(JSON.stringify(data));
    return new Uint8Array([
        constants_1.PEER_MESSAGE_TYPE_HOT_FIELD_UPDATE,
        ...encodedMeta,
        ...encodeData,
    ]);
};
exports.encodeHotFieldUpdate = encodeHotFieldUpdate;
const decodeHotFieldUpdate = (message) => {
    return {
        documentFieldLocaleId: new TextDecoder().decode(message.slice(109, 145)),
        metaKey: new TextDecoder().decode(message.slice(1, 109)),
        data: JSON.parse(new TextDecoder().decode(message.slice(145))),
    };
};
exports.decodeHotFieldUpdate = decodeHotFieldUpdate;
function uint8ArrayToBase64(bytes) {
    let binary = "";
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return js_base64_1.Base64.encode(binary);
}
exports.uint8ArrayToBase64 = uint8ArrayToBase64;
function base64ToUint8Array(base64) {
    const binary_string = js_base64_1.Base64.decode(base64);
    const bytes = new Uint8Array(binary_string.length);
    for (let i = 0; i < binary_string.length; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}
exports.base64ToUint8Array = base64ToUint8Array;
