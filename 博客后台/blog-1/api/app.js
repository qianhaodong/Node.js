const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const { get, set } = require("./src/db/redis");
const { access } = require("./src/utils/log");

// const SESSION_DATA = {}

// 用于处理 post data
const getPostData = req => {
	return new Promise((resolve, reject) => {
		if (req.method !== "POST") {
			resolve({});
			return;
		}
		if (req.headers["content-type"] !== "application/json") {
			resolve({});
			return;
		}
		let postData = "";
		req.on("data", chunk => {
			postData += chunk.toString();
		});
		req.on("end", () => {
			if (!postData) {
				resolve({});
				return;
			}
			resolve(JSON.parse(postData));
		});
	});
};

// 获取过期时间
const getCookieExpires = () => {
	let d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
	return d.toGMTString();
};

const serverHandle = (req, res) => {
	// 记录请求日志
	access(
		`${req.method} -- ${req.url} -- ${
			req.headers["user-agent"]
		} -- ${Date.now()}`
	);

	// 设置返回格式 JSON
	res.setHeader("Content-Type", "application/json");

	const url = req.url;
	req.path = url.split("?")[0];

	// 解析 query
	req.query = querystring.parse(url.split("?")[1]);

	// 解析 cookie
	req.cookie = {};
	const cookieStr = req.headers.cookie || "";
	cookieStr.split(";").forEach(item => {
		if (!item) return;
		const arr = item.split("=");
		const key = arr[0].trim();
		const value = arr[1].trim();
		req.cookie[key] = value;
	});

	/* 使用 session 解决了 cookie 不安全的问题 */
	// 解析 session
	/* let needSetCookie = false
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId] */

	let needSetCookie = false;
	let userId = req.cookie.userid;
	if (!userId) {
		needSetCookie = true;
		userId = `${Date.now()}_${Math.random()}`;
		set(userId, {});
	}

	req.sessionId = userId;
	get(req.sessionId)
		.then(sessionData => {
			if (sessionData == null) {
				// 设置 redis 的 session
				set(req.sessionId, {});
				// 设置 session
				req.session = {};
			} else {
				req.session = sessionData;
			}

			// 处理 post 数据
			return getPostData(req);
		})
		.then(postData => {
			req.body = postData;

			// 处理 blog 路由
			const blogData = handleBlogRouter(req, res);
			if (blogData) {
				blogData
					.then(ret => {
						if (needSetCookie) {
							res.setHeader(
								"Set-Cookie",
								`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
							);
						}
						res.end(JSON.stringify(ret));
					})
					.catch(ret => {
						res.end(JSON.stringify(ret));
					});
				return;
			}

			// 处理 user 路由
			const userData = handleUserRouter(req, res);
			if (userData) {
				userData
					.then(ret => {
						if (needSetCookie) {
							res.setHeader(
								"Set-Cookie",
								`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
							);
						}
						res.end(JSON.stringify(ret));
					})
					.catch(ret => {
						res.end(JSON.stringify(ret));
					});
				return;
			}

			// 请求错误处理
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.write("404 Not Found\n");
			res.end();
		});
};

module.exports = serverHandle;
