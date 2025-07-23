import {
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
  IExecuteFunctions,
  IHttpRequestMethods,
  NodeOperationError,
  IHttpRequestOptions,
} from "n8n-workflow";

export class CrownpeakPD implements INodeType {
  description: INodeTypeDescription = {
    displayName: "CrownPeak PD",
    name: "crownpeakPD",
    icon: "file:crownpeak.svg",
    group: ["input"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Interact with CrownPeak PD API",
    defaults: {
      name: "CrownPeak PD",
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: "crownpeakPDApi",
        required: true,
      },
    ],
    requestDefaults: {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    properties: [
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Create Product",
            value: "createProduct",
            description: "Create a new product item",
            action: "Create product",
          },
          {
            name: "Get Token",
            value: "getToken",
            description: "Get authentication token response",
            action: "Get token",
          },
        ],
        default: "createProduct",
      },
      {
        displayName: "Product Data",
        name: "contentData",
        type: "string",
        required: true,
        default: "",
        description: "The data for the product item (JSON or text)",
        displayOptions: {
          show: {
            operation: ["createProduct"],
          },
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: IDataObject[] = [];

    async function getBearerToken(self: IExecuteFunctions): Promise<string> {
      const credentials = await self.getCredentials("crownpeakPDApi");
      const username = credentials.username as string;
      const password = credentials.password as string;
      const authUrl = credentials.authUrl as string;
      const basicAuth = Buffer.from(`${username}:${password}`).toString(
        "base64"
      );
      const options: IHttpRequestOptions = {
        method: "POST",
        url: authUrl,
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      };
      try {
        const response = await self.helpers.request(options);
        const tokenData =
          typeof response === "string" ? JSON.parse(response) : response;
        if (!tokenData.access_token) {
          throw new NodeOperationError(
            self.getNode(),
            "Failed to obtain access token"
          );
        }
        return tokenData.access_token;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Unknown authentication error";
        throw new NodeOperationError(
          self.getNode(),
          `Authentication failed: ${errorMessage}`
        );
      }
    }

    for (let i = 0; i < items.length; i++) {
      try {
        const operation = this.getNodeParameter("operation", i) as string;
        let responseData: IDataObject = {};

        switch (operation) {
          case "createProduct": {
            const productData = this.getNodeParameter(
              "contentData",
              i
            ) as string;
            const url = "https://api.crownpeak.net/pd/products";
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              body: productData,
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "getToken": {
            // Get credentials
            const credentials = await this.getCredentials("crownpeakPDApi");
            const username = credentials.username as string;
            const password = credentials.password as string;
            const authUrl = credentials.authUrl as string;
            const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");
            const options: IHttpRequestOptions = {
              method: "POST",
              url: authUrl,
              headers: {
                Authorization: `Basic ${basicAuth}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: "grant_type=client_credentials",
            };
            const response = await this.helpers.request(options);
            responseData = typeof response === "string" ? JSON.parse(response) : response;
            break;
          }
          default:
            throw new NodeOperationError(
              this.getNode(),
              `The operation "${operation}" is not supported!`
            );
        }

        returnData.push(responseData);
      } catch (error) {
        if (this.continueOnFail()) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error occurred";
          returnData.push({ error: errorMessage });
          continue;
        }
        throw error;
      }
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}
