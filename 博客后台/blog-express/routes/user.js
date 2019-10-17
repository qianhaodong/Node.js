const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.post('/register', (req, res, next) => {
	const { username, password, realname } = req.body;

	return register(username, password, realname)
		.then(registerData => {
			if (registerData.affectedRows > 0) {
				res.json(new SuccessModel(registerData, '注册成功'));
			}
		})
		.catch(() => {
			res.json(new ErrorModel('注册失败'));
		});
});

router.post('/login', (req, res, next) => {
	const { username, password } = req.body;

	return login(username, password).then(loginData => {
		// 设置 cookie
		if (loginData.username) {
			req.session.username = loginData.username;
			req.session.realname = loginData.realname;

			res.json(new SuccessModel('登录成功'));
		}
		res.json(new ErrorModel('登录失败'));
	});
});

router.get('/login-test', (req, res, next) => {
	// console.log(req.session);
	if (req.session.username) {
		res.json({
			errno: 0,
			msg: '已登录'
		});
		return;
	}
	res.json({
		errno: -1,
		msg: '未登录'
	});
});

module.exports = router;
