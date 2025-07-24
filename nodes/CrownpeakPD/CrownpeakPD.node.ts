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
    subtitle: '={{$parameter["operation"]}}',
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
            name: "Update Product",
            value: "updateProduct",
            description: "Update existing product item attributes",
            action: "Update product",
          },
          {
            name: "Delete Product",
            value: "deleteProduct",
            description: "Delete product item",
            action: "Delete product",
          },
          {
            name: "Get Token",
            value: "getToken",
            description: "Get authentication token response",
            action: "Get token",
          },
          {
            name: "Create Item Schema",
            value: "createItemSchema",
            description: "Create a new item schema",
            action: "Create item schema",
          },
          {
            name: "Update Item Schema",
            value: "updateItemSchema",
            description: "Update an existing item schema",
            action: "Update item schema",
          },
          {
            name: "Delete Item Schema",
            value: "deleteItemSchema",
            description: "Delete an item schema",
            action: "Delete item schema",
          },
          {
            name: "Get Item Schema",
            value: "getItemSchema",
            description: "Get an item schema by name and version",
            action: "Get item schema",
          },
        ],
        default: "createProduct",
      },
      {
        displayName: "Tenant",
        name: "tenant",
        type: "string",
        default: "solutions",
        description: "Tenant identifier (e.g., solutions)",
        required: true,
        displayOptions: {
          show: {
            operation: ["createProduct", "updateProduct", "deleteProduct"],
          },
        },
      },
      {
        displayName: "Environment",
        name: "environment",
        type: "string",
        default: "cidp-test",
        description: "Environment name (e.g., cidp-test, production)",
        required: true,
        displayOptions: {
          show: {
            operation: ["createProduct", "updateProduct", "deleteProduct"],
          },
        },
      },
      {
        displayName: "FHR Validation",
        name: "fhrValidation",
        type: "boolean",
        default: false,
        description: "Enable FHR validation?",
        required: true,
        displayOptions: {
          show: {
            operation: ["createProduct", "updateProduct"],
          },
        },
      },
      {
        displayName: "Product Data",
        name: "contentData",
        type: "string",
        required: true,
        default: "",
        description: "The data for the product item (JSON format). For CREATE: full item data, for UPDATE: only attributes to update, for DELETE: item identification (id, catalogVersion, type)",
        displayOptions: {
          show: {
            operation: ["createProduct", "updateProduct", "deleteProduct"],
          },
        },
      },
      {
        displayName: "Tenant",
        name: "schemaTenant",
        type: "string",
        default: "solutions",
        description: "Tenant identifier for schema operations",
        required: true,
        displayOptions: {
          show: {
            operation: ["createItemSchema", "updateItemSchema", "deleteItemSchema", "getItemSchema"],
          },
        },
      },
      {
        displayName: "Environment",
        name: "schemaEnvironment",
        type: "string",
        default: "cidp-test",
        description: "Environment name for schema operations",
        required: true,
        displayOptions: {
          show: {
            operation: ["createItemSchema", "updateItemSchema", "deleteItemSchema", "getItemSchema"],
          },
        },
      },
      {
        displayName: "Schema Name",
        name: "schemaName",
        type: "string",
        default: "",
        description: "Name of the item schema",
        required: true,
        displayOptions: {
          show: {
            operation: ["updateItemSchema", "deleteItemSchema", "getItemSchema"],
          },
        },
      },
      {
        displayName: "Schema Version",
        name: "schemaVersion",
        type: "string",
        default: "",
        description: "Version of the item schema (required for delete and get operations)",
        required: true,
        displayOptions: {
          show: {
            operation: ["deleteItemSchema", "getItemSchema"],
          },
        },
      },
      {
        displayName: "Schema Data",
        name: "schemaData",
        type: "string",
        required: true,
        default: "",
        description: "The schema definition (JSON format). Example: {\"name\": \"product\", \"attributes\": [{\"name\": \"title\", \"type\": \"TEXT\"}]}",
        displayOptions: {
          show: {
            operation: ["createItemSchema", "updateItemSchema"],
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
            const productData = this.getNodeParameter("contentData", i) as string;
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const fhrValidation = this.getNodeParameter("fhrValidation", i) as boolean;
            const url = `https://items.attraqt.io/items?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&fhrValidation=${fhrValidation}`;
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
          case "updateProduct": {
            const productData = this.getNodeParameter("contentData", i) as string;
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const fhrValidation = this.getNodeParameter("fhrValidation", i) as boolean;
            const url = `https://items.attraqt.io/items?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&fhrValidation=${fhrValidation}`;
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "PATCH",
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
          case "deleteProduct": {
            const productData = this.getNodeParameter("contentData", i) as string;
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const url = `https://items.attraqt.io/items/delete?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
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
          case "createItemSchema": {
            const schemaData = this.getNodeParameter("schemaData", i) as string;
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter("schemaEnvironment", i) as string;
            const url = `https://items.attraqt.io/item-schemas?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              body: schemaData,
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "updateItemSchema": {
            const schemaData = this.getNodeParameter("schemaData", i) as string;
            const schemaName = this.getNodeParameter("schemaName", i) as string;
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter("schemaEnvironment", i) as string;
            const url = `https://items.attraqt.io/item-schemas/${encodeURIComponent(schemaName)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "PUT",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              body: schemaData,
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "deleteItemSchema": {
            const schemaName = this.getNodeParameter("schemaName", i) as string;
            const schemaVersion = this.getNodeParameter("schemaVersion", i) as string;
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter("schemaEnvironment", i) as string;
            const url = `https://items.attraqt.io/item-schemas/${encodeURIComponent(schemaName)}/${encodeURIComponent(schemaVersion)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "DELETE",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "getItemSchema": {
            const schemaName = this.getNodeParameter("schemaName", i) as string;
            const schemaVersion = this.getNodeParameter("schemaVersion", i) as string;
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter("schemaEnvironment", i) as string;
            const url = `https://items.attraqt.io/item-schemas/${encodeURIComponent(schemaName)}/${encodeURIComponent(schemaVersion)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "GET",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              json: true,
            };
            responseData = await this.helpers.request(options);
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
