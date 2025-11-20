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
    name: "crownpeakPd",
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
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Authentication",
            value: "authentication",
          },
          {
            name: "Catalog",
            value: "catalog",
          },
          {
            name: "Category Tree",
            value: "categoryTree",
          },
          {
            name: "Feedback",
            value: "feedback",
          },
          {
            name: "Item",
            value: "items",
          },
          {
            name: "Locale",
            value: "locale",
          },
          {
            name: "Schema",
            value: "schema",
          },
        ],
        default: "items",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["authentication"],
          },
        },
        options: [
          {
            name: "Get Token",
            value: "getToken",
            action: "Get authentication token",
          },
        ],
        default: "getToken",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["schema"],
          },
        },
        options: [
          {
            name: "List All Schemas",
            value: "listSchemas",
            action: "List all schemas",
          },
        ],
        default: "listSchemas",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["feedback"],
          },
        },
        options: [
          {
            name: "Catalog Activation Statistics",
            value: "catalogActivationStats",
            action: "Get catalog activation statistics",
          },
          {
            name: "Created Catalog Versions",
            value: "createdCatalogVersions",
            action: "Get created catalog versions",
          },
          {
            name: "Summary of Updates",
            value: "summaryOfUpdates",
            action: "Get summary of updates",
          },
          {
            name: "Summary of Updates (Time Window)",
            value: "summaryOfUpdatesTimeWindow",
            action: "Get summary of updates within time window",
          },
          {
            name: "Summary of Updates (By State)",
            value: "summaryOfUpdatesByState",
            action: "Get summary of updates with specified state",
          },
          {
            name: "Summary of Updates (By State & Time)",
            value: "summaryOfUpdatesByStateTime",
            action: "Get summary of updates with state and time window",
          },
          {
            name: "List Updates (By State)",
            value: "listUpdatesByState",
            action: "Get list of updates with specified state",
          },
          {
            name: "List Updates (By State & Time)",
            value: "listUpdatesByStateTime",
            action: "Get list of updates with state and time window",
          },
          {
            name: "Single Update Feedback",
            value: "singleUpdateFeedback",
            action: "Get single update feedback",
          },
        ],
        default: "summaryOfUpdates",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["items"],
          },
        },
      options: [
        {
          name: "Create an Item Schema",
          value: "createItemSchema",
          action: "Create an item schema",
        },
        {
          name: "Delete an Item Schema",
          value: "deleteItemSchema",
          action: "Delete an item schema",
        },
        {
          name: "Delete Items",
          value: "deleteItems",
          action: "Delete items",
        },
        {
          name: "Get an Item Schema",
          value: "getItemSchema",
          action: "Get an item schema",
        },
        {
          name: "Patch Items",
          value: "patchItems",
          action: "Patch items",
        },
        {
          name: "Update an Item Schema",
          value: "updateItemSchema",
          action: "Update an item schema",
        },
        {
          name: "Upsert Items",
          value: "upsertItems",
          action: "Upsert items",
        },
        {
          name: "Create Batch",
          value: "createBatch",
          action: "Create a batch",
        },
        {
          name: "List Batches",
          value: "listBatches",
          action: "List batches",
        },
        {
          name: "Add Items to Batch",
          value: "addItemsToBatch",
          action: "Add items to batch",
        },
        {
          name: "Modify Items in Batch",
          value: "modifyItemsInBatch",
          action: "Modify items in batch",
        },
        {
          name: "Delete Items from Batch",
          value: "deleteItemsFromBatch",
          action: "Delete items from batch",
        },
        {
          name: "Submit Batch Ingestion",
          value: "submitBatchIngestion",
          action: "Submit batch ingestion",
        },
        {
          name: "Get Batch Ingestion Status",
          value: "getBatchIngestionStatus",
          action: "Get batch ingestion status",
        },
        {
          name: "List Batch Ingestions",
          value: "listBatchIngestions",
          action: "List batch ingestions",
        },
        {
          name: "Delete Batch Ingestion",
          value: "deleteBatchIngestion",
          action: "Delete batch ingestion",
        },
      ],
      default: "upsertItems",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["catalog"],
          },
        },
        options: [
          {
            name: "Activate a Catalog Version",
            value: "activateCatalog",
            action: "Activate a catalog version",
          },
          {
            name: "Create a Catalog",
            value: "createCatalog",
            action: "Create a catalog",
          },
          {
            name: "Create Catalog With Default Batch",
            value: "createDefaultCatalogBatch",
            action: "Create a catalog with default batch",
          },
          {
            name: "Delete Catalog",
            value: "deleteCatalog",
            action: "Delete a catalog",
          },
          {
            name: "Get Active Catalog Version",
            value: "getActiveCatalog",
            action: "Get active catalog version",
          },
          {
            name: "List Catalogs",
            value: "listCatalogs",
            action: "List catalogs",
          },
        ],
        default: "listCatalogs",
      },
      {
        displayName: "Return All",
        name: "returnAll",
        type: "boolean",
        default: true,
        displayOptions: {
          show: {
            resource: ["catalog"],
            operation: ["listCatalogs"],
          },
        },
        description: "If all results should be returned or only up to a limit.",
      },
      {
        displayName: "Simplify Output",
        name: "simplify",
        type: "boolean",
        default: false,
        description: "If enabled, only a simplified summary of the response will be returned instead of the full/raw output.",
        displayOptions: {
          show: {
            resource: ["catalog"],
            operation: ["listCatalogs"],
          },
        },
      },
      {
        displayName: "Limit",
        name: "limit",
        type: "number",
        typeOptions: {
          minValue: 1,
          maxValue: 1000,
        },
        default: 100,
        displayOptions: {
          show: {
            resource: ["catalog"],
            operation: ["listCatalogs"],
            returnAll: [false],
          },
        },
        description: "Max number of results to return.",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["categoryTree"],
          },
        },
        options: [
          {
            name: "Create a Category Tree",
            value: "createCategoryTree",
            action: "Create a category tree",
          },
          {
            name: "Delete a Category Tree",
            value: "deleteCategoryTree",
            action: "Delete a category tree",
          },
          {
            name: "Get a Category Tree",
            value: "getCategoryTree",
            action: "Get a category tree",
          },
          {
            name: "List Category Trees",
            value: "listCategoryTrees",
            action: "List category trees",
          },
          {
            name: "Update a Category Tree",
            value: "updateCategoryTree",
            action: "Update a category tree",
          },
        ],
        default: "listCategoryTrees",
      },
      {
        displayName: "Return All",
        name: "returnAll",
        type: "boolean",
        default: true,
        displayOptions: {
          show: {
            resource: ["categoryTree"],
            operation: ["listCategoryTrees"],
          },
        },
        description: "If all results should be returned or only up to a limit.",
      },
      {
        displayName: "Simplify Output",
        name: "simplify",
        type: "boolean",
        default: false,
        description: "If enabled, only a simplified summary of the response will be returned instead of the full/raw output.",
        displayOptions: {
          show: {
            resource: ["categoryTree"],
            operation: ["listCategoryTrees"],
          },
        },
      },
      {
        displayName: "Limit",
        name: "limit",
        type: "number",
        typeOptions: {
          minValue: 1,
          maxValue: 1000,
        },
        default: 100,
        displayOptions: {
          show: {
            resource: ["categoryTree"],
            operation: ["listCategoryTrees"],
            returnAll: [false],
          },
        },
        description: "Max number of results to return.",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["locale"],
          },
        },
        options: [
          {
            name: "Set Default Locale",
            value: "setDefaultLocale",
            action: "Set default locale",
          },
          {
            name: "Get Default Locale",
            value: "getDefaultLocale",
            action: "Get default locale",
          },
          {
            name: "Delete Default Locale",
            value: "deleteDefaultLocale",
            action: "Delete default locale",
          },
        ],
        default: "getDefaultLocale",
      },
      {
        displayName: "Tenant",
        name: "tenant",
        type: "string",
        default: "solutions",
        required: true,
        displayOptions: {
          show: {
            resource: ["items"],
          },
          hide: {
            operation: [
              "createItemSchema",
              "updateItemSchema",
              "getItemSchema",
              "deleteItemSchema",
            ],
          },
        },
      },
      {
        displayName: "Environment",
        name: "environment",
        type: "string",
        default: "cidp-test",
        required: true,
        displayOptions: {
          show: {
            resource: ["items"],
          },
          hide: {
            operation: [
              "createItemSchema",
              "updateItemSchema",
              "getItemSchema",
              "deleteItemSchema",
            ],
          },
        },
      },
      {
        displayName: "FHR Validation",
        name: "fhrValidation",
        type: "boolean",
        default: false,
        required: true,
        displayOptions: {
          show: {
            resource: ["items"],
          },
          hide: {
            operation: [
              "createItemSchema",
              "updateItemSchema",
              "getItemSchema",
              "deleteItemSchema",
            ],
          },
        },
      },
      {
        displayName: "Product Data",
        name: "contentData",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["upsertItems", "patchItems", "deleteItems"],
          },
        },
      },
      {
        displayName: "Tenant",
        name: "schemaTenant",
        type: "string",
        default: "solutions",
        required: true,
        displayOptions: {
          show: {
            resource: ["items"],
            operation: [
              "createItemSchema",
              "updateItemSchema",
              "getItemSchema",
              "deleteItemSchema",
            ],
          },
        },
      },
      {
        displayName: "Environment",
        name: "schemaEnvironment",
        type: "string",
        default: "cidp-test",
        required: true,
        displayOptions: {
          show: {
            resource: ["items"],
            operation: [
              "createItemSchema",
              "updateItemSchema",
              "getItemSchema",
              "deleteItemSchema",
            ],
          },
        },
      },
      {
        displayName: "Schema Name",
        name: "schemaName",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            resource: ["items"],
            operation: [
              "updateItemSchema",
              "deleteItemSchema",
              "getItemSchema",
            ],
          },
        },
      },
      {
        displayName: "Schema Version",
        name: "schemaVersion",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            resource: ["items"],
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
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["createItemSchema", "updateItemSchema"],
          },
        },
      },
      {
        displayName: "Batch ID",
        name: "batchId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            resource: ["items"],
            operation: [
              "addItemsToBatch",
              "modifyItemsInBatch",
              "deleteItemsFromBatch"
            ],
          },
        },
        default: "",
      },
      {
        displayName: "Batch Import ID",
        name: "batchImportId",
        type: "string",
        required: false,
        default: "",
        description: "Batch ID returned by the batch creation call. Leave empty when ingesting the default catalog batch.",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["submitBatchIngestion"],
          },
        },
      },
      {
        displayName: "Catalog Version",
        name: "submissionCatalogVersion",
        type: "string",
        required: true,
        default: "",
        description: "Required. Version of the catalog in which the batch must be ingested (e.g., '11').",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["submitBatchIngestion"],
          },
        },
      },
      {
        displayName: "Promote Catalog on Completion",
        name: "promoteCatalogOnCompletion",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether the catalog must be promoted after having been loaded.",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["submitBatchIngestion"],
          },
        },
      },
      {
        displayName: "Minimum Item Count",
        name: "minItemCount",
        type: "number",
        required: false,
        default: 0,
        description: "Minimum number of items in the batch that should pass schema validation. Ingestion will fail if this threshold is not reached.",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["submitBatchIngestion"],
          },
        },
      },
      {
        displayName: "Minimum Success Rate Percent",
        name: "minSuccessRatePercent",
        type: "number",
        required: false,
        default: 0,
        description: "Minimum percentage of items in the batch that should pass schema validation. Ingestion will fail if this threshold is not reached.",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["submitBatchIngestion"],
          },
        },
      },
      {
        displayName: "Source",
        name: "source",
        type: "string",
        required: false,
        default: "",
        description: "Source of items in the batch, can be any string. This field is only meaningful when used in conjunction with deleteMissingItems.",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["submitBatchIngestion"],
          },
        },
      },
      {
        displayName: "Delete Missing Items",
        name: "deleteMissingItems",
        type: "boolean",
        required: false,
        default: false,
        description: "Whether items with same source present in the catalog but not present in the batch must be deleted.",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["submitBatchIngestion"],
          },
        },
      },
      {
        displayName: "FHR Validation",
        name: "submissionFhrValidation",
        type: "boolean",
        required: false,
        default: false,
        description: "Enable FHR validation for the request.",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["submitBatchIngestion"],
          },
        },
      },
      {
        displayName: "Batch Items",
        name: "batchItems",
        type: "json",
        required: true,
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["addItemsToBatch", "modifyItemsInBatch", "deleteItemsFromBatch"],
          },
        },
        default: "[]",
        description: "JSON array of items to add/modify/delete in the batch.",
      },
      {
        displayName: "Ingestion ID",
        name: "ingestionId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["getBatchIngestionStatus", "deleteBatchIngestion"],
          },
        },
        default: "",
      },
      {
        displayName: "Lookback Duration",
        name: "lookback_duration",
        type: "string",
        required: false,
        default: "",
        description: "Optional lookback duration for filtering ingestions (e.g., '7d', '24h')",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["listBatchIngestions"],
          },
        },
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        required: false,
        default: "",
        options: [
          {
            name: "All",
            value: "",
          },
          {
            name: "Pending",
            value: "pending",
          },
          {
            name: "Running",
            value: "running",
          },
          {
            name: "Completed",
            value: "completed",
          },
          {
            name: "Failed",
            value: "failed",
          },
        ],
        description: "Filter ingestions by status",
        displayOptions: {
          show: {
            resource: ["items"],
            operation: ["listBatchIngestions"],
          },
        },
      },
      {
        displayName: "Tenant",
        name: "catalogTenant",
        type: "string",
        default: "solutions",
        required: true,
        displayOptions: {
          show: {
            resource: ["catalog"],
          },
        },
      },
      {
        displayName: "Environment",
        name: "catalogEnvironment",
        type: "string",
        default: "cidp-test",
        required: true,
        displayOptions: {
          show: {
            resource: ["catalog"],
          },
        },
      },
      {
        displayName: "Catalog Data",
        name: "catalogData",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
          show: {
            resource: ["catalog"],
            operation: ["createCatalog", "createDefaultCatalogBatch"],
          },
        },
      },
      {
        displayName: "Catalog Version",
        name: "catalogVersion",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            resource: ["catalog"],
            operation: ["deleteCatalog", "activateCatalog"],
          },
        },
      },
      {
        displayName: "Tenant",
        name: "categoryTreeTenant",
        type: "string",
        default: "solutions",
        required: true,
        displayOptions: {
          show: {
            resource: ["categoryTree"],
          },
        },
      },
      {
        displayName: "Environment",
        name: "categoryTreeEnvironment",
        type: "string",
        default: "cidp-test",
        required: true,
        displayOptions: {
          show: {
            resource: ["categoryTree"],
          },
        },
      },
      {
        displayName: "FHR Validation",
        name: "categoryTreeFhrValidation",
        type: "boolean",
        default: false,
        displayOptions: {
          show: {
            resource: ["categoryTree"],
            operation: ["createCategoryTree", "updateCategoryTree"],
          },
        },
      },
      {
        displayName: "Category Tree Name",
        name: "categoryTreeName",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            resource: ["categoryTree"],
            operation: [
              "updateCategoryTree",
              "getCategoryTree",
              "deleteCategoryTree",
            ],
          },
        },
      },
      {
        displayName: "Category Tree Version",
        name: "categoryTreeVersion",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            resource: ["categoryTree"],
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
        displayOptions: {
          show: {
            resource: ["categoryTree"],
            operation: ["createCategoryTree", "updateCategoryTree"],
          },
        },
      },
      {
        displayName: "Tenant",
        name: "localeTenant",
        type: "string",
        default: "solutions",
        required: true,
        displayOptions: {
          show: {
            resource: ["locale"],
          },
        },
      },
      {
        displayName: "Environment",
        name: "localeEnvironment",
        type: "string",
        default: "cidp-test",
        required: true,
        displayOptions: {
          show: {
            resource: ["locale"],
          },
        },
      },
      {
        displayName: "FHR Validation",
        name: "localeFhrValidation",
        type: "boolean",
        default: false,
        required: true,
        displayOptions: {
          show: {
            resource: ["locale"],
          },
        },
      },
      {
        displayName: "Default Locale",
        name: "defaultLocale",
        type: "string",
        default: "en",
        required: true,
        displayOptions: {
          show: {
            resource: ["locale"],
            operation: ["setDefaultLocale", "deleteDefaultLocale"],
          },
        },
      },
      {
        displayName: "Tenant",
        name: "schemaTenantList",
        type: "string",
        default: "solutions",
        required: true,
        displayOptions: {
          show: {
            resource: ["schema"],
          },
        },
      },
      {
        displayName: "Environment",
        name: "schemaEnvironmentList",
        type: "string",
        default: "cidp-test",
        required: true,
        displayOptions: {
          show: {
            resource: ["schema"],
          },
        },
      },
      {
        displayName: "Tenant",
        name: "feedbackTenant",
        type: "string",
        default: "solutions",
        required: true,
        displayOptions: {
          show: {
            resource: ["feedback"],
          },
        },
      },
      {
        displayName: "Environment",
        name: "feedbackEnvironment",
        type: "string",
        default: "cidp-test",
        required: true,
        displayOptions: {
          show: {
            resource: ["feedback"],
          },
        },
      },
      {
        displayName: "Catalog Version",
        name: "feedbackCatalogVersion",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            resource: ["feedback"],
            operation: [
              "catalogActivationStats",
              "summaryOfUpdates",
              "summaryOfUpdatesTimeWindow",
              "summaryOfUpdatesByState",
              "summaryOfUpdatesByStateTime",
              "listUpdatesByState",
              "listUpdatesByStateTime",
              "singleUpdateFeedback",
            ],
          },
        },
      },
      {
        displayName: "State",
        name: "feedbackState",
        type: "options",
        default: "SUCCESS",
        required: true,
        options: [
          { name: "Success", value: "SUCCESS" },
          { name: "Failure", value: "FAILURE" },
          { name: "Pending", value: "PENDING" },
        ],
        displayOptions: {
          show: {
            resource: ["feedback"],
            operation: [
              "summaryOfUpdatesByState",
              "summaryOfUpdatesByStateTime",
              "listUpdatesByState",
              "listUpdatesByStateTime",
            ],
          },
        },
      },
      {
        displayName: "Start Time",
        name: "feedbackStartTime",
        type: "string",
        default: "",
        required: true,
        description: "Start time in ISO 8601 format (e.g., 2023-01-01T00:00:00Z)",
        displayOptions: {
          show: {
            resource: ["feedback"],
            operation: [
              "summaryOfUpdatesTimeWindow",
              "summaryOfUpdatesByStateTime",
              "listUpdatesByStateTime",
            ],
          },
        },
      },
      {
        displayName: "End Time",
        name: "feedbackEndTime",
        type: "string",
        default: "",
        required: true,
        description: "End time in ISO 8601 format (e.g., 2023-12-31T23:59:59Z)",
        displayOptions: {
          show: {
            resource: ["feedback"],
            operation: [
              "summaryOfUpdatesTimeWindow",
              "summaryOfUpdatesByStateTime",
              "listUpdatesByStateTime",
            ],
          },
        },
      },
      {
        displayName: "Offset",
        name: "feedbackOffset",
        type: "number",
        default: 0,
        required: false,
        description: "Number of items to skip",
        displayOptions: {
          show: {
            resource: ["feedback"],
            operation: ["listUpdatesByState", "listUpdatesByStateTime"],
          },
        },
      },
      {
        displayName: "Limit",
        name: "feedbackLimit",
        type: "number",
        default: 100,
        required: false,
        description: "Maximum number of items to return",
        displayOptions: {
          show: {
            resource: ["feedback"],
            operation: ["listUpdatesByState", "listUpdatesByStateTime"],
          },
        },
      },
      {
        displayName: "Update ID",
        name: "feedbackUpdateId",
        type: "string",
        default: "",
        required: true,
        description: "The ID of the update to retrieve feedback for",
        displayOptions: {
          show: {
            resource: ["feedback"],
            operation: ["singleUpdateFeedback"],
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
      const tenantId = credentials.tenantId as string;
      let authUrl = credentials.authUrl as string;
      authUrl = authUrl.replace('{tenantId}', tenantId);
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
        const resource = this.getNodeParameter("resource", i) as string;
        const operation = this.getNodeParameter("operation", i) as string;
        let responseData: IDataObject = {};

        switch (operation) {
          case "listSchemas": {
            const tenant = this.getNodeParameter("schemaTenantList", i) as string;
            const environment = this.getNodeParameter("schemaEnvironmentList", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/item-schemas?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
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
          case "catalogActivationStats": {
            const tenant = this.getNodeParameter("feedbackTenant", i) as string;
            const environment = this.getNodeParameter("feedbackEnvironment", i) as string;
            const catalogVersion = this.getNodeParameter("feedbackCatalogVersion", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/feedback/catalog-version/${encodeURIComponent(catalogVersion)}/full/statistics?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const options: IHttpRequestOptions = {
              method: "GET",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              json: true,
            };
            try {
              responseData = await this.helpers.request(options);
            } catch (error: any) {
              if (error.statusCode === 404) {
                throw new NodeOperationError(
                  this.getNode(),
                  `No feedback data found for catalog version ${catalogVersion}. The Feedback API only contains data for catalogs that have been processed through the system. Try: 1) Wait a few minutes after activation (processing is asynchronous), 2) Use 'Created Catalog Versions' to see which versions have feedback data, 3) Create a new catalog through batch ingestion workflow.`,
                  { itemIndex: i }
                );
              }
              throw error;
            }
            break;
          }
          case "createdCatalogVersions": {
            const tenant = this.getNodeParameter("feedbackTenant", i) as string;
            const environment = this.getNodeParameter("feedbackEnvironment", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/feedback/catalog-version?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&size=100`;
            const options: IHttpRequestOptions = {
              method: "GET",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              json: true,
            };
            try {
              responseData = await this.helpers.request(options);
            } catch (error: any) {
              if (error.statusCode === 404) {
                throw new NodeOperationError(
                  this.getNode(),
                  `No catalog feedback data found for tenant '${tenant}' in environment '${environment}'. The Feedback API tracks catalog creation and activation events. No catalogs have been processed yet, or the feedback system may take time to update after activation (usually a few minutes). Try activating a catalog and waiting, or contact support if catalogs were recently activated.`,
                  { itemIndex: i }
                );
              }
              throw error;
            }
            break;
          }
          case "summaryOfUpdates": {
            const tenant = this.getNodeParameter("feedbackTenant", i) as string;
            const environment = this.getNodeParameter("feedbackEnvironment", i) as string;
            const catalogVersion = this.getNodeParameter("feedbackCatalogVersion", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/feedback/catalog-version/${encodeURIComponent(catalogVersion)}/updates/statistics/summary/relative?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&lastPeriodValue=24&lastPeriodUnit=HOUR&size=100`;
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
          case "summaryOfUpdatesTimeWindow": {
            const tenant = this.getNodeParameter("feedbackTenant", i) as string;
            const environment = this.getNodeParameter("feedbackEnvironment", i) as string;
            const catalogVersion = this.getNodeParameter("feedbackCatalogVersion", i) as string;
            const startTime = this.getNodeParameter("feedbackStartTime", i) as string;
            const endTime = this.getNodeParameter("feedbackEndTime", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/feedback/catalog-version/${encodeURIComponent(catalogVersion)}/updates/statistics/summary/absolute?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}&size=100`;
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
          case "summaryOfUpdatesByState": {
            const tenant = this.getNodeParameter("feedbackTenant", i) as string;
            const environment = this.getNodeParameter("feedbackEnvironment", i) as string;
            const catalogVersion = this.getNodeParameter("feedbackCatalogVersion", i) as string;
            const state = this.getNodeParameter("feedbackState", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/feedback/catalog-version/${encodeURIComponent(catalogVersion)}/updates/statistics/summary/${encodeURIComponent(state)}/relative?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&durationValue=24&durationUnit=HOUR&lastPeriodValue=24&lastPeriodUnit=HOUR`;
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
          case "summaryOfUpdatesByStateTime": {
            const tenant = this.getNodeParameter("feedbackTenant", i) as string;
            const environment = this.getNodeParameter("feedbackEnvironment", i) as string;
            const catalogVersion = this.getNodeParameter("feedbackCatalogVersion", i) as string;
            const state = this.getNodeParameter("feedbackState", i) as string;
            const startTime = this.getNodeParameter("feedbackStartTime", i) as string;
            const endTime = this.getNodeParameter("feedbackEndTime", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/feedback/catalog-version/${encodeURIComponent(catalogVersion)}/updates/statistics/summary/${encodeURIComponent(state)}/absolute?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&durationValue=24&durationUnit=HOUR&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`;
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
          case "listUpdatesByState": {
            const tenant = this.getNodeParameter("feedbackTenant", i) as string;
            const environment = this.getNodeParameter("feedbackEnvironment", i) as string;
            const catalogVersion = this.getNodeParameter("feedbackCatalogVersion", i) as string;
            const state = this.getNodeParameter("feedbackState", i) as string;
            const offset = this.getNodeParameter("feedbackOffset", i, 0) as number;
            const limit = this.getNodeParameter("feedbackLimit", i, 100) as number;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/feedback/catalog-version/${encodeURIComponent(catalogVersion)}/updates/statistics/details/${encodeURIComponent(state)}/relative?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&durationValue=24&durationUnit=HOUR&lastPeriodValue=24&lastPeriodUnit=HOUR&from=${offset}&size=${limit}`;
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
          case "listUpdatesByStateTime": {
            const tenant = this.getNodeParameter("feedbackTenant", i) as string;
            const environment = this.getNodeParameter("feedbackEnvironment", i) as string;
            const catalogVersion = this.getNodeParameter("feedbackCatalogVersion", i) as string;
            const state = this.getNodeParameter("feedbackState", i) as string;
            const startTime = this.getNodeParameter("feedbackStartTime", i) as string;
            const endTime = this.getNodeParameter("feedbackEndTime", i) as string;
            const offset = this.getNodeParameter("feedbackOffset", i, 0) as number;
            const limit = this.getNodeParameter("feedbackLimit", i, 100) as number;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/feedback/catalog-version/${encodeURIComponent(catalogVersion)}/updates/statistics/details/${encodeURIComponent(state)}/absolute?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&durationValue=24&durationUnit=HOUR&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}&from=${offset}&size=${limit}`;
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
          case "singleUpdateFeedback": {
            const tenant = this.getNodeParameter("feedbackTenant", i) as string;
            const environment = this.getNodeParameter("feedbackEnvironment", i) as string;
            const catalogVersion = this.getNodeParameter("feedbackCatalogVersion", i) as string;
            const updateId = this.getNodeParameter("feedbackUpdateId", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/feedback/catalog-version/${encodeURIComponent(catalogVersion)}/updates/${encodeURIComponent(updateId)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&size=100`;
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
          case "createBatch": {
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/batch-imports?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              body: "{}",
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "listBatches": {
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/batch-imports?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const options: IHttpRequestOptions = {
              method: "GET",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "addItemsToBatch": {
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const fhrValidation = this.getNodeParameter("fhrValidation", i) as boolean;
            const bearerToken = await getBearerToken(this);
            const batchId = this.getNodeParameter("batchId", i) as string;
            const batchItems = this.getNodeParameter("batchItems", i) as IDataObject[];

            const url = `https://items.attraqt.io/batch-imports/items?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&fhrValidation=${fhrValidation}&batch_id=${encodeURIComponent(batchId)}`;
            
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json; charset=UTF-8",
              },
              body: batchItems,
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "modifyItemsInBatch": {
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const fhrValidation = this.getNodeParameter("fhrValidation", i) as boolean;
            const bearerToken = await getBearerToken(this);
            const batchId = this.getNodeParameter("batchId", i) as string;
            const batchItems = this.getNodeParameter("batchItems", i) as IDataObject[];
            
            const url = `https://items.attraqt.io/batch-imports/items?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&fhrValidation=${fhrValidation}&batch_id=${encodeURIComponent(batchId)}`;
            const options: IHttpRequestOptions = {
              method: "PATCH",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json; charset=UTF-8",
              },
              body: batchItems,
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "deleteItemsFromBatch": {
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const fhrValidation = this.getNodeParameter("fhrValidation", i) as boolean;
            const bearerToken = await getBearerToken(this);
            const batchId = this.getNodeParameter("batchId", i) as string;
            const batchItems = this.getNodeParameter("batchItems", i) as IDataObject[];
            
            const url = `https://items.attraqt.io/batch-imports/items/delete?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&fhrValidation=${fhrValidation}&batch_id=${encodeURIComponent(batchId)}`;
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json; charset=UTF-8",
              },
              body: batchItems,
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "submitBatchIngestion": {
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const batchImportId = this.getNodeParameter("batchImportId", i, "") as string;
            const catalogVersion = this.getNodeParameter("submissionCatalogVersion", i) as string;
            const promoteCatalogOnCompletion = this.getNodeParameter("promoteCatalogOnCompletion", i, false) as boolean;
            const minItemCount = this.getNodeParameter("minItemCount", i, 0) as number;
            const minSuccessRatePercent = this.getNodeParameter("minSuccessRatePercent", i, 0) as number;
            const source = this.getNodeParameter("source", i, "") as string;
            const deleteMissingItems = this.getNodeParameter("deleteMissingItems", i, false) as boolean;
            const fhrValidation = this.getNodeParameter("submissionFhrValidation", i, false) as boolean;
            const bearerToken = await getBearerToken(this);

            if (!catalogVersion) {
              throw new NodeOperationError(this.getNode(), "catalogVersion is required for batch ingestion.");
            }

            const body: any = {};

            if (batchImportId) {
              body.batchImportId = batchImportId;
            }

            body.catalogVersion = catalogVersion.toString();

            if (typeof promoteCatalogOnCompletion !== 'undefined') {
              body.promoteCatalogOnCompletion = promoteCatalogOnCompletion;
            }

            if (minItemCount !== undefined && minItemCount !== null) {
              body.minItemCount = parseInt(minItemCount.toString(), 10);
            }

            if (minSuccessRatePercent !== undefined && minSuccessRatePercent !== null) {
              body.minSuccessRatePercent = parseFloat(minSuccessRatePercent.toString());
            }

            if (source) {
              body.source = source;
            }

            if (typeof deleteMissingItems !== 'undefined') {
              body.deleteMissingItems = deleteMissingItems;
            }

            let url = `https://items.attraqt.io/batch-imports/ingestions?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            
            if (typeof fhrValidation !== 'undefined') {
              url += `&fhrValidation=${fhrValidation}`;
            }

            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json; charset=UTF-8",
              },
              body,
              json: true,
            };

            try {
              responseData = await this.helpers.request(options);
            } catch (error) {
              if (error instanceof Error && error.message && error.message.includes('Invalid UUID string')) {
                throw new NodeOperationError(
                  this.getNode(),
                  `Failed to submit batch ingestion for catalog version ${body.catalogVersion}. This might indicate that no batch exists for this catalog version, the catalog version doesn't exist, or the batchImportId is invalid. Please ensure you have created a catalog and associated batch first.`
                );
              }
              throw error;
            }
            break;
          }
          case "getBatchIngestionStatus": {
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const bearerToken = await getBearerToken(this);
            const ingestionId = this.getNodeParameter("ingestionId", i) as string;
            const url = `https://items.attraqt.io/batch-imports/ingestions/${encodeURIComponent(ingestionId)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const options: IHttpRequestOptions = {
              method: "GET",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "listBatchIngestions": {
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i, "") as string;
            const lookbackDuration = this.getNodeParameter("lookback_duration", i, "") as string;
            const status = this.getNodeParameter("status", i, "") as string;
            const bearerToken = await getBearerToken(this);
            let url = `https://items.attraqt.io/batch-imports/ingestions?tenant=${encodeURIComponent(tenant)}`;
            if (environment) {
              url += `&environment=${encodeURIComponent(environment)}`;
            }
            if (lookbackDuration) {
              url += `&lookback_duration=${encodeURIComponent(lookbackDuration)}`;
            }
            if (status) {
              url += `&status=${encodeURIComponent(status)}`;
            }
            const options: IHttpRequestOptions = {
              method: "GET",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }

          case "deleteBatchIngestion": {
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter("environment", i) as string;
            const ingestionId = this.getNodeParameter("ingestionId", i) as string;
            const bearerToken = await getBearerToken(this);
            const url = `https://items.attraqt.io/batch-imports/ingestions/${encodeURIComponent(ingestionId)}?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}`;
            const options: IHttpRequestOptions = {
              method: "DELETE",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              json: true,
            };
            await this.helpers.request(options);
            responseData = { deleted: true };
            break;
          }
          case "upsertItems": {
            const productData = this.getNodeParameter(
              "contentData",
              i
            ) as string;
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter(
              "environment",
              i
            ) as string;
            const fhrValidation = this.getNodeParameter(
              "fhrValidation",
              i
            ) as boolean;
            const url = `https://items.attraqt.io/items?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(
              environment
            )}&fhrValidation=${fhrValidation}`;
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
            const productData = this.getNodeParameter(
              "contentData",
              i
            ) as string;
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter(
              "environment",
              i
            ) as string;
            const fhrValidation = this.getNodeParameter(
              "fhrValidation",
              i
            ) as boolean;
            const url = `https://items.attraqt.io/items?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(
              environment
            )}&fhrValidation=${fhrValidation}`;
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
            const productData = this.getNodeParameter(
              "contentData",
              i
            ) as string;
            const tenant = this.getNodeParameter("tenant", i) as string;
            const environment = this.getNodeParameter(
              "environment",
              i
            ) as string;
            const url = `https://items.attraqt.io/items/delete?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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
            await this.helpers.request(options);
            responseData = { deleted: true };
            break;
          }
          case "getToken": {
            const credentials = await this.getCredentials("crownpeakPDApi");
            const username = credentials.username as string;
            const password = credentials.password as string;
            const tenantId = credentials.tenantId as string;
            let authUrl = credentials.authUrl as string;
            authUrl = authUrl.replace('{tenantId}', tenantId);
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
            const response = await this.helpers.request(options);
            responseData =
              typeof response === "string" ? JSON.parse(response) : response;
            break;
          }
          case "createItemSchema": {
            const schemaData = this.getNodeParameter("schemaData", i) as string;
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter(
              "schemaEnvironment",
              i
            ) as string;
            const url = `https://items.attraqt.io/item-schemas?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
            const bearerToken = await getBearerToken(this);
            
            const schemaObject = typeof schemaData === 'string' ? JSON.parse(schemaData) : schemaData;
            schemaObject.tenant = tenant;
            schemaObject.environment = environment;
            
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              body: schemaObject,
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "updateItemSchema": {
            const schemaData = this.getNodeParameter("schemaData", i) as string;
            const schemaName = this.getNodeParameter("schemaName", i) as string;
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter(
              "schemaEnvironment",
              i
            ) as string;
            const url = `https://items.attraqt.io/item-schemas/${encodeURIComponent(
              schemaName
            )}?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
            const bearerToken = await getBearerToken(this);
            
            const schemaObject = typeof schemaData === 'string' ? JSON.parse(schemaData) : schemaData;
            schemaObject.tenant = tenant;
            schemaObject.environment = environment;
            schemaObject.name = schemaName;
            
            const options: IHttpRequestOptions = {
              method: "PUT",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
              },
              body: schemaObject,
              json: true,
            };
            responseData = await this.helpers.request(options);
            break;
          }
          case "deleteItemSchema": {
            const schemaName = this.getNodeParameter("schemaName", i) as string;
            const schemaVersion = this.getNodeParameter(
              "schemaVersion",
              i
            ) as string;
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter(
              "schemaEnvironment",
              i
            ) as string;
            const url = `https://items.attraqt.io/item-schemas/${encodeURIComponent(
              schemaName
            )}/${encodeURIComponent(schemaVersion)}?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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
            await this.helpers.request(options);
            responseData = { deleted: true };
            break;
          }
          case "getItemSchema": {
            const schemaName = this.getNodeParameter("schemaName", i) as string;
            const schemaVersion = this.getNodeParameter(
              "schemaVersion",
              i
            ) as string;
            const tenant = this.getNodeParameter("schemaTenant", i) as string;
            const environment = this.getNodeParameter(
              "schemaEnvironment",
              i
            ) as string;
            const url = `https://items.attraqt.io/item-schemas/${encodeURIComponent(
              schemaName
            )}/${encodeURIComponent(schemaVersion)}?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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
            const defaultLocale = this.getNodeParameter(
              "defaultLocale",
              i
            ) as string;
            const tenant = this.getNodeParameter("localeTenant", i) as string;
            const environment = this.getNodeParameter(
              "localeEnvironment",
              i
            ) as string;
            const fhrValidation = this.getNodeParameter(
              "localeFhrValidation",
              i
            ) as boolean;
            const url = `https://items.attraqt.io/locale/${encodeURIComponent(
              defaultLocale
            )}?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(
              environment
            )}&fhrValidation=${fhrValidation}`;
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
            const tenant = this.getNodeParameter("localeTenant", i) as string;
            const environment = this.getNodeParameter(
              "localeEnvironment",
              i
            ) as string;
            const fhrValidation = this.getNodeParameter(
              "localeFhrValidation",
              i
            ) as boolean;
            const url = `https://items.attraqt.io/locale?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(
              environment
            )}&fhrValidation=${fhrValidation}`;
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
            const tenant = this.getNodeParameter("localeTenant", i) as string;
            const environment = this.getNodeParameter(
              "localeEnvironment",
              i
            ) as string;
            const fhrValidation = this.getNodeParameter(
              "localeFhrValidation",
              i
            ) as boolean;
            const url = `https://items.attraqt.io/locale?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(
              environment
            )}&fhrValidation=${fhrValidation}`;
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
            const catalogData = this.getNodeParameter(
              "catalogData",
              i
            ) as string;
            const tenant = this.getNodeParameter("catalogTenant", i) as string;
            const environment = this.getNodeParameter(
              "catalogEnvironment",
              i
            ) as string;
            const url = `https://items.attraqt.io/catalogs?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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
            const catalogVersion =
              response?.version || response?.catalogVersion || "unknown";
            responseData = {
              success: true,
              message: `Catalog created successfully with version ${catalogVersion}`,
              catalogVersion: catalogVersion,
              tenant: tenant,
              environment: environment,
              status: "inactive",
              note:
                "New catalogs are created as inactive. Use 'Activate Catalog' to activate it.",
              response: response,
            };
            break;
          }
          case "createDefaultCatalogBatch": {
            const catalogData = this.getNodeParameter(
              "catalogData",
              i
            ) as string;
            const tenant = this.getNodeParameter("catalogTenant", i) as string;
            const environment = this.getNodeParameter(
              "catalogEnvironment",
              i
            ) as string;

            let body;
            try {
              body = JSON.parse(catalogData);
            } catch (error) {
              throw new NodeOperationError(
                this.getNode(),
                'Invalid JSON in catalog data',
                { itemIndex: i }
              );
            }

            const url = `https://items.attraqt.io/catalogs?createBatchImport=true&tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
            const bearerToken = await getBearerToken(this);
            const options: IHttpRequestOptions = {
              method: "POST",
              url,
              headers: {
                Authorization: `Bearer ${bearerToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(body),
              json: true,
            };

            const response = await this.helpers.request(options);
            const catalogVersion =
              response?.version || response?.catalogVersion || "unknown";
            
            responseData = {
              ...response,
              defaultBatchId: catalogVersion,
              message: "Catalog created with default batch. The batch ID is identical to the catalog version.",
              success: true,
              catalogVersion: catalogVersion,
              tenant: tenant,
              environment: environment,
              status: "inactive",
              note: "New catalogs are created as inactive. Use 'Activate Catalog' to activate it.",
            };
            break;
          }
          case "deleteCatalog": {
            const catalogVersion = this.getNodeParameter(
              "catalogVersion",
              i
            ) as string;
            const tenant = this.getNodeParameter("catalogTenant", i) as string;
            const environment = this.getNodeParameter(
              "catalogEnvironment",
              i
            ) as string;
            const url = `https://items.attraqt.io/catalogs/${encodeURIComponent(
              catalogVersion
            )}?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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

            await this.helpers.request(options);
            responseData = { deleted: true };
            break;
          }
          case "activateCatalog": {
            const catalogVersion = this.getNodeParameter(
              "catalogVersion",
              i
            ) as string;
            const tenant = this.getNodeParameter("catalogTenant", i) as string;
            const environment = this.getNodeParameter(
              "catalogEnvironment",
              i
            ) as string;
            const url = `https://items.attraqt.io/catalogs/activate/${encodeURIComponent(
              catalogVersion
            )}?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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
              response: response || "Catalog activated successfully",
            };
            break;
          }
          case "getActiveCatalog": {
            const tenant = this.getNodeParameter("catalogTenant", i) as string;
            const environment = this.getNodeParameter(
              "catalogEnvironment",
              i
            ) as string;
            const url = `https://items.attraqt.io/catalogs/active?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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
            const returnAll = this.getNodeParameter("returnAll", i, true) as boolean;
            const limit = this.getNodeParameter("limit", i, true) as number;
            const simplify = this.getNodeParameter("simplify", i, false) as boolean;
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
            let catalogs = await this.helpers.request(options);
            if (Array.isArray(catalogs)) {
              if (!returnAll) {
                catalogs = catalogs.slice(0, limit);
              }
              if (simplify) {
                responseData = catalogs.map((c: any) => ({
                  version: c.version || c.catalogVersion,
                  status: c.status,
                  created: c.created,
                  updated: c.updated,
                  description: c.description,
                }));
              } else {
                responseData = catalogs;
              }
            } else {
              responseData = catalogs;
            }
            break;
          }
          case "createCategoryTree": {
            const categoryTreeData = this.getNodeParameter(
              "categoryTreeData",
              i
            ) as string;
            const tenant = this.getNodeParameter(
              "categoryTreeTenant",
              i
            ) as string;
            const environment = this.getNodeParameter(
              "categoryTreeEnvironment",
              i
            ) as string;
            const fhrValidation = this.getNodeParameter(
              "categoryTreeFhrValidation",
              i
            ) as boolean;

            let url = `https://items.attraqt.io/category-trees?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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
            const categoryTreeData = this.getNodeParameter(
              "categoryTreeData",
              i
            ) as string;
            const categoryTreeName = this.getNodeParameter(
              "categoryTreeName",
              i
            ) as string;
            const tenant = this.getNodeParameter(
              "categoryTreeTenant",
              i
            ) as string;
            const environment = this.getNodeParameter(
              "categoryTreeEnvironment",
              i
            ) as string;
            const fhrValidation = this.getNodeParameter(
              "categoryTreeFhrValidation",
              i
            ) as boolean;

            let url = `https://items.attraqt.io/category-trees/${encodeURIComponent(
              categoryTreeName
            )}?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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
            const returnAll = this.getNodeParameter("returnAll", i, true) as boolean;
            const limit = this.getNodeParameter("limit", i, true) as number;
            const simplify = this.getNodeParameter("simplify", i, false) as boolean;
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
            let trees = await this.helpers.request(options);
            if (Array.isArray(trees)) {
              if (!returnAll) {
                trees = trees.slice(0, limit);
              }
              if (simplify) {
                responseData = trees.map((t: any) => ({
                  name: t.name,
                  version: t.version,
                  created: t.created,
                  updated: t.updated,
                  description: t.description,
                }));
              } else {
                responseData = trees;
              }
            } else {
              responseData = trees;
            }
            break;
          }
          case "getCategoryTree": {
            const categoryTreeName = this.getNodeParameter(
              "categoryTreeName",
              i
            ) as string;
            const categoryTreeVersion = this.getNodeParameter(
              "categoryTreeVersion",
              i
            ) as string;
            const tenant = this.getNodeParameter(
              "categoryTreeTenant",
              i
            ) as string;
            const environment = this.getNodeParameter(
              "categoryTreeEnvironment",
              i
            ) as string;
            const url = `https://items.attraqt.io/category-trees/${encodeURIComponent(
              categoryTreeName
            )}/${encodeURIComponent(
              categoryTreeVersion
            )}?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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
            const categoryTreeName = this.getNodeParameter(
              "categoryTreeName",
              i
            ) as string;
            const categoryTreeVersion = this.getNodeParameter(
              "categoryTreeVersion",
              i
            ) as string;
            const tenant = this.getNodeParameter(
              "categoryTreeTenant",
              i
            ) as string;
            const environment = this.getNodeParameter(
              "categoryTreeEnvironment",
              i
            ) as string;
            const url = `https://items.attraqt.io/category-trees/${encodeURIComponent(
              categoryTreeName
            )}/${encodeURIComponent(
              categoryTreeVersion
            )}?tenant=${encodeURIComponent(
              tenant
            )}&environment=${encodeURIComponent(environment)}`;
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
            await this.helpers.request(options);
            responseData = { deleted: true };
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
