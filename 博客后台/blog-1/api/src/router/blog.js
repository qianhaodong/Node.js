const {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const xss = require('xss')

// 登录验证
const loginCheck = req => {
	if (!req.session.username) {
		return Promise.resolve(new ErrorModel("尚未登录"));
	}
};

const handleBlogRouter = (req, res) => {
	const method = req.method;

	// 获取博客列表
	if (method === "GET" && req.path === "/api/blog/list") {
		let { author = "", keyword = "" } = req.query;

		if (req.query.isAdmin) {
			const loginCheckResult = loginCheck(req);
			if (loginCheckResult) {
				// 未登录
				return loginCheckResult;
			}
			// 强制查询自己的博客
			author = req.session.username
		}

		return getList(author, keyword)
			.then(data => {
				return new SuccessModel(data, "获取列表成功");
			})
			.catch(() => {
				return new ErrorModel("获取列表失败");
			});
	}

	// 获取博客详情
	if (method === "GET" && req.path === "/api/blog/detail") {
		const id = req.query.id;

		return getDetail(id)
			.then(res => {
				return new SuccessModel(res, "获取详情成功");
			})
			.catch(() => {
				return new ErrorModel("获取详情失败");
			});
	}

	// 新建博客
	if (method === "POST" && req.path === "/api/blog/new") {
		const loginCheckResult = loginCheck(req);
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult;
		}

		req.body.author = req.session.username;
		req.body.title = xss(req.body.title)
		return newBlog(req.body)
			.then(() => {
				return new SuccessModel("新建博客成功");
			})
			.catch(() => {
				return new ErrorModel("新建博客失败");
			});
	}

	// 更新博客
	if (method === "POST" && req.path === "/api/blog/update") {
		const loginCheckResult = loginCheck(req);
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult;
		}

		const id = req.body.id;
		return updateBlog(id, req.body)
			.then(() => {
				return new SuccessModel("更新博客成功");
			})
			.catch(() => {
				return new ErrorModel("更新博客失败");
			});
	}

	// 删除博客
	if (method === "POST" && req.path === "/api/blog/del") {
		const loginCheckResult = loginCheck(req);
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult;
		}
		const id = req.query.id;

		return delBlog(id)
			.then(() => {
				return new SuccessModel("删除博客成功");
			})
			.catch(() => {
				return new ErrorModel("删除博客失败");
			});
	}
};

module.exports = handleBlogRouter;
