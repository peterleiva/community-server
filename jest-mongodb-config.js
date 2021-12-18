module.exports = {
	mongodbMemoryServerOptions: {
		binary: {
			checkMD5: true,
		},
		autoStart: false,
		instance: {},
		mongoURLEnvName: "DATABASE_URL",
	},
};
