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
} from 'n8n-workflow';

import { crownpeakPDOperations, crownpeakPDFields } from './descriptions/CrownpeakPD.node.options';

export class CrownpeakPD implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CrownPeak PD',
		name: 'crownpeakPD',
		icon: 'file:crownpeak.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with CrownPeak PD API',
		defaults: {
			name: 'CrownPeak PD',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'crownpeakPDApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.apiEndpoint}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Content',
						value: 'content',
						description: 'Work with content items',
					},
				],
				default: 'content',
			},
			...crownpeakPDOperations,
			...crownpeakPDFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData: IDataObject = {};

				if (resource === 'content') {
					switch (operation) {
						case 'post': {
							const tenant = this.getNodeParameter('tenant', i) as string;
							const environment = this.getNodeParameter('environment', i) as string;
							const fhrValidation = this.getNodeParameter('fhrValidation', i) as boolean;
							const itemsParam = this.getNodeParameter('items', i) as any;
							const url = `/items?tenant=${encodeURIComponent(tenant)}&environment=${encodeURIComponent(environment)}&fhrValidation=${fhrValidation}`;
							let body: any = itemsParam;
							if (typeof itemsParam === 'string') {
								try {
									body = JSON.parse(itemsParam);
								} catch (e) {
									throw new NodeOperationError(this.getNode(), 'Items must be a valid JSON array');
								}
							}
							const options: IHttpRequestOptions = {
								method: 'POST',
								url,
								body,
								json: true,
							};
							responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'crownpeakPDApi', options);
							break;
						}
						default:
							throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
					}
				}

				returnData.push(responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
					returnData.push({ error: errorMessage });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}

