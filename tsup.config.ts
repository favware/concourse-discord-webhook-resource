import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: false,
	entry: ['src/index.ts'],
	format: 'esm',
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'es2022',
	tsconfig: 'src/tsconfig.json',
	keepNames: true,
	treeshake: true
});
