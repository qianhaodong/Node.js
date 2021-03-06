const env = process.env.NODE_ENV; // 环境参数

// 配置
let MONGODB_CONF;
let REDIS_CONF;

if (env === "dev") {
	// mongodb
	MONGODB_CONF = {
		host: "127.0.0.1",
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
		host: "qianhaodong.com"
	};

	MONGODB_CONF = {
		host: "qianhaodong.com",
		database: "blog"
	};
}

module.exports = {
	MONGODB_CONF,
	REDIS_CONF
};
