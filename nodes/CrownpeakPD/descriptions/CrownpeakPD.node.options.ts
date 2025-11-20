import { INodeProperties } from "n8n-workflow";

export const crownpeakPDOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Activate a Catalog Version",
        value: "activateCatalog",
        action: "Activate a catalog version",
      },
      {
        name: "Add Items to Batch",
        value: "addItemsToBatch",
        action: "Add items to a batch",
      },
      {
        name: "Catalog Activation Statistics",
        value: "catalogActivationStats",
        action: "Get catalog activation statistics",
      },
      {
        name: "Create a Catalog",
        value: "createCatalog",
        action: "Create a catalog",
      },
      {
        name: "Create a Category Tree",
        value: "createCategoryTree",
        action: "Create a category tree",
      },
      {
        name: "Create an Item Schema",
        value: "createItemSchema",
        action: "Create an item schema",
      },
      {
        name: "Create Batch",
        value: "createBatch",
        action: "Create a new batch",
      },
      {
        name: "Created Catalog Versions",
        value: "createdCatalogVersions",
        action: "Get created catalog versions",
      },
      {
        name: "Delete a Catalog",
        value: "deleteCatalog",
        action: "Delete a catalog",
      },
      {
        name: "Delete a Category Tree",
        value: "deleteCategoryTree",
        action: "Delete a category tree",
      },
      {
        name: "Delete an Item Schema",
        value: "deleteItemSchema",
        action: "Delete an item schema",
      },
      {
        name: "Delete Batch Ingestion",
        value: "deleteBatchIngestion",
        action: "Delete batch ingestion",
      },
      {
        name: "Delete Default Locale",
        value: "deleteDefaultLocale",
        action: "Delete default locale",
      },
      {
        name: "Delete Items",
        value: "deleteItems",
        action: "Delete items",
      },
      {
        name: "Delete Items from Batch",
        value: "deleteItemsFromBatch",
        action: "Delete items from a batch",
      },
      {
        name: "Get a Category Tree",
        value: "getCategoryTree",
        action: "Get a category tree",
      },
      {
        name: "Get Active Catalog Version",
        value: "getActiveCatalog",
        action: "Get active catalog version",
      },
      {
        name: "Get an Item Schema",
        value: "getItemSchema",
        action: "Get an item schema",
      },
      {
        name: "Get Batch Ingestion Status",
        value: "getBatchIngestionStatus",
        action: "Get batch ingestion status",
      },
      {
        name: "Get Default Locale",
        value: "getDefaultLocale",
        action: "Get default locale",
      },
      {
        name: "Get Token",
        value: "getToken",
        action: "Get token",
      },
      {
        name: "List All Schemas",
        value: "listSchemas",
        action: "List all schemas",
      },
      {
        name: "List Batches",
        value: "listBatches",
        action: "List all batches",
      },
      {
        name: "List Batch Ingestions",
        value: "listBatchIngestions",
        action: "List batch ingestions",
      },
      {
        name: "List Catalogs",
        value: "listCatalogs",
        action: "List catalogs",
      },
      {
        name: "List Category Trees",
        value: "listCategoryTrees",
        action: "List category trees",
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
        name: "Modify Items in Batch",
        value: "modifyItemsInBatch",
        action: "Modify items in a batch",
      },
      {
        name: "Patch Items",
        value: "patchItems",
        action: "Patch items",
      },
      {
        name: "Set Default Locale",
        value: "setDefaultLocale",
        action: "Set default locale",
      },
      {
        name: "Single Update Feedback",
        value: "singleUpdateFeedback",
        action: "Get single update feedback",
      },
      {
        name: "Submit Batch for Ingestion",
        value: "submitBatchIngestion",
        action: "Submit batch for ingestion",
      },
      {
        name: "Summary of Updates",
        value: "summaryOfUpdates",
        action: "Get summary of updates",
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
        name: "Summary of Updates (Time Window)",
        value: "summaryOfUpdatesTimeWindow",
        action: "Get summary of updates within time window",
      },
      {
        name: "Update a Category Tree",
        value: "updateCategoryTree",
        action: "Update a category tree",
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
    ],
    default: "upsertItems",
  },
];
export const defaults = { name: "Fredhopper Product Discovery Node" };
