const env = process.env.NODE_ENV; // 环境参数

// 配置
let MONGODB_CONF;
let REDIS_CONF;

if (env === "dev") {
	// mongodb
	MONGODB_CONF = {
		host: "localhost",
		database: "blog"
	};

	// redis
	REDIS_CONF = {
		port: 6379,
		host: "127.0.0.1"
	};
}

if (env === "production") {
	REDIS_CONF = {
		port: 6379,
		host: "127.0.0.1"
	};

	MONGODB_CONF = {
		host: "localhost",
		database: "blog"
	};
}

module.exports = {
	MONGODB_CONF,
	REDIS_CONF
};
