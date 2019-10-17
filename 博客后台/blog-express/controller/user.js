const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

// 用户注册
const register = (username, password, realname) => {
	// let { username, password, realname } = userInfo;

	password = genPassword(password);
	const sql = `
        INSERT INTO users (username, password, realname)
        VALUES ('${username}', '${password}', '${realname}');
    `;

	return exec(sql);
};

// 用户登录
const login = (username, password) => {
	username = escape(username);

	// 生成加密密码
	password = escape(genPassword(password));

	const sql = `SELECT username, realname FROM users WHERE username = ${username} AND password = ${password};`;

	return exec(sql).then(rows => {
		return rows[0] || [];
	});
};

module.exports = { register, login };
