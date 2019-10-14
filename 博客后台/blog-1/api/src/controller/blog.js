const Blog = require("../db/blog");

// 获取博客列表
const getList = (author, keyword) => {
	let query = {};

	if (author) {
		Object.assign(query, { author });
	}
	if (keyword) {
		Object.assign(query, { keyword });
	}
	
	return new Promise((resolve, reject) => {
		Blog.find(query, (err, data) => {
			if (err) {
				reject();
			} else {
				resolve(data);
			}
		});
	});
};

// 获取博客详情
const getDetail = _id => {
	return new Promise((resolve, reject) => {
		Blog.findOne({ _id }, (err, data) => {
			if (err) {
				reject();
			} else {
				resolve(data);
			}
		});
	});
};

// 新建博客
const newBlog = (blogData = {}) => {
	return new Promise((resolve, reject) => {
		new Blog(blogData).save(err => {
			if (err) {
				reject();
			} else {
				resolve();
			}
		});
	});
};

// 更新博客
const updateBlog = (id, blogData = {}) => {
	console.log('blogData :', blogData);
	return new Promise((resolve, reject) => {
		Blog.findByIdAndUpdate(id, blogData, (err, data) => {
			if (err) {
				reject();
			} else {
				console.log('data :', data);
				resolve();
			}
		});
	});
};

// 删除博客
const delBlog = _id => {
	return new Promise((resolve, reject) => {
		Blog.deleteOne({ _id }, err => {
			if (err) {
				reject();
			} else {
				resolve();
			}
		});
	});
};

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
};
