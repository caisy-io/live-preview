declare module "simple-peer" {
    namespace SimplePeer {
        interface Instance {
            on(event: string, listener: any): void;
            send(data: any): void;
            signal(data: any): void;
            destroy(err?: Error): void;

            // Add properties that are being accessed in your code
            _channel: {
                readyState: string;
            } | null;
            _pcReady: boolean;
            destroying: boolean;

            // Add any other properties or methods you're using
        }

        interface Options {
            initiator?: boolean;
            channelName?: string;
            trickle?: boolean;
            // Add other options as needed
        }
    }

    class SimplePeer implements SimplePeer.Instance {
        constructor(opts?: SimplePeer.Options);

        // Implement the Instance interface
        on(event: string, listener: any): void;
        send(data: any): void;
        signal(data: any): void;
        destroy(err?: Error): void;

        _channel: {
            readyState: string;
        } | null;
        _pcReady: boolean;
        destroying: boolean;

        // Add static methods if any
        static(...args: any[]): SimplePeer.Instance;
    }

    export = SimplePeer;
}
