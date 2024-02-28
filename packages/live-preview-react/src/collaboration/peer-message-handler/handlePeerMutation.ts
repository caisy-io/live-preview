import { CLIENT_EVENTS } from "../../constants";
import { decodeAnyJSONMessage } from "../encoding";

export const handlePeerMutation = (data: Uint8Array) => {
  const body = decodeAnyJSONMessage(data);

  if (body) {
    const e = new CustomEvent(CLIENT_EVENTS.peerMutation, {
      bubbles: true,
      detail: body,
    });
    window.dispatchEvent(e);
  }
};
