import { container } from '#lib/utils/container';
import type { OptionsType } from '#root/index';
import { exit } from 'node:process';

export interface CheckedOptionsType {
	'allow-insecure': boolean;
	'allowed-role-mentions': string[];
	'allowed-user-mentions': string[];
	'avatar-url': string | undefined;
	content: string;
	proxy: string | undefined;
	'suppress-embeds': boolean;
	'suppress-notifications': boolean;
	username: string | undefined;
	verbose: boolean;
	'webhook-url': string;
}

export function preflightChecks(options: OptionsType): CheckedOptionsType {
	if (!options['webhook-url']) {
		container.logger.fatal('No webhook URL was provided to send the message with.');
		exit(1);
	}

	if (!options.content) {
		container.logger.fatal('No content was provided to send the message with.');
		exit(1);
	}

	return options as CheckedOptionsType;
}
