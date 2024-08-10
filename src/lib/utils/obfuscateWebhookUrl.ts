import { RouteBases, Routes } from 'discord-api-types/v10';

export const UnboundWebhookRegex =
	/(?<url>https:\/\/(?:(?:canary|ptb).)?discord(?:app)?.com\/api(?:\/v\d+)?\/webhooks\/(?<id>\d+)\/(?<token>[\w-]+)\/?)/;

export function obfuscateWebhookUrl(potentialUrl: boolean | string | undefined) {
	if (typeof potentialUrl === 'string') {
		return potentialUrl.replace(UnboundWebhookRegex, RouteBases.api + Routes.webhook('*****', '*****') + '/');
	}

	return potentialUrl;
}
