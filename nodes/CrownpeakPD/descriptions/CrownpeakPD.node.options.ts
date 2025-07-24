import { INodeProperties } from "n8n-workflow";

export const crownpeakPDOperations: INodeProperties[] = [
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
];
export const defaults = { name: "Crownpeak PD Node" };
