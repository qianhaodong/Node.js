const xss = require('xss');
const { exec } = require('../db/mysql');

// 获取博客列表
const getList = (author, keyword) => {
	let sql = `SELECT * FROM blogs WHERE 1 = 1 `;
	if (author) {
		sql += `AND author = '${author}' `;
	}
	if (keyword) {
		sql += `AND title like '%${keyword}%' `;
	}
	sql += `ORDER BY createtime DESC;`;

	return exec(sql).then(rows => {
		return rows;
	});
};

// 获取博客详情
const getDetail = id => {
	const sql = `SELECT * FROM blogs WHERE id = '${id}';`;
	return exec(sql).then(rows => {
		return rows[0];
	});
};

// 新建博客
const newBlog = (blogData = {}) => {
	// blogData 是一个博客对象，包含 title、content、author 属性
	const title = xss(blogData.title);
	const content = xss(blogData.content);
	const author = blogData.author;
	const createtime = Date.now();

	const sql = `
		INSERT INTO blogs (title, content, createtime, author)
		VALUES ('${title}', '${content}', '${createtime}', '${author}');
	`;

	return exec(sql).then(insertData => {
		if (insertData.affectedRows > 0) {
			return true;
		}
		return false;
	});
};

// 更新博客
const updateBlog = (id, blogData = {}) => {
	const title = xss(blogData.title);
	const content = xss(blogData.content);

	const sql = `UPDATE blogs SET title = '${title}', content = '${content}' WHERE id = '${id}';`;

	return exec(sql).then(updateData => {
		if (updateData.affectedRows > 0) {
			return true;
		}
		return false;
	});
};

// 删除博客
const delBlog = (id, author) => {
	const sql = `DELETE FROM blogs WHERE id = '${id}' and author = '${author}';`;

	return exec(sql).then(delData => {
		if (delData.affectedRows > 0) {
			return true;
		}
		return false;
	});
};

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
};
