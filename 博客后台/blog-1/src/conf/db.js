const env = process.env.NODE_ENV; // 环境参数

// 配置
let MYSQL_CONF;
let REDIS_CONF;

if (env === "dev") {
	// mysql
	MYSQL_CONF = {
		host: "localhost",
		user: 'root',
		password: '123456',
		prot: '3306',
		database: 'blog'
	};

	// redis
	REDIS_CONF = {
		port: 6379,
		host: "localhost"
	};
}

if (env === "production") {
	MYSQL_CONF = {
		host: "localhost",
		user: 'root',
		password: '123456',
		prot: '3306',
		database: 'blog'
	};

	REDIS_CONF = {
		port: 6379,
		host: "localhost"
	};
}

module.exports = {
	MYSQL_CONF,
	REDIS_CONF
};
