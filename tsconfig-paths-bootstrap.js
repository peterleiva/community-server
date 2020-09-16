const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const paths = tsConfig.compilerOptions.paths;
const baseUrl = tsConfig.compilerOptions.outDir;

tsConfigPaths.register({
	baseUrl,
	paths: Object.keys(paths).reduce(
		(agg, key) => ({
			...agg,
			[key]: paths[key].map(p => 
				p.replace(tsConfig.compilerOptions.baseUrl, tsConfig.compilerOptions.outDir)
			)
		}), 
		{})
});

// When path registration is no longer needed
// cleanup();
