import { container } from '#lib/utils/container';
import { obfuscateWebhookUrl } from '#lib/utils/obfuscateWebhookUrl';
import type { CheckedOptionsType } from '#lib/utils/preflightChecks';
import type { OptionsType } from '#root/index';
import { Logger } from '@skyra/logger';

function stringify(object: unknown): string {
	return JSON.stringify(object, null, 4);
}

export function setupLogger(options: OptionsType) {
	container.logger = new Logger({ level: options.verbose ? Logger.Level.Debug : Logger.Level.Info });
}

export function logResolvedOptions(options: CheckedOptionsType) {
	const clonedRunArgs = JSON.parse(JSON.stringify(options)) as OptionsType;
	clonedRunArgs['webhook-url'] = obfuscateWebhookUrl(clonedRunArgs['webhook-url']);

	container.logger.debug('resolved options: \n', stringify(clonedRunArgs));
}
