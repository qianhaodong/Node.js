const mysql = require('mysql');
const {MYSQL_CONF} = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始连接
con.connect();

// 统一执行 SQL 的函数
function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

// 关闭连接
// con.end();

module.exports = {
    exec,
    escape: mysql.escape
}
