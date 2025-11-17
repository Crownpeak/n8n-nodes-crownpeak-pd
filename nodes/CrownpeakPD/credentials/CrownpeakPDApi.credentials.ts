import { ICredentialType, INodeProperties } from "n8n-workflow";

export class CrownpeakPDApi implements ICredentialType {
  name = "crownpeakPDApi";
  displayName = "Fredhopper Product Discovery API";
  documentationUrl = "";
  properties: INodeProperties[] = [
    {
      displayName: "Username",
      name: "username",
      type: "string",
      default: "",
      placeholder: "Enter your username",
      description: "The username for basic authentication",
      required: true,
    },
    {
      displayName: "Password",
      name: "password",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
      placeholder: "Enter your password",
      description: "The password for basic authentication",
      required: true,
    },
    {
      displayName: "Tenant ID",
      name: "tenantId",
      type: "string",
      default: "solutions",
      placeholder: "solutions",
      description: "The tenant ID for the authentication realm",
      required: true,
    },
    {
      displayName: "Auth URL",
      name: "authUrl",
      type: "string",
      default:
        "https://iam.attraqt.io/auth/realms/{tenantId}/protocol/openid-connect/token",
      placeholder:
        "https://iam.attraqt.io/auth/realms/{tenantId}/protocol/openid-connect/token",
      description: "The OAuth2 token endpoint URL",
      required: true,
    },
  ];
}
