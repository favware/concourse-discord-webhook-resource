import { env } from 'node:process';

interface ValidEnvValues {
	readonly ATC_EXTERNAL_URL: string;
	readonly BUILD_ID: string;
	readonly BUILD_JOB_ID: string;
	readonly BUILD_JOB_NAME: string;
	readonly BUILD_NAME: string;
	readonly BUILD_PIPELINE_ID: string;
	readonly BUILD_PIPELINE_NAME: string;
	readonly BUILD_TEAM_ID: string;
	readonly BUILD_TEAM_NAME: string;
}

const validEnvValues: ValidEnvValues = {
	BUILD_PIPELINE_NAME: env.BUILD_PIPELINE_NAME!,
	BUILD_PIPELINE_ID: env.BUILD_PIPELINE_ID!,
	BUILD_NAME: env.BUILD_NAME!,
	BUILD_TEAM_NAME: env.BUILD_TEAM_NAME!,
	BUILD_JOB_NAME: env.BUILD_JOB_NAME!,
	BUILD_ID: env.BUILD_ID!,
	BUILD_TEAM_ID: env.BUILD_TEAM_ID!,
	BUILD_JOB_ID: env.BUILD_JOB_ID!,
	ATC_EXTERNAL_URL: env.ATC_EXTERNAL_URL!
};

export function insertEnvVars(content: string): string {
	return content.replaceAll(/\${?(?<varName>\w+)}?/g, (_, varName) => validEnvValues[varName as keyof typeof validEnvValues]);
}
