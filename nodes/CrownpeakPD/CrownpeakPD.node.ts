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
    displayName: "Fredhopper Product Discovery",
    name: "crownpeakPD",
    icon: "file:crownpeak.svg",
    group: ["input"],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Interact with Fredhopper Product Discovery API",
    defaults: {
      name: "Fredhopper Product Discovery",
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
            name: "Upsert Items",
            value: "upsertItems",
            description: "Create a new product item",
            action: "Upsert items",
          },
          {
            name: "Patch Items",
            value: "patchItems",
            description: "Update existing product item attributes",
            action: "Patch items",
          },
          {
            name: "Delete Items",
            value: "deleteItems",
            description: "Delete product item",
            action: "Delete items",
          },
          {
            name: "Get Token",
            value: "getToken",
            description: "Get authentication token response",
            action: "Get token",
          },
          {
            name: "Create an Item Schema",
            value: "createItemSchema",
            description: "Create a new item schema",
            action: "Create item schema",
          },
          {
            name: "Update an Item Schema",
            value: "updateItemSchema",
            description: "Update an existing item schema",
            action: "Update item schema",
          },
          {
            name: "Delete an Item Schema",
            value: "deleteItemSchema",
            description: "Delete an item schema",
            action: "Delete item schema",
          },
          {
            name: "Get an Item Schema",
            value: "getItemSchema",
            description: "Get an item schema by name and version",
            action: "Get item schema",
          },
          {
            name: "Create Catalog",
            value: "createCatalog",
            description: "Create a new catalog",
            action: "Create catalog",
          },
          {
            name: "Delete Catalog",
            value: "deleteCatalog",
            description: "Delete an inactive catalog",
            action: "Delete catalog",
          },
          {
            name: "Activate Catalog",
            value: "activateCatalog",
            description: "Activate a catalog version",
            action: "Activate catalog",
          },
          {
            name: "Get Active Catalog",
            value: "getActiveCatalog",
            description: "Get the currently active catalog version",
            action: "Get active catalog",
          },
          {
            name: "List Catalogs",
            value: "listCatalogs",
            description: "List all catalogs",
            action: "List catalogs",
          },
          {
            name: "Create Category Tree",
            value: "createCategoryTree",
            description: "Create a new category tree",
            action: "Create category tree",
          },
          {
            name: "Update Category Tree",
            value: "updateCategoryTree",
            description: "Update an existing category tree",
            action: "Update category tree",
          },
          {
            name: "List Category Trees",
            value: "listCategoryTrees",
            description: "List all category trees",
            action: "List category trees",
          },
          {
            name: "Get Category Tree",
            value: "getCategoryTree",
            description: "Get a category tree by name and version",
            action: "Get category tree",
          },
          {
            name: "Delete Category Tree",
            value: "deleteCategoryTree",
            description: "Delete a category tree",
            action: "Delete category tree",
          },
          {
            name: "Set Default Locale",
            value: "setDefaultLocale",
            description: "Set the default locale for an item schema",
            action: "Set default locale",
          },
          {
            name: "Get Default Locale",
            value: "getDefaultLocale",
            description: "Get the default locale for an item schema",
            action: "Get default locale",
          },
          {
            name: "Delete Default Locale",
            value: "deleteDefaultLocale",
            description: "Delete the default locale for an item schema",
            action: "Delete default locale",
          },
        ],
        default: "upsertItems",
      },
      {
        displayName: "Tenant",
        name: "categoryTreeTenant",
        type: "string",
        default: "solutions",
        description: "Tenant identifier for category tree operations",
        required: true,
        displayOptions: {
          show: {
            operation: [
              "createCategoryTree",
              "updateCategoryTree",
              "listCategoryTrees",
              "getCategoryTree",
              "deleteCategoryTree",
            ],
          },
        },
      },
      {
        displayName: "Environment",
        name: "categoryTreeEnvironment",
        type: "string",
        default: "cidp-test",
        description: "Environment name for category tree operations",
        required: true,
        displayOptions: {
          show: {
            operation: [
              "createCategoryTree",
              "updateCategoryTree",
              "listCategoryTrees",
              "getCategoryTree",
              "deleteCategoryTree",
            ],
          },
        },
      },
      {
        displayName: "FHR Validation",
        name: "categoryTreeFhrValidation",
        type: "boolean",
        default: false,
        description: "Enable FHR (Fredhopper) validation for category names (alphanumerical characters only [A-Za-z0-9])",
        required: false,
        displayOptions: {
          show: {
            operation: [
              "createCategoryTree",
              "updateCategoryTree",
            ],
          },
        },
      },
      {
        displayName: "Category Tree Name",
        name: "categoryTreeName",
        type: "string",
        default: "",
        description: "Name of the category tree",
        required: true,
        displayOptions: {
          show: {
            operation: ["updateCategoryTree", "getCategoryTree", "deleteCategoryTree"],
          },
        },
      },
      {
        displayName: "Category Tree Version",
        name: "categoryTreeVersion",
        type: "string",
        default: "",
        description: "Version of the category tree (required for get and delete operations)",
        required: true,
        displayOptions: {
          show: {
            operation: ["getCategoryTree", "deleteCategoryTree"],
          },
        },
      },
      {
        displayName: "Category Tree Data",
        name: "categoryTreeData",
        type: "string",
        required: true,
        default: "",
        description: "The category tree definition (JSON format).",
        displayOptions: {
          show: {
            operation: ["createCategoryTree", "updateCategoryTree"],
          },
        },
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
            operation: ["upsertItems", "patchItems", "deleteItems"],
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
            operation: ["upsertItems", "patchItems", "deleteItems"],
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
            operation: ["upsertItems", "patchItems", "setDefaultLocale", "getDefaultLocale", "deleteDefaultLocale"],
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
            operation: ["upsertItems", "patchItems", "deleteItems"],
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
            operation: ["createItemSchema", "updateItemSchema", "deleteItemSchema", "getItemSchema", "setDefaultLocale", "getDefaultLocale", "deleteDefaultLocale"],
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
            operation: ["createItemSchema", "updateItemSchema", "deleteItemSchema", "getItemSchema", "setDefaultLocale", "getDefaultLocale", "deleteDefaultLocale"],
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
      {
        displayName: "Default Locale",
        name: "defaultLocale",
        type: "string",
        default: "en",
        description: "The locale code to set as default (e.g., 'en', 'fr', 'es', 'en_US', 'fr_FR'). Format: language_code or language_code_country_code",
        required: true,
        displayOptions: {
          show: {
            operation: ["setDefaultLocale", "deleteDefaultLocale"],
          },
        },
      },
      {
        displayName: "Tenant",
        name: "catalogTenant",
        type: "string",
        default: "solutions",
        description: "Tenant identifier for catalog operations",
        required: true,
        displayOptions: {
          show: {
            operation: ["createCatalog", "deleteCatalog", "activateCatalog", "getActiveCatalog", "listCatalogs"],
          },
        },
      },
      {
        displayName: "Environment",
        name: "catalogEnvironment",
        type: "string",
        default: "cidp-test",
        description: "Environment name for catalog operations",
        required: true,
        displayOptions: {
          show: {
            operation: ["createCatalog", "deleteCatalog", "activateCatalog", "getActiveCatalog", "listCatalogs"],
          },
        },
      },
      {
        displayName: "Catalog Data",
        name: "catalogData",
        type: "string",
        required: true,
        default: "",
        description: "The catalog definition (JSON format). Example: {\"catalogItemSchemas\": [{\"name\": \"product\", \"version\": 1}], \"catalogCategoryTrees\": [{\"name\": \"root_name\", \"version\": 2}]}",
        displayOptions: {
          show: {
            operation: ["createCatalog"],
          },
        },
      },
      {
        displayName: "Catalog Version",
        name: "catalogVersion",
        type: "string",
        default: "",
        description: "Version of the catalog (required for delete and activate operations)",
        required: true,
        displayOptions: {
          show: {
            operation: ["deleteCatalog", "activateCatalog"],
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
          case "upsertItems": {
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
          case "patchItems": {
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
          case "deleteItems": {
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
          case "setDefaultLocale": {
            const defaultLocale = this.getNodeParameter("defaultLocale", i) as string;
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter("schemaEnvironment", i) as string;
            const fhrValidation = this.getNodeParameter("fhrValidation", i) as boolean;
            const url = `https://items.attraqt.io/locale/${encodeURIComponent(defaultLocale)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&fhrValidation=${fhrValidation}`;
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
              body: "",
              json: false,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "getDefaultLocale": {
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter("schemaEnvironment", i) as string;
            const fhrValidation = this.getNodeParameter("fhrValidation", i) as boolean;
            const url = `https://items.attraqt.io/locale?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&fhrValidation=${fhrValidation}`;
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
          case "deleteDefaultLocale": {
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter("schemaEnvironment", i) as string;
            const fhrValidation = this.getNodeParameter("fhrValidation", i) as boolean;
            const url = `https://items.attraqt.io/locale?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&fhrValidation=${fhrValidation}`;
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
          case "createCatalog": {
            const catalogData = this.getNodeParameter("catalogData", i) as string;
            const tenant = this.getNodeParameter("catalogTenant", i) as string;
            const environment = this.getNodeParameter("catalogEnvironment", i) as string;
            const url = `https://items.attraqt.io/catalogs?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              body: catalogData,
              json: true,
            };
            
            const response = await this.helpers.request(options);
            const catalogVersion = response?.version || response?.catalogVersion || 'unknown';
            responseData = {
              success: true,
              message: `Catalog created successfully with version ${catalogVersion}`,
              catalogVersion: catalogVersion,
              tenant: tenant,
              environment: environment,
              status: "inactive",
              note: "New catalogs are created as inactive. Use 'Activate Catalog' to activate it.",
              response: response
            };
            break;
          }
          case "deleteCatalog": {
            const catalogVersion = this.getNodeParameter("catalogVersion", i) as string;
            const tenant = this.getNodeParameter("catalogTenant", i) as string;
            const environment = this.getNodeParameter("catalogEnvironment", i) as string;
            const url = `https://items.attraqt.io/catalogs/${encodeURIComponent(catalogVersion)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "DELETE",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              json: false,
            };
            
            const response = await this.helpers.request(options);
            responseData = {
              success: true,
              message: `Catalog version ${catalogVersion} deleted successfully`,
              catalogVersion: catalogVersion,
              tenant: tenant,
              environment: environment,
              response: response || "Catalog deleted successfully"
            };
            break;
          }
          case "activateCatalog": {
            const catalogVersion = this.getNodeParameter("catalogVersion", i) as string;
            const tenant = this.getNodeParameter("catalogTenant", i) as string;
            const environment = this.getNodeParameter("catalogEnvironment", i) as string;
            const url = `https://items.attraqt.io/catalogs/activate/${encodeURIComponent(catalogVersion)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              json: false,
            };
            
            const response = await this.helpers.request(options);
            responseData = {
              success: true,
              message: `Catalog version ${catalogVersion} activated successfully`,
              catalogVersion: catalogVersion,
              tenant: tenant,
              environment: environment,
              status: "active",
              response: response || "Catalog activated successfully"
            };
            break;
          }
          case "getActiveCatalog": {
            const tenant = this.getNodeParameter("catalogTenant", i) as string;
            const environment = this.getNodeParameter("catalogEnvironment", i) as string;
            const url = `https://items.attraqt.io/catalogs/active?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
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
          case "listCatalogs": {
            const tenant = this.getNodeParameter("catalogTenant", i) as string;
            const environment = this.getNodeParameter("catalogEnvironment", i) as string;
            const url = `https://items.attraqt.io/catalogs?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
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
          case "createCategoryTree": {
            const categoryTreeData = this.getNodeParameter("categoryTreeData", i) as string;
            const tenant = this.getNodeParameter("categoryTreeTenant", i) as string;
            const environment = this.getNodeParameter("categoryTreeEnvironment", i) as string;
            const fhrValidation = this.getNodeParameter("categoryTreeFhrValidation", i) as boolean;
            
            let url = `https://items.attraqt.io/category-trees?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            if (fhrValidation) {
              url += "&fhrValidation=true";
            }
            
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              body: categoryTreeData,
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "updateCategoryTree": {
            const categoryTreeData = this.getNodeParameter("categoryTreeData", i) as string;
            const categoryTreeName = this.getNodeParameter("categoryTreeName", i) as string;
            const tenant = this.getNodeParameter("categoryTreeTenant", i) as string;
            const environment = this.getNodeParameter("categoryTreeEnvironment", i) as string;
            const fhrValidation = this.getNodeParameter("categoryTreeFhrValidation", i) as boolean;
            
            let url = `https://items.attraqt.io/category-trees/${encodeURIComponent(categoryTreeName)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            if (fhrValidation) {
              url += "&fhrValidation=true";
            }
            
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "PUT",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              body: categoryTreeData,
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "listCategoryTrees": {
            const tenant = this.getNodeParameter("categoryTreeTenant", i) as string;
            const environment = this.getNodeParameter("categoryTreeEnvironment", i) as string;
            const url = `https://items.attraqt.io/category-trees?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
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
          case "getCategoryTree": {
            const categoryTreeName = this.getNodeParameter("categoryTreeName", i) as string;
            const categoryTreeVersion = this.getNodeParameter("categoryTreeVersion", i) as string;
            const tenant = this.getNodeParameter("categoryTreeTenant", i) as string;
            const environment = this.getNodeParameter("categoryTreeEnvironment", i) as string;
            const url = `https://items.attraqt.io/category-trees/${encodeURIComponent(categoryTreeName)}/${encodeURIComponent(categoryTreeVersion)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
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
          case "deleteCategoryTree": {
            const categoryTreeName = this.getNodeParameter("categoryTreeName", i) as string;
            const categoryTreeVersion = this.getNodeParameter("categoryTreeVersion", i) as string;
            const tenant = this.getNodeParameter("categoryTreeTenant", i) as string;
            const environment = this.getNodeParameter("categoryTreeEnvironment", i) as string;
            const url = `https://items.attraqt.io/category-trees/${encodeURIComponent(categoryTreeName)}/${encodeURIComponent(categoryTreeVersion)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
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
