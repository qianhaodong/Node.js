const express = require('express');
const {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck'); // 登录验证中间件

const router = express.Router();

router.get('/list', (req, res, next) => {
	let { author, keyword } = req.query;

	// 后台管理员登录验证
	if (req.query.isAdmin) {
		if (req.session.username == null) {
			res.json(new ErrorModel('暂未登录'));
			return;
		}
		// 强制查询自己的博客
		author = req.session.username;
	}

	return getList(author, keyword).then(blogData => {
		if (blogData.length) {
			res.json(new SuccessModel(blogData, '获取成功'));
			return;
		}
		res.send(new ErrorModel('获取失败'));
	});
});

router.get('/detail', (req, res, next) => {
	const id = req.query.id;

	getDetail(id).then(detailData => {
		if (detailData) {
			res.json(new SuccessModel(detailData, '获取成功'));
			return;
		}
		res.json(new ErrorModel('获取失败'));
	});
});

router.post('/new', loginCheck, (req, res, next) => {
	req.body.author = req.session.username;

	return newBlog(req.body).then(newData => {
		console.log('newData :', newData);
		if (newData) {
			res.json(new SuccessModel(newData, '新建成功'));
			return;
		}
		res.json(new ErrorModel('新建失败'));
	});
});

router.post('/update', loginCheck, (req, res, next) => {
	const id = req.query.id;

	return updateBlog(id, req.body).then(updateData => {
		if (updateData) {
			res.json(new SuccessModel('更新成功'));
			return;
		}
		res.json(new ErrorModel('更新失败'));
	});
});

router.post('/del', loginCheck, (req, res, next) => {
	const id = req.query.id;
	const author = req.session.username;

	return delBlog(id, author).then(delData => {
		if (delData) {
			res.json(new SuccessModel('删除成功'));
			return;
		}
		res.json(new ErrorModel('删除失败'));
	});
});

module.exports = router;
