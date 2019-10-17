const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

const app = express();

// 记录日志
const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
	// 开发环境 / 测试环境
	app.use(logger('dev'));
} else {
	// 线上环境
	const logFileName = path.join(__dirname, 'logs', 'access.log');
	const writeStream = fs.createWriteStream(logFileName, {
		flags: 'a'
	});
	app.use(
		logger('combined', {
			stream: writeStream
		})
	);
}

app.use(express.json()); // 处理 post 请求数据（格式为 application/json）
app.use(express.urlencoded({ extended: false })); // 处理 post 请求数据（格式为 x-www-form-urlencoded）
app.use(cookieParser());

// 配置 redis 和 session
const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
	client: redisClient
});
app.use(
	session({
		secret: 'zxc_9527',
		cookie: {
			path: '/',
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		},
		store: sessionStore
	})
);

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'dev' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
