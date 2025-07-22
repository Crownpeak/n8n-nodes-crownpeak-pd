import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CrownpeakPDApi implements ICredentialType {
	name = 'crownpeakPDApi';
	displayName = 'CrownPeak PD API';
	documentationUrl = 'https://docs.crownpeak.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Endpoint',
			name: 'apiEndpoint',
			type: 'string',
			default: 'https://api.crownpeak.net',
			placeholder: 'https://api.crownpeak.net',
			description: 'The CrownPeak PD API endpoint URL',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'Your API Key',
			description: 'The API key for CrownPeak PD API',
			required: true,
		},
		{
			displayName: 'Instance ID',
			name: 'instanceId',
			type: 'string',
			default: '',
			placeholder: 'your-instance-id',
			description: 'Your CrownPeak PD instance ID',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '=Bearer {{$credentials.apiKey}}',
				'X-Instance-Id': '={{$credentials.instanceId}}',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiEndpoint}}',
			url: '/api/v1/status',
			method: 'GET',
		},
	};
}
