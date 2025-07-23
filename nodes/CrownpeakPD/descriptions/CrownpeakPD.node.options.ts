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
    ],
    default: "createProduct",
  },
];
export const defaults = { name: "Crownpeak PD Node" };
