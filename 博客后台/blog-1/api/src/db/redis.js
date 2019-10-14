const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", err => {
	console.error(err);
});

function set(key, value) {
	if (typeof value === "object") {
		value = JSON.stringify(value);
	}
	redisClient.set(key, value, redis.print);
}

function get(key) {
	return new Promise((resolve, reject) => {
		redisClient.get(key, (err, data) => {
			if (err) {
				reject(err);
				return;
			}

			if (data == null) {
				resolve(null);
				return;
			}

			try {
				resolve(JSON.parse(data));
			} catch (ex) {
				resolve(ex);
			}
		});
	});
}

module.exports = {
	set,
	get
};
