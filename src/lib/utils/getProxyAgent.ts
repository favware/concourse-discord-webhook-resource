import type { CheckedOptionsType } from '#lib/utils/preflightChecks';
import { ProxyAgent } from 'undici';

export function getProxyAgent(options: CheckedOptionsType): ProxyAgent | null {
	if (!options.proxy && !options['allow-insecure']) return null;

	return new ProxyAgent({
		uri: options.proxy ?? '',
		connect: {
			rejectUnauthorized: !options['allow-insecure']
		}
	});
}
