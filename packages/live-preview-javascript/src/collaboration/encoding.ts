import { PEER_MESSAGE_TYPE_HOT_FIELD_UPDATE } from "./constants";
import { Base64 } from "js-base64";

export const decodeFieldMessage = (message: Uint8Array) => {
  const metaString = new TextDecoder().decode(message.slice(0, 115));

  const chunks = metaString.split(":");
  if (chunks.length !== 6) {
    throw new Error(`Invalid message in decodeFieldMessage`);
  }
  const [documentId, documentFieldLocaleId, blueprintFieldId, syncChecksum] =
    chunks.slice(1);

  return {
    documentId,
    documentFieldLocaleId,
    blueprintFieldId,
    syncChecksum,
    body: message.subarray(115),
  };
};

export const encodeFieldMessage = ({
  messageType,
  blueprintFieldId,
  documentFieldLocaleId,
  documentId,
  syncChecksum,
  body,
}: {
  messageType: number;
  blueprintFieldId: string;
  documentFieldLocaleId: string;
  documentId: string;
  syncChecksum?: string;
  body?: any;
}): Uint8Array => {
  const encodedMeta: any = new TextEncoder().encode(
    `:${documentId}:${documentFieldLocaleId}:${blueprintFieldId}:${
      syncChecksum || 0
    }:`
  );
  return new Uint8Array([messageType, ...encodedMeta, ...(body ? body : [])]);
};

export const encodeAnyJSONMessage = ({
  messageType,
  body,
}: {
  messageType: number;
  body?: any;
}): Uint8Array => {
  const encodedMeta: any = new TextEncoder().encode(JSON.stringify(body));
  return new Uint8Array([messageType, ...encodedMeta]);
};

export const decodeAnyJSONMessage = (message: Uint8Array) => {
  // const objStringWithoutType = `${message.slice(1)}`;
  // console.log(` new TextDecoder().decode(uint8array)`, );
  // console.log(` return JSON.parse(objStringWithoutType);`, objStringWithoutType);
  return JSON.parse(new TextDecoder().decode(message.slice(1)));
};

export const encodeHotFieldUpdate = ({
  projectId,
  documentId,
  blueprintFieldId,
  documentFieldLocaleId,
  data,
}: {
  projectId: string;
  documentId: string;
  blueprintFieldId: string;
  documentFieldLocaleId: string;
  data: any;
}): Uint8Array => {
  const metaKey = `${projectId}${documentId}${blueprintFieldId}${documentFieldLocaleId}`;
  if (metaKey.length != 144)
    throw new Error(`Meta key wrong length: ${metaKey.length} != 144`);

  const encodedMeta: any = new TextEncoder().encode(
    `${projectId}${documentId}${blueprintFieldId}${documentFieldLocaleId}`
  );

  const encodeData: any = new TextEncoder().encode(JSON.stringify(data));

  return new Uint8Array([
    PEER_MESSAGE_TYPE_HOT_FIELD_UPDATE,
    ...encodedMeta,
    ...encodeData,
  ]);
};

export const decodeHotFieldUpdate = (message: Uint8Array) => {
  return {
    documentFieldLocaleId: new TextDecoder().decode(message.slice(109, 145)),
    metaKey: new TextDecoder().decode(message.slice(1, 109)),
    data: JSON.parse(new TextDecoder().decode(message.slice(145))),
  };
};

export function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return Base64.encode(binary);
}

export function base64ToUint8Array(base64: string): Uint8Array {
  const binary_string = Base64.decode(base64);
  const bytes = new Uint8Array(binary_string.length);
  for (let i = 0; i < binary_string.length; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}
