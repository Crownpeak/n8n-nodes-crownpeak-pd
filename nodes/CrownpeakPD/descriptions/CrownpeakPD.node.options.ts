import { INodeProperties } from "n8n-workflow";

export const crownpeakPDOperations: INodeProperties[] = [
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
    default: "createProduct",
  },
];
export const defaults = { name: "Fredhopper Product Discovery Node" };
