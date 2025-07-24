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
    ],
    default: "createProduct",
  },
];
export const defaults = { name: "Crownpeak PD Node" };
