type Callback<T = any> = (...args: T[]) => void;
export interface PubSub {
    on: <T = any>(event: string, callback: Callback<T>) => void;
    emit: <T = any>(event: string, data: T[]) => void;
    off: (event: string, callback: Callback) => void;
}
export declare const createPubSub: () => PubSub;
export {};
//# sourceMappingURL=pubsub.d.ts.map