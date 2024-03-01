"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewClient = exports.publishedClient = void 0;
const retry_1 = require("@apollo/client/link/retry");
const client_1 = require("@apollo/client");
const error_1 = require("@apollo/client/link/error");
const graphql_1 = require("graphql");
const trimMax = (s, length) => {
    return s.length > length ? s.substring(0, length) + "..." : s;
};
const customFetch = (uri, options) => {
    return fetch(uri, options).then((response) => {
        if (response.status >= 400) {
            console.log(` uri`, uri);
            // or handle 400 errors
            try {
                /* eslint-disable no-console */
                console.error(`RESPONSE STATUS: ${response.status}`);
                /* eslint-disable no-console */
                try {
                    if (options.body) {
                        try {
                            const jobj = JSON.parse(options.body);
                            if (jobj.query) {
                                console.error(`REQUEST QUERY: ${trimMax(`${jobj.query}`, 10000)}`);
                            }
                        }
                        catch (err) {
                            console.error(`err parsing body`, err);
                        }
                    }
                    /* eslint-disable no-console */
                    console.error(`REQUEST BODY: ${trimMax(`${options.body}`, 200)}`);
                }
                catch (_) {
                    console.error(`REQUEST BODY: ${trimMax(`${options.body}`, 200)}`);
                }
                /* eslint-disable no-console */
                // console.error(`RESPONSE BODY: ${trimMax(`${response.body}`, 200)}`);
            }
            catch (err) {
                /* eslint-disable no-console */
                console.log(` err logging error`, err);
            }
            return Promise.reject(response.status);
        }
        return response;
    });
};
const errorLink = (0, error_1.onError)(({ graphQLErrors, networkError, operation, ...x }) => {
    if (networkError?.statusCode === 400) {
        /* eslint-disable no-console */
        console.log(` print(operation.query)`, (0, graphql_1.print)(operation.query));
        /* eslint-disable no-console */
        console.error(`-- 400 ${URL} -- ${networkError.bodyText}`, (0, graphql_1.print)(operation.query), x);
    }
    else {
        /* eslint-disable no-console */
        console.error(`--ERR ${networkError ? "NETWORK ERROR" : "ERROR"} ::`);
        /* eslint-disable no-console */
        console.error(networkError);
        if (graphQLErrors?.[0]?.extensions?.exception || graphQLErrors) {
            /* eslint-disable no-console */
            console.error(graphQLErrors);
            /* eslint-disable no-console */
            console.error(graphQLErrors?.[0]?.extensions?.exception);
            if (!networkError) {
                /* eslint-disable no-console */
                console.error(trimMax((0, graphql_1.print)(operation.query), 200));
            }
        }
        if (operation.variables && Object.keys(operation.variables).length > 0) {
            /* eslint-disable no-console */
            console.error(`PARAMS: `, operation.variables);
        }
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) => 
            /* eslint-disable no-console */
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
        }
    }
});
const retryLink = new retry_1.RetryLink({
    delay: {
        initial: 600,
        max: 12000,
        jitter: true,
    },
    attempts: {
        max: 4,
        retryIf: (error, _operation) => {
            if (`${error?.statusCode}`.charAt(0) == "4" ||
                error?.result?.errors?.[0]?.extensions?.code === "UNAUTHENTICATED") {
                return false;
            }
            return true;
        },
    },
});
const additiveLink = (0, client_1.from)([
    retryLink,
    errorLink,
    new client_1.HttpLink({
        uri: `${process.env.NEXT_PUBLIC_CORE_URL}/api/v3/e/${process.env.NEXT_PUBLIC_CAISY_PROJECT_ID}/graphql`,
        headers: {
            "x-caisy-apikey": process.env.CAISY_API_KEY,
        },
        fetch: customFetch,
    }),
]);
const additiveLinkWithPreview = (0, client_1.from)([
    retryLink,
    errorLink,
    new client_1.HttpLink({
        uri: `${process.env.NEXT_PUBLIC_CORE_URL}/api/v3/e/${process.env.NEXT_PUBLIC_CAISY_PROJECT_ID}/graphql`,
        headers: {
            "x-caisy-apikey": process.env.CAISY_API_KEY,
            "x-caisy-preview": "true",
        },
        fetch: customFetch,
    }),
]);
const defaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
    },
};
exports.publishedClient = new client_1.ApolloClient({
    link: additiveLink,
    cache: new client_1.InMemoryCache(),
    defaultOptions,
});
exports.previewClient = new client_1.ApolloClient({
    link: additiveLinkWithPreview,
    cache: new client_1.InMemoryCache(),
    defaultOptions,
});
