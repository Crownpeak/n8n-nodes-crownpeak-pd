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
				name: 'Create',
				value: 'create',
				description: 'Create a new content item',
				action: 'Create content',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a content item',
				action: 'Get content',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a content item',
				action: 'Update content',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a content item',
				action: 'Delete content',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List content items',
				action: 'List content',
			},
		],
		default: 'get',
	},
];

export const crownpeakPDFields: INodeProperties[] = [
	// Content ID field (used for get, update, delete operations)
	{
		displayName: 'Content ID',
		name: 'contentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		placeholder: '12345',
		description: 'The ID of the content item',
	},

	// Content Title field (used for create and update operations)
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		placeholder: 'Content Title',
		description: 'The title of the content item',
	},

	// Content Body field (used for create and update operations)
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		placeholder: 'Content body...',
		description: 'The content/body of the item',
	},

	// Template ID field (used for create operation)
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: '123',
		description: 'The template ID to use for creating content',
	},

	// Folder ID field (used for create and list operations)
	{
		displayName: 'Folder ID',
		name: 'folderId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['create', 'list'],
			},
		},
		default: '',
		placeholder: '456',
		description: 'The folder ID where content should be created or listed from',
	},

	// Limit field for list operation
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['list'],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 10,
		description: 'Max number of results to return',
	},

	// Additional fields for more advanced options
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['create', 'update', 'list'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Published',
						value: 'published',
					},
					{
						name: 'Archived',
						value: 'archived',
					},
				],
				default: 'draft',
				description: 'The status of the content item',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				placeholder: 'tag1,tag2,tag3',
				description: 'Comma-separated list of tags',
			},
			{
				displayName: 'Author',
				name: 'author',
				type: 'string',
				default: '',
				placeholder: 'Author Name',
				description: 'The author of the content',
			},
		],
	},
];
