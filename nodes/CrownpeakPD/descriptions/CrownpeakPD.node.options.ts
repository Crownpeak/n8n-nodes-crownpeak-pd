import { INodeProperties } from 'n8n-workflow';

export const crownpeakPDOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['content'],
			},
		},
		options: [
			{
				name: 'Post',
				value: 'post',
				description: 'POST items to CIDP (mimics Postman collection)',
				action: 'Post items',
			},
		],
		default: 'post',
	},
];

export const crownpeakPDFields: INodeProperties[] = [
	{
		displayName: 'Tenant',
		name: 'tenant',
		type: 'string',
		required: true,
		default: 'solutions',
		description: 'The tenant value for the request',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['post'],
			},
		},
	},
	{
		displayName: 'Environment',
		name: 'environment',
		type: 'string',
		required: true,
		default: 'cidp-test',
		description: 'The environment value for the request',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['post'],
			},
		},
	},
	{
		displayName: 'FHR Validation',
		name: 'fhrValidation',
		type: 'boolean',
		default: false,
		description: 'Set to false to disable FHR validation',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['post'],
			},
		},
	},
	{
		displayName: 'Items',
		name: 'items',
		type: 'json',
		required: true,
		default: '[{"id":"A00055","catalogVersion":4,"type":"product","context":"default","available":true,"attributes":{"title":"My Testing","test":"This is my item."}}]',
		description: 'The array of items to post (as JSON array)',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['post'],
			},
		},
	},
];
