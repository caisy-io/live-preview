import { GraphQLClient } from "graphql-request";
import { print } from "graphql";
import { getSdk as getSdkWithClient, Requester } from "./__generated/sdk";

const requester: Requester<any> = async (doc: any, vars: any) => {
  const CAISY_PROJECT_ID = process.env.CAISY_PROJECT_ID;
  const CAISY_API_KEY = process.env.CAISY_API_KEY;
  const NODE_ENV = process.env.NODE_ENV;
  const DRAFT_MODE = process.env.USE_DRAFT_MODE === "true";
  const NEXT_PUBLIC_CORE_URL = process.env.NEXT_PUBLIC_CORE_URL;
  if (!CAISY_PROJECT_ID || CAISY_PROJECT_ID == "") {
    throw new Error(
      "CAISY_PROJECT_ID is not defined - please add it to the env file"
    );
  }
  if (!CAISY_API_KEY || CAISY_API_KEY == "") {
    throw new Error(
      "CAISY_API_KEY is not defined - please add it to the env file"
    );
  }

  const client = new GraphQLClient(
    `${NEXT_PUBLIC_CORE_URL}/api/e/v4/${CAISY_PROJECT_ID}/graphql`,
    {
      headers: {
        "x-caisy-apikey": `${CAISY_API_KEY}`,
      },
    }
  );

  const previewClient = new GraphQLClient(
    `${NEXT_PUBLIC_CORE_URL}/api/e/v4/${CAISY_PROJECT_ID}/graphql`,
    {
      headers: {
        "x-caisy-apikey": `${CAISY_API_KEY}`,
        "x-caisy-preview": "true",
      },
    }
  );

  try {
    if (DRAFT_MODE) {
      const res = await previewClient.rawRequest(print(doc), vars);
      return res?.data as any;
    } else {
      const res = await client.rawRequest(print(doc), vars);
      return res?.data as any;
    }
  } catch (err: any) {
    if (NODE_ENV == "development") {
      console.error(
        "Error in GraphQL request:",
        "\n" + print(doc) + "\n",
        vars,
        "\n" + err.message
      );
    } else {
      console.error(err);
    }
  }
};

export const caisySDK = getSdkWithClient(requester);
