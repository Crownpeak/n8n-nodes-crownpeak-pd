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
      {
        name: "Create Batch",
        value: "createBatch",
        action: "Create a new batch",
      },
      {
        name: "List Batches",
        value: "listBatches",
        action: "List all batches",
      },
      {
        name: "Add Items to Batch",
        value: "addItemsToBatch",
        action: "Add items to a batch",
      },
      {
        name: "Modify Items in Batch",
        value: "modifyItemsInBatch",
        action: "Modify items in a batch",
      },
      {
        name: "Delete Items from Batch",
        value: "deleteItemsFromBatch",
        action: "Delete items from a batch",
      },
      {
        name: "Submit Batch for Ingestion",
        value: "submitBatchIngestion",
        action: "Submit batch for ingestion",
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
        name: "Delete Batch",
        value: "deleteBatch",
        action: "Delete a batch",
      },
    ],
    default: "upsertItems",
  },
];
export const defaults = { name: "Fredhopper Product Discovery Node" };
