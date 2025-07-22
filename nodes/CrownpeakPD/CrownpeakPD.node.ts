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
		description: 'Interact with CrownPeak PD CMS API',
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
		const returnData: INodeExecutionData[] = [];
		const nodeClass = this.getNode() as any;

		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject = {};

				if (resource === 'content') {
					switch (operation) {
						case 'create':
							responseData = await nodeClass.createContent(this, i);
							break;
						case 'get':
							responseData = await nodeClass.getContent(this, i);
							break;
						case 'update':
							responseData = await nodeClass.updateContent(this, i);
							break;
						case 'delete':
							responseData = await nodeClass.deleteContent(this, i);
							break;
						case 'list':
							responseData = await nodeClass.listContent(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not known!`);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: errorMessage }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}

	private async createContent(
		executeFunctions: IExecuteFunctions,
		itemIndex: number,
	): Promise<IDataObject> {
		const title = executeFunctions.getNodeParameter('title', itemIndex) as string;
		const content = executeFunctions.getNodeParameter('content', itemIndex) as string;
		const templateId = executeFunctions.getNodeParameter('templateId', itemIndex) as string;
		const folderId = executeFunctions.getNodeParameter('folderId', itemIndex) as string;
		const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = {
			title,
			content,
			templateId,
			folderId,
			...additionalFields,
		};

		const options: IHttpRequestOptions = {
			method: 'POST',
			url: '/api/v1/content',
			body,
			json: true,
		};

		return executeFunctions.helpers.httpRequestWithAuthentication.call(executeFunctions, 'crownpeakPDApi', options);
	}

	private async getContent(
		executeFunctions: IExecuteFunctions,
		itemIndex: number,
	): Promise<IDataObject> {
		const contentId = executeFunctions.getNodeParameter('contentId', itemIndex) as string;

		const options: IHttpRequestOptions = {
			method: 'GET',
			url: `/api/v1/content/${contentId}`,
			json: true,
		};

		return executeFunctions.helpers.httpRequestWithAuthentication.call(executeFunctions, 'crownpeakPDApi', options);
	}

	private async updateContent(
		executeFunctions: IExecuteFunctions,
		itemIndex: number,
	): Promise<IDataObject> {
		const contentId = executeFunctions.getNodeParameter('contentId', itemIndex) as string;
		const title = executeFunctions.getNodeParameter('title', itemIndex) as string;
		const content = executeFunctions.getNodeParameter('content', itemIndex) as string;
		const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const body: IDataObject = {
			title,
			content,
			...additionalFields,
		};

		const options: IHttpRequestOptions = {
			method: 'PUT',
			url: `/api/v1/content/${contentId}`,
			body,
			json: true,
		};

		return executeFunctions.helpers.httpRequestWithAuthentication.call(executeFunctions, 'crownpeakPDApi', options);
	}

	private async deleteContent(
		executeFunctions: IExecuteFunctions,
		itemIndex: number,
	): Promise<IDataObject> {
		const contentId = executeFunctions.getNodeParameter('contentId', itemIndex) as string;

		const options: IHttpRequestOptions = {
			method: 'DELETE',
			url: `/api/v1/content/${contentId}`,
			json: true,
		};

		return executeFunctions.helpers.httpRequestWithAuthentication.call(executeFunctions, 'crownpeakPDApi', options);
	}

	private async listContent(
		executeFunctions: IExecuteFunctions,
		itemIndex: number,
	): Promise<IDataObject> {
		const folderId = executeFunctions.getNodeParameter('folderId', itemIndex, '') as string;
		const limit = executeFunctions.getNodeParameter('limit', itemIndex) as number;
		const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex) as IDataObject;

		const qs: IDataObject = {
			limit,
			...additionalFields,
		};

		if (folderId) {
			qs.folderId = folderId;
		}

		const options: IHttpRequestOptions = {
			method: 'GET',
			url: '/api/v1/content',
			qs,
			json: true,
		};

		return executeFunctions.helpers.httpRequestWithAuthentication.call(executeFunctions, 'crownpeakPDApi', options);
	}
}

