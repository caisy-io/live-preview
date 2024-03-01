"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPubSub = void 0;
const createPubSub = () => {
    const events = {};
    const on = (event, callback) => {
        if (!events[event]) {
            events[event] = [];
        }
        events[event].push(callback);
    };
    const emit = (event, data) => {
        if (events[event]) {
            events[event].forEach((callback) => callback(...data));
        }
    };
    const off = (event, callback) => {
        if (events[event]) {
            events[event] = events[event].filter((cb) => cb !== callback);
        }
    };
    return { on, emit, off };
};
exports.createPubSub = createPubSub;
