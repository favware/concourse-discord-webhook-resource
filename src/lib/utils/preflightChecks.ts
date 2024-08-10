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

	for (const [key, value] of Object.entries(options)) {
		if (value === 'null' || value === 'undefined' || (typeof value === 'string' && value.trim().length === 0)) {
			Reflect.deleteProperty(options, key);
		}

		if (
			typeof value === 'string' &&
			(value.startsWith('"') || value.startsWith("'") || value.startsWith('`')) &&
			(value.endsWith('"') || value.endsWith("'") || value.endsWith('`'))
		) {
			Reflect.set(options, key, value.slice(1, -1));
		}

		if (Array.isArray(value)) {
			Reflect.set(
				options,
				key,
				value.map((arrayValue) => {
					if (
						typeof arrayValue === 'string' &&
						(arrayValue.startsWith('"') || arrayValue.startsWith("'") || arrayValue.startsWith('`')) &&
						(arrayValue.endsWith('"') || arrayValue.endsWith("'") || arrayValue.endsWith('`'))
					) {
						return arrayValue.slice(1, -1);
					}

					return arrayValue;
				})
			);
		}
	}

	return options as CheckedOptionsType;
}
