const { register, login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { set } = require("../db/redis");
const { genPassword } = require("../utils/cryp");

const handleUserRouter = (req, res) => {
	const method = req.method;

	// 注册
	if (method === "POST" && req.path === "/api/user/register") {
		const { username, password } = req.body;
		const userInfo = { username, password: genPassword(password) };

		return register(userInfo)
			.then(() => {
				return new SuccessModel("注册成功");
			})
			.catch(() => {
				return new ErrorModel("注册失败");
			});
	}

	// 登录
	if (method === "POST" && req.path === "/api/user/login") {
		const { username, password } = req.body;
		return login(username, genPassword(password))
			.then(data => {
				// 设置 cookie
				if (data.username) {
					req.session.username = data.username;

					// 同步到 redis
					set(req.sessionId, req.session);

					return new SuccessModel("登录成功");
				} else {
					return new ErrorModel("登录失败");
				}
			})
			.catch(() => {
				return new ErrorModel("登录失败");
			});
	}
};

module.exports = handleUserRouter;
