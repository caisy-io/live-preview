import { createPubSub } from "./pubsub";

export const globalRef =
  (typeof window !== "undefined" && (window as any).c) ||
  (typeof window !== "undefined" &&
    ((window as any)["c"] = {}) &&
    (window as any).c) ||
  ({} as any);

export const globalStore = globalRef["preview"] || (globalRef["preview"] = {});

globalStore["subscribers"] = globalStore["subscribers"] || new Map();

if (!globalStore["pubsub"]) {
  globalStore["pubsub"] = createPubSub();
}