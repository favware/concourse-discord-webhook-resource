import { ProxyAgent } from 'undici';
import type { CheckedOptionsType } from '#lib/utils/preflightChecks';

export function getProxyAgent(options: CheckedOptionsType): ProxyAgent | null {
	if (!options.proxy && !options['allow-insecure']) return null;

	return new ProxyAgent({
		uri: options.proxy ?? '',
		connect: {
			rejectUnauthorized: !options['allow-insecure']
		}
	});
}
