module.exports = {
	mongodbMemoryServerOptions: {
		binary: {
			checkMD5: true,
		},
		autoStart: false,
		instance: {},
		useSharedDBForAllJestWorkers: false,
		mongoURLEnvName: "DATABASE_URL",
	},
};
