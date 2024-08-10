import { exit } from 'node:process';
import { inspect, parseArgs } from 'node:util';
import { REST } from '@discordjs/rest';
import { MessageFlags, Routes, type RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/v10';
import { ProxyAgent } from 'undici';
import { container } from '#lib/utils/container';
import { obfuscateWebhookUrl, UnboundWebhookRegex } from '#lib/utils/obfuscateWebhookUrl';
import { preflightChecks } from '#lib/utils/preflightChecks';
import { setupLogger } from '#lib/utils/setup-logger';

export type OptionsType = typeof values;

const { values } = parseArgs({
	strict: false,
	options: {
		'webhook-url': {
			type: 'string'
		},
		content: {
			type: 'string'
		},
		proxy: {
			type: 'string',
			default: undefined
		},
		username: {
			type: 'string',
			default: undefined
		},
		'avatar-url': {
			type: 'string',
			default: undefined
		},
		'suppress-embeds': {
			type: 'boolean',
			default: false
		},
		'suppress-notifications': {
			type: 'boolean',
			default: false
		},

		'allow-insecure': {
			type: 'boolean',
			default: false
		},
		'allowed-role-mentions': {
			type: 'string',
			multiple: true,
			default: []
		},
		'allowed-user-mentions': {
			type: 'string',
			multiple: true,
			default: []
		},
		verbose: {
			type: 'boolean',
			default: false
		}
	}
});

setupLogger(values);

const checkedOptions = preflightChecks(values);

const proxyAgent = typeof checkedOptions.proxy === 'string' ? new ProxyAgent(checkedOptions.proxy) : undefined;

const rest = new REST({ version: '10', agent: proxyAgent });

const webhookRegexResult = UnboundWebhookRegex.exec(checkedOptions['webhook-url']);

const [hookId, hookToken] = [webhookRegexResult?.groups?.id, webhookRegexResult?.groups?.token];

if (!hookId || !hookToken) {
	container.logger.fatal('The provided webhook URL is invalid.');
	exit(1);
}

const shouldSuppressNotifications = checkedOptions['suppress-notifications'] ? MessageFlags.SuppressNotifications : 0;
const shouldSuppressEmbeds = checkedOptions['suppress-embeds'] ? MessageFlags.SuppressEmbeds : 0;

container.logger.info('Sending message to the configured webhook...');

try {
	await rest.post(Routes.webhook(hookId, hookToken), {
		auth: false,
		body: {
			content: checkedOptions.content,
			allowed_mentions: {
				users: checkedOptions['allowed-user-mentions'],
				roles: checkedOptions['allowed-role-mentions']
			},
			avatar_url: checkedOptions['avatar-url'],
			username: checkedOptions.username,
			flags: shouldSuppressEmbeds | shouldSuppressNotifications
		} satisfies RESTPostAPIWebhookWithTokenJSONBody
	});
	exit(0);
} catch (error) {
	container.logger.fatal('Failed to send the message to the webhook:', obfuscateWebhookUrl(inspect(error)));
	exit(1);
}
