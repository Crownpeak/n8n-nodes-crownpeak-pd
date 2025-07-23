import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CrownpeakPDApi implements ICredentialType {
	name = 'crownpeakPDApi';
	displayName = 'CIDP API (Manual Bearer Token)';
	documentationUrl = 'https://items.attraqt.io/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Endpoint',
			name: 'apiEndpoint',
			type: 'string',
			default: 'https://items.attraqt.io',
			placeholder: 'https://items.attraqt.io',
			description: 'The CIDP API endpoint URL',
			required: true,
		},
		{
			displayName: 'Bearer Token',
			name: 'bearerToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'Paste your Bearer token here',
			description: 'The Bearer token for CIDP API (copy from Postman)',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '=Bearer {{$credentials.bearerToken}}',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiEndpoint}}',
			url: '/items',
			method: 'GET',
		},
	};
}
