import { container } from '#lib/utils/container';
import { obfuscateWebhookUrl } from '#lib/utils/obfuscateWebhookUrl';
import type { OptionsType } from '#root/index';
import { Logger } from '@skyra/logger';

function stringify(object: unknown): string {
	return JSON.stringify(object, null, 4);
}

export function setupLogger(options: OptionsType) {
	const logger = new Logger({ level: options.verbose ? Logger.Level.Debug : Logger.Level.Info });

	container.logger = logger;

	const clonedRunArgs = JSON.parse(JSON.stringify(options)) as OptionsType;
	clonedRunArgs['webhook-url'] = obfuscateWebhookUrl(clonedRunArgs['webhook-url']);

	logger.debug('resolved options: \n', stringify(clonedRunArgs));
}
